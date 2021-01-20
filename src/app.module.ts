import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import {PropertiesModule} from "./properties/properties.module";
import {SheltersModule} from "./shelters/shelters.module";

@Module({
    imports: [
        PropertiesModule,
        SheltersModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ],
})
export class AppModule {
}
