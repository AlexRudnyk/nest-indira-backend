import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CommentsModule } from './comments/comments.module';
import { SendEmailModule } from './send-email/send-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_HOST),
    ProductsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    SendEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
