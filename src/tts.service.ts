import { Injectable, Logger } from '@nestjs/common';
import { DashaAcc } from './dashaacc.service';
import { tts } from '@dasha.ai/sdk';

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);
  constructor(private readonly dashaApp: DashaAcc) {}
  async textToSpeech(text: string): Promise<Uint8Array> {
    if (process.env['DASHA_TEXT_MESSAGE']) {
      this.logger.log(`This should be translated to speech:
      ${text}`);
    }
    return await tts.synthesize(
      process.env['DASHA_TEXT_MESSAGE'] ?? text,
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
