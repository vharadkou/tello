import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import sdk from '@0x77/tellots';

@Controller('commands')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('connect')
  async connect() {
    try {
      await sdk.control.connect();
    } catch (e) {
      console.log(e);
    }
  }

  @Post('takeoff')
  async takeOff() {
    try {
      await sdk.control.takeOff();
    } catch (e) {
      console.log(e);
    }
  }

  @Post('land')
  async land() {
    try {
      await sdk.control.land();
    } catch (e) {
      console.log(e);
    }
  }

  @Post('flip')
  async flip() {
    try {
      await sdk.control.flip.front();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('battery')
  async battery() {
    const battery = await sdk.read.battery();

    return battery;
  }
}
