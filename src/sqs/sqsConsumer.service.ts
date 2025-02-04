import * as dotenv from 'dotenv';
import { Consumer } from 'sqs-consumer';
import { HttpService } from '@nestjs/axios';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable, OnModuleInit } from '@nestjs/common';

dotenv.config();

@Injectable()
export class SqsConsumerService implements OnModuleInit {
    private sqsClient: SQSClient;
    private queueUrl: string;
    private consumerInterval: NodeJS.Timeout;

    constructor(private readonly httpService: HttpService) {
        this.sqsClient = new SQSClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        this.queueUrl = process.env.SQS_QUEUE_URL;
    }

    onModuleInit() {
        // this.startConsumer();
    }

    startConsumer() {
        const app = Consumer.create({
            queueUrl: this.queueUrl,
            handleMessage: async (message) => {
                const attributes = message.MessageAttributes || {};
                const queueType = attributes.QueueType?.StringValue || "Unknown";

                if (queueType !== "Payment") {
                    console.log("Message Ignored");
                    return;
                }

                const transactionType = attributes.TransactionUrl?.StringValue || "Unknown";
                if (!transactionType) {
                    console.error("TransactionUrl not found");
                    return;
                }

                const payload = JSON.parse(message.Body);
                await this.sendMessageToEndpoint(transactionType, payload);
            },
            sqs: this.sqsClient,
            messageAttributeNames: ["All"],
            shouldDeleteMessages: false,
        });

        app.on('error', (err) => {
            console.error('Erro no consumidor SQS: ', err.message);
        });

        app.on('processing_error', (err) => {
            console.error('Erro ao processar mensagem: ', err.message);
        });

        const interval = parseInt(process.env.CONSUMER_INTERVAL || '60000', 10); // Default to 60 seconds
        this.consumerInterval = setInterval(() => {
            app.start();
            console.log('Consumidor SQS iniciado.');
        }, interval);
    }

    async sendMessageToEndpoint(endpoint: string, payload: any) {
        try {
            const response = await this.httpService
                .post(process.env.APP_URL + endpoint, payload)
                .toPromise();

            console.log('Mensagem enviada para o endpoint:', response.data);
        } catch (error) {
            console.error('Erro ao enviar mensagem para o endpoint:', error.message);
        }
    }

    stopConsumer() {
        if (this.consumerInterval) {
            clearInterval(this.consumerInterval);
            console.log('Consumidor SQS parado.');
        }
    }
}