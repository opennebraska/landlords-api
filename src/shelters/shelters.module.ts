import { Module } from '@nestjs/common';
import { SheltersController } from './shelters.controller';
import { SheltersService } from './shelters.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SheltersRepository} from "./shelters.repository";
import {AuthModule} from "../auth/auth.module";
import {ShelterResolver} from "./shelters.resolver";

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([SheltersRepository])
  ],
  controllers: [SheltersController],
  providers: [SheltersService, ShelterResolver]
})
export class SheltersModule {}
