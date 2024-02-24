import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('databaseHost'),
        port: configService.get('databasePort'),
        username: configService.get('databaseUser'),
        password: configService.get('databasePassword'),
        database: configService.get('databaseDb'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
