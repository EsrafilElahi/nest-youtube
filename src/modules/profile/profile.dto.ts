import { Role } from 'src/interface/interfaces';

export class ProfileDto {
  userId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  address?: string;
  job?: string;
  avatar?: string;
  role?: Role;
}
