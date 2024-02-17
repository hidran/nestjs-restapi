import { User } from '../entities/user.entity';
import { UserDto } from './user.dto';

export class UserMapper {
  static mapUserToUserDto(user: User): UserDto {
    const userDto = new UserDto();
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
}
