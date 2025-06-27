import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NewsResponseDto } from './dto/news-response.dto';
import { HttpUtilService } from 'src/common/http-util.service';

@Injectable()
export class NewsService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly httpUtil: HttpUtilService,
    ) {
        this.baseUrl = process.env.GNEWS_API_BASE_URL || '';
        this.apiKey = process.env.GNEWS_API_KEY || '';
    }

    private readonly news: any[] = [];

    async search(keyword: string, count?: number): Promise<NewsResponseDto> {
        const query = `/search?q=${encodeURIComponent(keyword)}&max=${count || 10}`;
        const url = `${this.baseUrl}${query}&apikey=${this.apiKey}`;
        return await this.httpUtil.handleRequest<NewsResponseDto>('GET', url, null, undefined, true, 300);
    }

    async searchByTitle(keyword: string, count?: number): Promise<NewsResponseDto> {
        let query = `/search?q=${encodeURIComponent(keyword)}&in=title&max=${count || 10}`;
        const url = `${this.baseUrl}${query}&apikey=${this.apiKey}`;
        return await this.httpUtil.handleRequest<NewsResponseDto>('GET', url, null, undefined, true, 300);
    }

    async searchByDescription(keyword: string, count?: number): Promise<NewsResponseDto> {
        let query = `/search?q=${encodeURIComponent(keyword)}&in=description&max=${count || 10}`;
        const url = `${this.baseUrl}${query}&apikey=${this.apiKey}`;
        return await this.httpUtil.handleRequest<NewsResponseDto>('GET', url, null, undefined, true, 300);
    }

    async getTopHeadlines(category?: string): Promise<NewsResponseDto> {
        const query = `/top-headlines?category=${category || 'general'}&max=10`;
        const url = `${this.baseUrl}${query}&apikey=${this.apiKey}`;
        return await this.httpUtil.handleRequest<NewsResponseDto>('GET', url, null, undefined, true, 600);
    }
}
