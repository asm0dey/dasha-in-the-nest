import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DashaAcc } from './dasha.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DashaAcc],
})
export class AppModule {}
