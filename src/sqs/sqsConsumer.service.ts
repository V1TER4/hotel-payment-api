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
        this.startConsumer();
    }

    startConsumer() {
        const app = Consumer.create({
            queueUrl: this.queueUrl,
            handleMessage: async (message) => {
                console.log('Mensagem recebida:', message.Body);
                
                const { endpoint, payload } = JSON.parse(message.Body);
                await this.sendMessageToEndpoint(endpoint, payload);
            },
            sqs: this.sqsClient,
        });

        app.on('error', (err) => {
            console.error('Erro no consumidor SQS:', err.message);
        });

        app.on('processing_error', (err) => {
            console.error('Erro ao processar mensagem:', err.message);
        });

        app.start();
        console.log('Consumidor SQS iniciado.');
    }

    async sendMessageToEndpoint(endpoint: string, payload: any) {
        const endpointUrl = process.env.ENDPOINT_URL;

        try {
            const response = await this.httpService
                .post(endpointUrl, { message: payload })
                .toPromise();

            console.log('Mensagem enviada para o endpoint:', response.data);
        } catch (error) {
            console.error('Erro ao enviar mensagem para o endpoint:', error.message);
        }
    }

}