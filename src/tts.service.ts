import { Injectable } from '@nestjs/common';
import { DashaAcc } from './dasha.service';
import { tts } from '@dasha.ai/sdk';
import { Urltype } from './urltype';
import { Scraper } from './scraper.service';

@Injectable()
export class TtsService {
  constructor(
    private readonly dashaApp: DashaAcc,
    private readonly scraper: Scraper,
  ) {}
  async textToSpeech(url: string, type: Urltype): Promise<Uint8Array> {
    return await tts.synthesize(
      await this.scraper.scrapeUrl(url, type),
      {
        speaker: 'kate',
        lang: 'en-US',
        emotion: 'neutral',
        speed: 1,
        variation: 0,
      },
      {
        providerName: 'dasha',
        account: this.dashaApp.getAccount(),
      },
    );
  }
}
