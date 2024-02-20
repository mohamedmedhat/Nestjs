import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}
