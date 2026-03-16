import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    console.log({ createProductDto });

    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const totalPages = await this.prisma.product.count({
      where: {
        available: true, // traemos solo los productos que estan disponibles ya que los en false supondrian que fueron eliminados
      },
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true, // traemos solo los productos que estan disponibles ya que los en false supondrian que fueron eliminados
        },
      }),
      meta: {
        totalPages: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: id,
        available: true, // traemos solo los productos que estan disponibles ya que los en false supondrian que fueron eliminados
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // si todas las propiedades del updateProductDto vienen vacias pordriamos valoiodar esto y no llamar, se podria optimizar de muchas formas

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: data, // de esta forma nos aseguramos de que no le pasamos el id
    });
  }

  // esta eliminacion no es conveniente porque podemos crear  problemas de integridad referencial, si estuviera asociado a una orden, se tendria que eliminar la orden primero.
  // Conviene hacer una nueva columna en la tabla de products para indicar si el producto esta disponible o no.
  // async remove(id: number) {
  //   await this.findOne(id);

  //   return this.prisma.product.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
  // Eliminacion suave
  async remove(id: number) {
    await this.findOne(id);

    const product = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        available: false,
      },
    });
    return product;
  }
}
