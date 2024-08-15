"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    clientId: "email-notification-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});
