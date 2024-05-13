import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async register({ name, email, password }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if(user)  throw new BadRequestException('El usuario ya existe');

        return await this.usersService.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if(!user) throw new UnauthorizedException('Email incorrecto');

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

        const payload = { email: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload)
          };
    }

    async profile({email, role}: { email: string; role: string }) {
        //if(role !== 'admin') throw new UnauthorizedException('No tienes permisos');
        
        return await this.usersService.findOneByEmail(email);
    }
}
