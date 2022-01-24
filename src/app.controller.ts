import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  StreamableFile,
} from '@nestjs/common';
import { Scraper } from './scraper.service';
import { randomUUID } from 'crypto';
import { TtsService } from './tts.service';
import { StorageService } from './storage.service';

@Controller()
export class AppController {
  constructor(
    private readonly tts: TtsService,
    private readonly scraper: Scraper,
    private readonly storage: StorageService,
  ) {}

  @Get()
  @Render('index')
  index() {
    return {};
  }

  @Post('/crawl')
  async crawl(@Body('url') url: string): Promise<StreamableFile> {
    const hostname = new URL(url).hostname;
    const type =
      hostname.indexOf('wikipedia.org') > -1
        ? 'wikipedia'
        : hostname === 'medium.com'
        ? 'medium'
        : 'other';
    const text = await this.scraper.scrapeUrl(url, type);
    const synthesized = await this.tts.textToSpeech(text);
    const uuid = randomUUID();
    await this.storage.writeFile(synthesized, uuid);
    return new StreamableFile(this.storage.getFileStream(uuid));
  }
}
