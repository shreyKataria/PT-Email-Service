import { Module } from "@nestjs/common";
import { EmailController } from "./controllers/email.controller";
import { EmailNotificationService } from "./services/email-notification.service";
import { KafkaService } from "./services/kafka.service";

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailNotificationService, KafkaService],
})
export class AppModule {}
