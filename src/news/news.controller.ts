import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { SearchNewsDto } from './dto/search-news.dto';
import { NewsResponseDto } from './dto/news-response.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get('search')
    async search(@Query() query: SearchNewsDto): Promise<NewsResponseDto> {
        const response = this.newsService.search(query.keyword, query.count);
        return await response;
    }
    @Get('search-title')
    async searchByTitle(@Query() query: SearchNewsDto): Promise<NewsResponseDto> {
        const response = this.newsService.searchByTitle(query.keyword, query.count);
        return await response;
    }

    @Get('search-description')
    async searchByDescription(@Query() query: SearchNewsDto): Promise<NewsResponseDto> {
        const response = this.newsService.searchByDescription(query.keyword, query.count);
        return await response;
    }

    @Get('top-headlines')
    async getTopHeadlines(@Query('category') category?: string): Promise<NewsResponseDto> {
        const response = this.newsService.getTopHeadlines(category);
        return await response;
    }
}
