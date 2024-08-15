import { Injectable } from "@nestjs/common";
import { KafkaService } from "../services/kafka.service";

@Injectable()
export class RetryService {
  constructor(private readonly kafkaService: KafkaService) {}

  async handleRetries() {
    await this.kafkaService.consumeRetryMessages();
  }
}
