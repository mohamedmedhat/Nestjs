import {
  Controller,
  Param,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './Dto/userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createOne(@Body() createuserdto: createUserDto) {
    return this.userService.createOne(createuserdto);
  }

  @Get(':id')
  // @HttpCode(HttpStatus.CREATED)
  findAll(@Param('id') id: number) {
    return this.userService.findAll(id);
  }

  //https://localhost:3000/users?limit=200&offset=100
  @Get('')
  findbyQuery(@Query() query) {
    const { limit, offset } = query;
    return `limit is ${limit} and offset is ${offset}`;
  }

  @Get('rel')
  findRel() {
    return this.userService.findRel();
  }
}
