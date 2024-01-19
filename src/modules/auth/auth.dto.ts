import { Role } from 'src/interface/interfaces';

export class CreateUserDto {
  email: string;
  password: string;
  role: Role;
}
