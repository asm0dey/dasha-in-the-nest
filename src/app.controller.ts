import { Controller, Get } from '@nestjs/common';
import { DashaAcc } from './dasha.service';
import { tts } from '@dasha.ai/sdk';
import * as fs from 'fs/promises';

@Controller()
export class AppController {
  constructor(private readonly dashaApp: DashaAcc) {}

  @Get()
  async getHello(): Promise<string> {
    const synthesized = await tts.synthesize(
      "This is not what you're looking for, boi",
      {
        speaker: 'dasha',
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

    await fs.writeFile('/tmp/test.mp3', synthesized, { flag: 'w+' });
    return 'Hello!';
  }
}
