import { Role } from 'src/interface/interfaces';

export class ProfileDto {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  address: string;
  job: string;
  avatar: string;
  role: Role;
}
