"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const email_notification_service_1 = require("./email-notification.service");
let KafkaService = class KafkaService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: "email-notification-service",
            brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
        });
        this.producer = this.kafka.producer();
    }
    async onModuleInit() {
        await this.producer.connect();
        this.consumeRetryMessages(); // Start consuming retry messages on initialization
    }
    async sendRetryMessage(message) {
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
                    const emailService = new email_notification_service_1.EmailNotificationService();
                    await emailService.sendEmail(emailData, emailData.retryCount || 0);
                }
                catch (error) {
                    console.error("Failed to process retry message:", error);
                }
            },
        });
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
