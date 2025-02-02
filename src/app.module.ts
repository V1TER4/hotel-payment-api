import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SqsService } from './sqs/sqs.service';
import { SqsConsumerService } from './sqs/sqsConsumer.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TransactionModule ],
  controllers: [AppController],
  providers: [AppService, SqsService, SqsConsumerService ],
})
export class AppModule {}
