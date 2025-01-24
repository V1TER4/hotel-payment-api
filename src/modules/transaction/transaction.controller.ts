import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SqsService } from '../../sqs/sqs.service';

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly TransactionService: TransactionService,
        private readonly sqsService: SqsService
    ) {}

    @Get(':transactionId')
    async getTransaction(@Param('transactionId') transactionId: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction created');
        return this.TransactionService.getTransaction(transactionId);
    }

    // TransactionControllerController methods will be added here
    @Post()
    async createTransaction(@Body() transaction: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction created');
        return this.TransactionService.createTransaction(transaction);
    }

    @Post('/capture')
    async captureTransaction(@Body() transaction: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction captured');
        return this.TransactionService.captureTransaction(transaction);
    }

    @Post('/cancel')
    async cancelTransaction(@Body() transaction: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction canceled');
        return this.TransactionService.cancelTransaction(transaction);
    }
}
