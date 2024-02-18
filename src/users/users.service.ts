import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserMapper } from './dto/UserMapper';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(id: number, userDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    user = UserMapper.updateUserEntity(user, userDto);
    user = await this.usersRepository.save(user);
    return UserMapper.mapUserToUserDto(user);
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.usersRepository.delete(id);

    return Boolean(res.affected);
  }
}
