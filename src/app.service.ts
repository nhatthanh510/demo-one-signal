import { Injectable } from '@nestjs/common';
import * as OneSignal from '@onesignal/node-onesignal';

const ONESIGNAL_REST_API_KEY =
  process.env.ONESIGNAL_REST_API_KEY ||
  'MDFjZDBjZTctODIwMy00NzNjLWFlOGQtZTZkOTBlM2E5YWIw';
const ONESIGNAL_APP_ID =
  process.env.ONESIGNAL_APP_ID || 'e48ad365-7297-4a70-b077-7f56c6fa3d01';
const ONE_SIGNAL_SMS_FROM = process.env.ONE_SIGNAL_SMS_FROM || '+13214154713';

const app_key_provider = {
  getToken() {
    return ONESIGNAL_REST_API_KEY;
  },
};

const configuration = OneSignal.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});
const client = new OneSignal.DefaultApi(configuration);

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async triggerEmailNotification(toEmail: string): Promise<any> {
    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    if (toEmail) {
      notification.include_email_tokens = [toEmail];
    } else {
      notification.included_segments = ['Subscribed Users'];
    }
    notification.email_subject = 'This is test email';
    notification.template_id = '2b20dda0-e529-4bb9-b4b3-e051426e7834';

    const { id } = await client.createNotification(notification);

    const response = await client.getNotification(ONESIGNAL_APP_ID, id);

    return {
      success: true,
      data: response,
    };
  }

  async triggerSMSNotification(): Promise<any> {
    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['Subscribed Users'];
    notification.sms_from = ONE_SIGNAL_SMS_FROM;
    notification.template_id = '714668fb-c24b-41f3-a96a-205f1cda72bc';

    const { id } = await client.createNotification(notification);

    const response = await client.getNotification(ONESIGNAL_APP_ID, id);

    return {
      success: true,
      data: response,
    };
  }
}
