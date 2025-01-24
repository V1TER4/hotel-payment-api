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
exports.CieloService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let CieloService = class CieloService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.merchantId = this.configService.get('CIELO_CLIENT_ID');
        this.merchantKey = this.configService.get('CIELO_CLIENT_SECRET');
        this.baseUrl = this.configService.get('CIELO_URL_API');
        this.queryBaseUrl = this.configService.get('CIELO_CONSULT_URL_API');
    }
    async get(endpoint) {
        const url = `${this.queryBaseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };
        try {
            const response = await this.httpService.get(url, { headers }).toPromise();
            return response.data;
        }
        catch (error) {
            if (error.response) {
                return error.response.data;
            }
            throw new Error(`Erro na requisição para Cielo: ${error.message}`);
        }
    }
    async post(endpoint, data) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };
        try {
            const response = await this.httpService.post(url, data, { headers }).toPromise();
            return response.data;
        }
        catch (error) {
            if (error.response) {
                return error.response.data;
            }
            throw new Error(`Erro na requisição para Cielo: ${error.message}`);
        }
    }
    async put(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'MerchantId': this.merchantId,
            'MerchantKey': this.merchantKey,
        };
        try {
            const response = await this.httpService.put(url, {}, { headers }).toPromise();
            return response.data;
        }
        catch (error) {
            if (error.response) {
                return error.response.data;
            }
            throw new Error(`Erro na requisição para Cielo: ${error.message}`);
        }
    }
};
exports.CieloService = CieloService;
exports.CieloService = CieloService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], CieloService);
//# sourceMappingURL=cielo.service.js.map