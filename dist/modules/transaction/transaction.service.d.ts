import { CieloService } from 'src/cielo/cielo.service';
export declare class TransactionService {
    private readonly cieloService;
    constructor(cieloService: CieloService);
    TestMS(): string;
    getTransaction(paymentId: any): Promise<any>;
    createTransaction(transaction: any): Promise<any>;
    captureTransaction(transaction: any): Promise<any>;
    cancelTransaction(transaction: any): Promise<any>;
}
