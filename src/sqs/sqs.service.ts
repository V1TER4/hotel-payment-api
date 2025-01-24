import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

@Injectable()
export class SqsService {
    private sqsClient: SQSClient;
    private queueUrl: string;

    constructor() {
        this.sqsClient = new SQSClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        this.queueUrl = process.env.SQS_QUEUE_URL;
    }

    // Send message to queue
    async sendMessage(messageBody: string) {
        const command = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: messageBody,
            MessageGroupId: "hotel-reserve-payment",
            MessageDeduplicationId: this.generateMessageDeduplicationId(),
        });

        const send = await this.sqsClient.send(command);
        console.log('Mensagem enviada:', messageBody);
    }

    // Consume messages from queue
    async receiveMessages() {
        const command = new ReceiveMessageCommand({
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 10,
        });

        const response = await this.sqsClient.send(command);

        if (response.Messages) {
            for (const message of response.Messages) {
                console.log('Mensagem recebida:', message.Body);

                // Delete message from queue
                await this.deleteMessage(message.ReceiptHandle);
            }
        }
    }

    // Delete message from queue
    async deleteMessage(receiptHandle: string) {
        const command = new DeleteMessageCommand({
            QueueUrl: this.queueUrl,
            ReceiptHandle: receiptHandle,
        });

        await this.sqsClient.send(command);
        console.log('Mensagem deletada');
    }

    generateMessageDeduplicationId(length = 32): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        return randomString;
    }
}
