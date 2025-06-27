
import { Type } from 'class-transformer';

export class SearchNewsDto {
    @Type(() => String)
    keyword: string;

    @Type(() => Number)
    count?: number;
}