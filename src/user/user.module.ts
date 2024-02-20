import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/user/entities/user-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/user/entities/course-entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
