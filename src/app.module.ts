import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import {PropertiesModule} from "./properties/properties.module";
import {SheltersModule} from "./shelters/shelters.module";
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';


@Module({
    imports: [
        PropertiesModule,
        SheltersModule,
        GraphQLModule.forRoot({
            debug: false,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ],
})
export class AppModule {
}
