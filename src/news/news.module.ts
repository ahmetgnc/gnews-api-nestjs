import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { HttpModule } from '@nestjs/axios';
import { HttpUtilService } from 'src/common/http-util.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [HttpModule, CommonModule],
  controllers: [NewsController],
  providers: [NewsService, HttpUtilService],
})
export class NewsModule { }
