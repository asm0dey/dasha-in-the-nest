import { Injectable } from '@nestjs/common';
import { DashaAcc } from './dasha.service';
import { tts } from '@dasha.ai/sdk';

@Injectable()
export class TtsService {
  constructor(private readonly dashaApp: DashaAcc) {}
  async textToSpeech(text: string): Promise<Uint8Array> {
    return await tts.synthesize(
      text,
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
