import {
    Controller,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Delete,
    Body,
    Put,
    UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return this.userService.findOne(id);
    }
    @Post()
    async create(@Body() user: CreateUserDto): Promise<UserDto> {
        return this.userService.create(user);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() userDto: UpdateUserDto
    ): Promise<UserDto> {
        return this.userService.update(id, userDto);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.userService.delete(id);
    }
}
