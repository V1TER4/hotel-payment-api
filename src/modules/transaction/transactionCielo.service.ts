import { UnsupportedOperation } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { CieloService } from 'src/cielo/cielo.service';

@Injectable()
export class TransactionService {
    constructor(private readonly cieloService: CieloService) { }

    TestMS(): string {
        return 'Testing MicroService!';
    }

    async getTransaction(paymentId: any): Promise<any> {
        const response = await this.cieloService.get(`/1/sales/${paymentId}`);
        return response;
    }

    async createTransaction(transaction: any): Promise<any> {
        transaction = JSON.stringify(transaction);
        const response = await this.cieloService.post('/1/sales/', transaction);
        return response;
    }

    async captureTransaction(transaction: any): Promise<any> {
        const { paymentId, amount, ...rest } = transaction;
        const response = await this.cieloService.put(`/1/sales/${paymentId}/void?amount=${amount}`);
        
        return response;
    }

    async cancelTransaction(transaction: any): Promise<any> {
        const { paymentId, amount, ...rest } = transaction;
        const response = await this.cieloService.put(`/1/sales/${paymentId}/void?amount=${amount}`);
        
        return response;
    }
}
