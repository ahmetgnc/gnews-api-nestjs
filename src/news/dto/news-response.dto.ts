import { NewsArticle } from '../types/news-article.type';

export class NewsResponseDto {
    totalArticles: number;
    articles: NewsArticle[];
}