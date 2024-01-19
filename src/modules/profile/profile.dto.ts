import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Role } from 'src/interface/interfaces';

export class ProfileDto {
  @IsString({ message: 'First name should be a string!' })
  @IsNotEmpty({ message: 'First name should not be empty!' })
  firstName: string;

  @IsString({ message: 'Last name should be a string!' })
  @IsNotEmpty({ message: 'Last name should not be empty!' })
  lastName: string;

  @IsString({ message: 'Phone should be a string!' })
  @MinLength(11, { message: 'Phone number must be 11 characters long!' })
  @MaxLength(11, { message: 'Phone number must be 11 characters long!' })
  phone: string;

  @IsString({ message: 'Bio should be a string!' })
  bio: string = '';

  @IsString({ message: 'Address should be a string!' })
  address: string = '';

  @IsString({ message: 'Job should be a string!' })
  job: string = '';

  @IsString({ message: 'Avatar should be a string!' })
  avatar: string = '';

  @IsEnum(Role, { message: 'role must be valid!' })
  @IsNotEmpty({ message: 'the role not must be empty!' })
  role: Role;
}
