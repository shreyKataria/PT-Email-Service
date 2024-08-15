import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "email-notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});
