import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import sdk from '@0x77/tellots';

import WebSocket from 'ws';

@Controller('commands')
export class AppController {
  private ws = new WebSocket(
    'wss://c8efbuti88.execute-api.eu-west-1.amazonaws.com/dev',
    {
      perMessageDeflate: false,
    }
  );

  constructor(private readonly appService: AppService) {
    this.ws.on('open', () => {
      this.ws.send(
        JSON.stringify({
          action: 'sendMessage',
          data: 'Connection Opened',
        })
      );
    });

    this.ws.on('message', (data) => {
      console.log('DATA: ', data);
    });
  }

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
    this.ws.send(
      JSON.stringify({
        action: 'sendMessage',
        data: 'Battery',
      })
    );

    try {
      // return await sdk.read.battery();
    } catch (e) {
      console.log(e);
    }
  }
}
