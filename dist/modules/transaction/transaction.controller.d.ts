import { TransactionService } from './transaction.service';
import { SqsService } from '../../sqs/sqs.service';
export declare class TransactionController {
    private readonly TransactionService;
    private readonly sqsService;
    constructor(TransactionService: TransactionService, sqsService: SqsService);
    getTransaction(transactionId: any): Promise<any>;
    createTransaction(transaction: any): Promise<any>;
    captureTransaction(transaction: any): Promise<any>;
    cancelTransaction(transaction: any): Promise<any>;
}
