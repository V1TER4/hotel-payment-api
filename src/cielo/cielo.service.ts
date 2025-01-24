import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { env } from 'process';

@Injectable()
export class CieloService {
    private readonly merchantId: string;
    private readonly merchantKey: string;
    private readonly baseUrl: string;
    private readonly queryBaseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.merchantId = this.configService.get<string>('CIELO_CLIENT_ID');
        this.merchantKey = this.configService.get<string>('CIELO_CLIENT_SECRET');
        this.baseUrl = this.configService.get<string>('CIELO_URL_API');
        this.queryBaseUrl = this.configService.get<string>('CIELO_CONSULT_URL_API');
    }

    async get(endpoint: string) {
        const url = `${this.queryBaseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };

        try {
            const response = await this.httpService.get(url, { headers }).toPromise();
            return response.data;
        } catch (error) {
            console.log('Error in get');
            return error.response;
        }
    }

    async post(endpoint: string, data: any) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };

        try {
            const response = await this.httpService.post(url, data, { headers }).toPromise();

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
    
    async put(endpoint: string){
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };
        
        try {
            const response = await this.httpService.put(url, {},{ headers }).toPromise();
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}
