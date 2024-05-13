import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(RolesGuard)
  );
}
