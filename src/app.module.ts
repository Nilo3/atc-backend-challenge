import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ClubUpdatedHandler } from './domain/handlers/club-updated.handler';
import { GetAvailabilityHandler } from './domain/handlers/get-availability.handler';
import { ALQUILA_TU_CANCHA_CLIENT } from './domain/ports/aquila-tu-cancha.client';
import { HTTPAlquilaTuCanchaClient } from './infrastructure/clients/http-alquila-tu-cancha.client';
import { EventsController } from './infrastructure/controllers/events.controller';
import { SearchController } from './infrastructure/controllers/search.controller';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    ConfigModule.forRoot(),
    RedisModule,
  ],
  controllers: [SearchController, EventsController],
  providers: [
    {
      provide: ALQUILA_TU_CANCHA_CLIENT,
      useClass: HTTPAlquilaTuCanchaClient,
    },
    GetAvailabilityHandler,
    ClubUpdatedHandler,
  ],
})
export class AppModule { }