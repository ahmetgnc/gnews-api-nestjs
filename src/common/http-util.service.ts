import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class HttpUtilService {
    private readonly logger = new Logger(HttpUtilService.name);

    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async handleRequest<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
        useCache = false,
        cacheTtl = 60,
    ): Promise<T> {
        const cacheKey = `item:${method}:${url}`;

        if (useCache && method === 'GET') {
            const cached = await this.cacheManager.get<T>(cacheKey);
            if (cached) {
                this.logger.log(`Cache found: ${cacheKey}`);
                return cached;
            }
        }

        try {
            const axiosConfig: AxiosRequestConfig = {
                ...config,
                method,
                url,
                data,
            };

            const response = await firstValueFrom(this.httpService.request<T>(axiosConfig));
            const responseData = response.data;

            if (useCache && method === 'GET') {
                await this.cacheManager.set(cacheKey, responseData, cacheTtl * 1000); // TTL in ms
                this.logger.log(`Cache Set: ${cacheKey} (${cacheTtl}s)`);
            }

            return responseData;
        } catch (error) {
            this.logger.error(`API Error: [${method}] ${url}`, error.stack);
            const status = error.response?.status;
            throw new HttpException(
                error.response?.data?.message || 'External API error',
                status || HttpStatus.BAD_GATEWAY,
            );
        }
    }
}
