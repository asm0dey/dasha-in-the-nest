import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DashaAcc } from './dasha.service';
import { Scraper } from './scraper.service';
import { TtsService } from './tts.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DashaAcc, Scraper, TtsService],
})
export class AppModule {}
