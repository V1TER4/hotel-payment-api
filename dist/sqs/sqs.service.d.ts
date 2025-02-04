export declare class SqsService {
    private sqsClient;
    private queueUrl;
    constructor();
    sendMessage(messageBody: string): Promise<void>;
    deleteMessage(receiptHandle: string): Promise<void>;
    generateMessageDeduplicationId(length?: number): string;
}
