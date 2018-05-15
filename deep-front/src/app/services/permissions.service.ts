import {Injectable} from '@angular/core';
import {User} from '../models/User';

@Injectable()
export class PermissionsService {
  public IsInRole(user: User, role: string): boolean {
    return user.role == role;
  }
}
