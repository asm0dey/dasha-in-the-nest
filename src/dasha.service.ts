import { Injectable } from '@nestjs/common';
import { Account } from '@dasha.ai/sdk';

@Injectable()
export class DashaAcc {
  getAccount(): Account {
    return {
      server: process.env['DASHA_SERVER'] ?? 'app.us.dasha.ai',
      apiKey: process.env['DASHA_API_KEY'],
    };
  }
}
