import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';

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
        const resolvedMessageBody = await Promise.resolve(messageBody);
        const message = JSON.stringify(resolvedMessageBody);
        
        const command = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: message,
            MessageAttributes: {
                "QueueType": {
                    DataType: "String",
                    StringValue: "Confirmation"
                }
            },
            MessageGroupId: "api-hotel-booking",
            MessageDeduplicationId: this.generateMessageDeduplicationId(),
        });

        await this.sqsClient.send(command);
        console.log('Message send: ', messageBody);
    }

    // Delete message from queue
    async deleteMessage(receiptHandle: string) {
        const command = new DeleteMessageCommand({
            QueueUrl: this.queueUrl,
            ReceiptHandle: receiptHandle,
        });

        await this.sqsClient.send(command);
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
