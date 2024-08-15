import { Injectable, OnModuleInit } from "@nestjs/common";
import { Kafka, Consumer, Producer } from "kafkajs";
import { EmailNotificationService } from "./email-notification.service";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: "email-notification-service",
      brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect().catch((error) => {
      console.error("Kafka Producer Connection Failed", error);
    });
    this.consumeRetryMessages(); // Start consuming retry messages on initialization
  }

  async sendRetryMessage(message: any) {
    await this.producer.send({
      topic: "email-retry-topic",
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async consumeRetryMessages() {
    const consumer = this.kafka.consumer({ groupId: "email-retry-group" });
    await consumer.connect();
    await consumer.subscribe({
      topic: "email-retry-topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) {
          console.error("Received null message value");
          return;
        }

        try {
          const emailData = JSON.parse(message.value.toString());
          const emailService = new EmailNotificationService();
          await emailService.sendEmail(emailData, emailData.retryCount || 0);
        } catch (error) {
          console.error("Failed to process retry message:", error);
        }
      },
    });
  }
}
