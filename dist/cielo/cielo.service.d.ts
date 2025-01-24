import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class CieloService {
    private readonly httpService;
    private readonly configService;
    private readonly merchantId;
    private readonly merchantKey;
    private readonly baseUrl;
    private readonly queryBaseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    get(endpoint: string): Promise<any>;
    post(endpoint: string, data: any): Promise<any>;
    put(endpoint: string): Promise<any>;
}
