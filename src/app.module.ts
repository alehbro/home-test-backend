import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Urls } from './urls/urls.model';
import { AppController } from "./app.controller";
import { UtilsService } from "./utils/utils.service";
import { UrlsController } from "./urls/urls.controller";
import { UrlsService } from "./urls/urls.service";

@Module({
  controllers: [AppController, UrlsController],
  providers: [UtilsService, UrlsService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Urls],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([Urls]),
  ],
})
export class AppModule {}
