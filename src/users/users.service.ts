import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserMapper } from './dto/UserMapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => UserMapper.mapUserToUserDto(user));
  }
  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const userCreated = this.usersRepository.create(user);
    const created = await this.usersRepository.save(userCreated);
    return UserMapper.mapUserToUserDto(created);
  }
  async delete(id: number): Promise<boolean> {
    const res = await this.usersRepository.delete(id);

    return Boolean(res.affected);
  }
}
