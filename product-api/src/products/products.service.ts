import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/common/errors';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService){}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
      include: { Category: true }, 
    });
  }

async findAll(dto: { name?: string, page?: string, limit?: string }) {
  const name = dto.name;
  
  // Converte aqui dentro para o Prisma não reclamar
  const page = Number(dto.page) || 1;
  const limit = Number(dto.limit) || 16;
  const skip = (page - 1) * limit;

  const where = name ? { 
    name: { contains: name, mode: 'insensitive' as const } 
  } : {};

  const [data, total] = await Promise.all([
    this.prismaService.product.findMany({
      where,
      skip: skip,
      take: limit,
      include: { Category: true },
      orderBy: { id: 'desc' } // Ordem decrescente
    }),
    this.prismaService.product.count({ where })
  ]);

  return {
    data,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit)
    }
  };
}

 async findOne(id: number) {
     const product = await this.prismaService.product.findFirst({
      where:{
        id,
      },
      include: { Category: true }
    });
    if(!product){
      throw new NotFoundError('Product', id);
    }
    return product; 
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
         const product = await this.prismaService.product.findFirst({
      where:{
        id,
      }
    });
    if(!product){
      throw new NotFoundError('Product', id);
    }
    return  this.prismaService.product.update({
      where:{
        id,
      },
      data: updateProductDto,
    });
  }

 async remove(id: number) {
         const product = await this.prismaService.product.findFirst({
      where:{
        id,
      }
    });
    if(!product){
      throw new NotFoundError('Product', id);
    }
    return this.prismaService.product.delete({
      where:{
        id,
      },
    })
  }
}
