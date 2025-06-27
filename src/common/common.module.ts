import { Module } from '@nestjs/common';
import { HttpUtilService } from './http-util.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [HttpUtilService],
    exports: [HttpUtilService],
})
export class CommonModule { }