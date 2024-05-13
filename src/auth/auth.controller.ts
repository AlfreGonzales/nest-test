import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
    user: { email: string; role: string };
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    register(@Body() user: RegisterDto){
        return this.authService.register(user);
    }
    
    @Public()
    @Post('login')
    login(@Body() user: LoginDto) {
        return this.authService.login(user);
    }

    //@UseGuards(AuthGuard)
    /* @Get('profile')
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    profile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user);
    } */

    @Get('profile')
    @Auth(Role.USER)
    profile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user);
    }
}
