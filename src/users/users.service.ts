import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'john123'
    },
    {
      id: 2,
      name: 'Maria',
      email: 'mari@gmail.com',
      password: 'mari123'
    },
    {
      id: 3,
      name: 'Alex',
      email: 'alex@gmail.com',
      password: '$2b$10$yXvtpsaL79WaV92172g.L.eZhzR8pJFQHZ42CXeCFxBn2o8rh/b62'
    },
    {
      id: 4,
      name: 'Juana',
      email: 'juana@gmail.com',
      password: 'juana123'
    }
  ]

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `Actualizando el usuario con id #${id}`;
  }

  remove(id: number) {
    return `Borrando el usuario con id #${id}`;
  }
}
