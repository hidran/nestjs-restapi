import { User } from '../entities/user.entity';
import { UpdateUserDto } from './update-user.dto';
import { UserDto } from './user.dto';

export class UserMapper {
  static mapUserToUserDto(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email.toLowerCase();
    userDto.name = user.name;
    userDto.email = user.email.toLowerCase(); // Esempio di manipolazione: email in lowercase
    userDto.lastName = user.lastName;
    userDto.province = user.province;
    userDto.created_at = user.created_at;
    userDto.updated_at = user.updated_at;
    userDto.deleted_at = user.deleted_at;
    return userDto;
  }

  static updateUserEntity(entity: User, updateDto: UpdateUserDto): User {
    if (updateDto.name) {
      entity.name = updateDto.name;
    }
    if (updateDto.email) {
      entity.email = updateDto.email;
    }
    if (updateDto.lastName) {
      entity.lastName = updateDto.lastName;
    }
    if (updateDto.fiscalCode) {
      entity.fiscalCode = updateDto.fiscalCode;
    }
    if (updateDto.phone) {
      entity.phone = updateDto.phone;
    }
    if (updateDto.province) {
      entity.province = updateDto.province;
    }
    return entity;
  }
}
