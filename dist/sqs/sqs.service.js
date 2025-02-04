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
exports.SqsService = void 0;
const common_1 = require("@nestjs/common");
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv = require("dotenv");
dotenv.config();
let SqsService = class SqsService {
    constructor() {
        this.sqsClient = new client_sqs_1.SQSClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.queueUrl = process.env.SQS_QUEUE_URL;
    }
    async sendMessage(messageBody) {
        const resolvedMessageBody = await Promise.resolve(messageBody);
        const message = JSON.stringify(resolvedMessageBody);
        const command = new client_sqs_1.SendMessageCommand({
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
    async deleteMessage(receiptHandle) {
        const command = new client_sqs_1.DeleteMessageCommand({
            QueueUrl: this.queueUrl,
            ReceiptHandle: receiptHandle,
        });
        await this.sqsClient.send(command);
    }
    generateMessageDeduplicationId(length = 32) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }
        return randomString;
    }
};
exports.SqsService = SqsService;
exports.SqsService = SqsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SqsService);
//# sourceMappingURL=sqs.service.js.map