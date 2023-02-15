import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send-email')
  sendEmail(@Query() query): any {
    const toEmail = query?.to;
    return this.appService.triggerEmailNotification(toEmail);
  }

  @Get('/send-sms')
  sendSMS(): any {
    return this.appService.triggerSMSNotification();
  }
}
