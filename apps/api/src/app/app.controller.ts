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
          data: {
            action: 'DRONE SERVER POST: Connection created',
          },
        })
      );
    });

    this.ws.on('message', async (data: any) => {
      console.log('DRONE SERVER RECEIVED: ', data);
      const parsedData = JSON.parse(data);

      if (parsedData.action === 'FRONT COMMAND: droneInfo') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: droneInfo',
              payload: await this.droneInfo(),
            },
          })
        );
      }

      if (parsedData.action === 'FRONT COMMAND: connectToDrone') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: connectToDrone',
              payload: await this.connect(),
            },
          })
        );
      }

      if (parsedData.action === 'FRONT COMMAND: takeOff') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: takeOff',
              payload: await this.takeOff(),
            },
          })
        );
      }

      if (parsedData.action === 'FRONT COMMAND: land') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: land',
              payload: await this.land(),
            },
          })
        );
      }

      if (parsedData.action === 'FRONT COMMAND: testMessage') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: testMessage',
            },
          })
        );
      }

      if (parsedData.action === 'FRONT COMMAND: flip') {
        this.ws.send(
          JSON.stringify({
            action: 'sendMessage',
            data: {
              action: 'DRONE SERVER: flip',
              payload: await this.flip(),
            },
          })
        );
      }
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
      return 'ERROR';
    }

    return 'CONNECTED';
  }

  @Post('takeoff')
  async takeOff() {
    try {
      await sdk.control.takeOff();
    } catch (e) {
      console.log(e);
      return 'ERROR';
    }

    return 'TAKED OFF';
  }

  @Post('land')
  async land() {
    try {
      await sdk.control.land();
    } catch (e) {
      console.log(e);
      return 'ERROR';
    }

    return 'LANDED';
  }

  @Post('flip')
  async flip() {
    try {
      await sdk.control.flip.front();
      // await sdk.control.flip.front();
      // await sdk.control.flip.left();
      // await sdk.control.flip.right();
      // await sdk.control.flip.back();
    } catch (e) {
      console.log(e);
      return 'ERROR';
    }

    return 'FLIPPED';
  }

  @Get('droneInfo')
  async droneInfo() {
    try {
      return await sdk.read.battery();
    } catch (e) {
      console.log(e);
      return 'ERROR';
    }
  }
}
