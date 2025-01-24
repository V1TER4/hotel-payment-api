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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const cielo_service_1 = require("../../cielo/cielo.service");
let TransactionService = class TransactionService {
    constructor(cieloService) {
        this.cieloService = cieloService;
    }
    TestMS() {
        return 'Testing MicroService!';
    }
    async getTransaction(paymentId) {
        const response = await this.cieloService.get(`/1/sales/${paymentId}`);
        return response;
    }
    async createTransaction(transaction) {
        const response = await this.cieloService.post('/1/sales/', transaction);
        return response;
    }
    async captureTransaction(transaction) {
        const { paymentId, amount, ...rest } = transaction;
        const response = await this.cieloService.put(`/1/sales/${paymentId}/void?amount=${amount}`);
        return response;
    }
    async cancelTransaction(transaction) {
        const { paymentId, amount, ...rest } = transaction;
        const response = await this.cieloService.put(`/1/sales/${paymentId}/void?amount=${amount}`);
        return response;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cielo_service_1.CieloService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map