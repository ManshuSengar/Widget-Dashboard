import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly storageService: StorageService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const users = this.storageService.readUsers();
    
    if (!users[email]) {
      users[email] = {
        email,
        lastLogin: new Date().toISOString()
      };
      this.storageService.writeUsers(users);
    } else {
      users[email].lastLogin = new Date().toISOString();
      this.storageService.writeUsers(users);
    }

    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return {
      success: true,
      token,
      user: {
        email,
        name: email.split('@')[0]
      }
    };
  }

  validateToken(token: string): string {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const email = decoded.split(':')[0];
      return email;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
