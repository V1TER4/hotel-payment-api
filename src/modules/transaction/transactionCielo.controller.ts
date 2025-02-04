import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService as Cielo } from './transactionCielo.service';
import { SqsService } from '../../sqs/sqs.service';

@Controller('cielo/transaction')
export class TransactionController {
    constructor(
        private readonly Cielo: Cielo,
        private readonly sqsService: SqsService
    ) {}

    @Get(':transactionId')
    async getTransaction(@Param('transactionId') transactionId: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction created');
        return this.Cielo.getTransaction(transactionId);
    }

    // TransactionControllerController methods will be added here
    @Post()
    async createTransaction(@Body() transaction: any): Promise<any> {
        const response = await this.Cielo.createTransaction(transaction);
        await this.sqsService.sendMessage(response);
        return response;
    }

    @Post('/capture')
    async captureTransaction(@Body() transaction: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction captured');
        return this.Cielo.captureTransaction(transaction);
    }

    @Post('/cancel')
    async cancelTransaction(@Body() transaction: any): Promise<any> {
        // await this.sqsService.sendMessage('Transaction canceled');
        return this.Cielo.cancelTransaction(transaction);
    }
}
