import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  StreamableFile,
} from '@nestjs/common';
import { DashaAcc } from './dasha.service';
import { Scraper } from './scraper.service';
import { Urltype } from './urltype';
import { tts } from '@dasha.ai/sdk';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { TtsService } from './tts.service';

@Controller()
export class AppController {
  constructor(private readonly tts: TtsService) {}

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
        ? Urltype.WIKIPEDIA
        : hostname === 'medium.com'
        ? Urltype.MEDIUM
        : Urltype.OTHER;
    const synthesized = await this.tts.textToSpeech(url, type);
    const uuid = randomUUID();
    await fs.writeFile(join(process.cwd(), 'data', uuid), synthesized, {
      flag: 'w+',
    });
    const data = createReadStream(join(process.cwd(), 'data', uuid));
    return new StreamableFile(data);
  }
}
