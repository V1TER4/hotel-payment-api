import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { SqsService } from '../../sqs/sqs.service';
import { CieloService } from 'src/cielo/cielo.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ HttpModule, ConfigModule ],
  controllers: [TransactionController],
  providers: [TransactionService, SqsService, CieloService],
  exports: [TransactionService]
})
export class TransactionModule {}