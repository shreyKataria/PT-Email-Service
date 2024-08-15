import { Injectable } from "@nestjs/common";
import { ses } from "../config/aws.config";
import { KafkaService } from "./kafka.service";

@Injectable()
export class EmailNotificationService {
  private retryService: KafkaService;
  private readonly maxRetries = 3;
  private readonly fallbackProviderIndex = 1;

  constructor() {
    this.retryService = new KafkaService();
  }

  async sendEmail(emailData: any, retryCount = 0) {
    try {
      const params = {
        Source: "shreykataria1@gmail.com",
        Destination: {
          ToAddresses: [emailData.to],
        },
        Message: {
          Subject: {
            Data: emailData.subject,
          },
          Body: {
            Html: {
              Data: emailData.htmlContent,
            },
          },
        },
      };

      // Send email via AWS SES
      const response = await ses.sendEmail(params).promise();
      return response;
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error);
      if (retryCount < this.maxRetries - 1) {
        await this.retryService.sendRetryMessage({
          ...emailData,
          retryCount: retryCount + 1,
        });
      }
      throw error;
    }
  }
}
