import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService, 
    private productsService: ProductsService
  ) {}

  async onModuleInit() {
    // 1. Aguarda um curto tempo para garantir que as categorias foram criadas
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Busca uma categoria real no banco para evitar erro de chave estrangeira
    const category = await this.prismaService.category.findFirst();

    if (!category) {
      console.warn('[Seed] Nenhuma categoria encontrada. O seed de produtos será pulado.');
      return;
    }

    // 3. Verifica se já existem produtos para não duplicar ou causar erro de delete
    const productsCount = await this.prismaService.product.count();
    
    if (productsCount === 0) {
      const productsToCreate = new Array(20).fill(0).map((_, index) => index + 1);
      
      console.log(`[Seed] Criando ${productsToCreate.length} produtos iniciais...`);

      for (const index of productsToCreate) {
        await this.productsService.create({
          name: `Produto ${index}`,
          description: `Descrição do produto ${index}`,
          categoryId: category.id, 
          price: index * 10,
          stock: index * 5,
        });
      }
      console.log('[Seed] Produtos criados com sucesso.');
    } else {
      console.log('[Seed] Produtos já existentes no banco. Pulando criação.');
    }
  }
}