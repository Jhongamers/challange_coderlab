import { Module, OnModuleInit } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private categoryService: CategoryService,
  ) {}


async onModuleInit() {

  await this.prismaService.product.deleteMany(); 
  await this.prismaService.category.deleteMany();

  const names = ['Eletrônicos', 'Móveis', 'Vestuário'];
  
  for (const name of names) {
    await this.prismaService.category.create({
      data: { name }
    });
  }
  console.log('[Seed] Banco resetado e categorias oficiais criadas.');
}
}