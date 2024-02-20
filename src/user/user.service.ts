import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { createUserDto } from './Dto/userDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user-entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './updateDto/updateDto';
import { Course } from 'src/user/entities/course-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  createOne(@Body() createuserdto: createUserDto) {
    const newuser = this.userRepository.create({
      ...createuserdto,
    });
    return this.userRepository.save(newuser);
  }

  findRel(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['course'],
    });
  }

  findAll(id: number): Promise<User[]> {
    return this.userRepository.find({
      where: { id },
    });
  }

  async updateOne(id: number, updateuserdto: UpdateUserDto) {
    const updateUsers = await this.userRepository.preload({
      id: +id,
      ...updateuserdto,
    });

    if (!updateUsers) {
      throw new NotFoundException(`This user :${id} not found`);
    }
    return this.userRepository.save(updateUsers);
  }

  removeOne(id: string) {
    this.userRepository.delete(id);
  }

  private async preloadCourseByName(name: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { name },
    });
    if (course) {
      return course;
    }
    return this.courseRepository.create({ name });
  }
}
