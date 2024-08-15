# Email notification service

PT-Email-Service is a notification service built using Node.js, Express.js, and Nest.js that integrates with Amazon SES to send emails. It also uses Kafka for message brokering and Docker for containerization.

## Table of Contents

- Project Structure
- Prerequisites
- Setup and Installation
- Configuration
- Running the Application
- Common Issues
- Kafka Error
- AWS SES SignatureDoesNotMatch Error
- Testing
- Contributing
- License

## Project Structure

```javascript
PT-Email-Service/
├── @types/
|   └── alltypes.d.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── aws.config.ts
│   │   └── kafka.config.ts
│   ├── controllers/
│   │   ├── email.controller.ts
|   ├── services/
│   │   ├── email-notification.service.ts
|   |   ├── kafka.service.ts
│   │   └── retry.service.ts
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── README.md
├── tsconfig.json
└── package.json
```

## Prerequisites

Before you begin, ensure you have met the following requirements: - Node.js and npm installed - Docker and Docker Compose installed - AWS account with SES enabled - Kafka setup locally or on the cloud (if running outside Docker)

## Setup and Installation

1. ### Clone the repository:

```python
git clone https://github.com/yourusername/PT-Email-Service.git
cd PT-Email-Service
```

2. ### Install dependencies:

```python
npm install
```

3. ### Create a `.env` file:
   Create a `.env` file in the root directory and configure the following environment variables:

```console
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
KAFKA_BROKER=localhost:9092
```

4. ### Build and run the services:

```python
docker-compose up --build
```

> This command will set up the necessary containers, including Kafka, Zookeeper, and your application.

## Configuration

### AWS SES Configuration

Ensure that your AWS credentials are correct and have the necessary permissions to send emails via SES. You can configure the credentials in the .env file as shown above.

### Kafka Configuration

Kafka broker configuration is done in the `docker-compose.yml` file. Ensure that the Kafka broker is running correctly and is accessible from the application.

## Running the Application

You can run the application using Docker Compose:
`docker-compose up`
To stop the services, use:
`docker-compose down`

## Common Issues

### Kafka Error

If you encounter a Kafka-related error like:

> ERROR Exiting Kafka due to fatal exception

Ensure that the Kafka and Zookeeper configurations are correctly set up in your `docker-compose.yml` file. Specifically, check the listeners and advertised.listeners properties in the Kafka configuration.

## AWS SES SignatureDoesNotMatch Error

If you receive an error like:

> SignatureDoesNotMatch: The request signature we calculated does not match the signature you provided.

Ensure the following:

Your AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) are correct.
The AWS region is correctly set in both your .env file and your AWS SDK configuration.
Check for any extra spaces or formatting issues in your credentials.

## Testing

To test the service, you can send requests to the endpoints defined in the `email.controller.ts`. Use tools like Postman or CURL to simulate requests.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the MIT License.
