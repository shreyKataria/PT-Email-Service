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
exports.EmailNotificationService = void 0;
const common_1 = require("@nestjs/common");
const aws_config_1 = require("../config/aws.config");
const kafka_service_1 = require("./kafka.service");
let EmailNotificationService = class EmailNotificationService {
    constructor() {
        this.maxRetries = 3;
        this.fallbackProviderIndex = 1;
        this.retryService = new kafka_service_1.KafkaService();
    }
    async sendEmail(emailData, retryCount = 0) {
        try {
            const params = {
                Source: "your-email@example.com",
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
            const response = await aws_config_1.ses.sendEmail(params).promise();
            return response;
        }
        catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error);
            if (retryCount < this.maxRetries - 1) {
                await this.retryService.sendRetryMessage(Object.assign(Object.assign({}, emailData), { retryCount: retryCount + 1 }));
            }
            throw error;
        }
    }
};
exports.EmailNotificationService = EmailNotificationService;
exports.EmailNotificationService = EmailNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailNotificationService);
