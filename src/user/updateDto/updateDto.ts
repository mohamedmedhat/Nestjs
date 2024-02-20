import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from '../Dto/userDto';

export class UpdateUserDto extends PartialType(createUserDto) {}
