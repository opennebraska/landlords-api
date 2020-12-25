import {Module} from '@nestjs/common';
import {MealsModule} from './meals/meals.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import {PropertiesModule} from "./properties/properties.module";

@Module({
    imports: [
        MealsModule,
        PropertiesModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ],
})
export class AppModule {
}
