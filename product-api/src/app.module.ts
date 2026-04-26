import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule,CategoryModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
