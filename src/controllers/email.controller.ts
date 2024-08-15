import { Controller, Post, Body } from "@nestjs/common";
import { EmailNotificationService } from "../services/email-notification.service";

@Controller("emails")
export class EmailController {
  constructor(
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  @Post("send")
  async sendEmail(
    @Body() emailData: { to: string; subject: string; htmlContent: string }
  ) {
    return this.emailNotificationService.sendEmail(emailData);
  }
}
