import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/interface/interfaces';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty!' })
  @MinLength(6, { message: 'password length must be greater than 6' })
  password: string;

  @IsEnum(Role, { message: 'role must be valid!' })
  role: Role;
}
