import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule,
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://Alexander:mI8hedGHekO5mkO8@cluster0.nxnowzl.mongodb.net/indira?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
