import { LoginRequestDto } from './../common/dtos/login.request.dto';
import { User } from './../common/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
      select: ['password', 'nickname', 'id'],
    });
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const isRightPassword = await bcrypt.compare(data.password, user.password);
    if (!isRightPassword) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const jwt = this.jwtService.sign({ nickname: user.nickname, sub: user.id });

    return jwt;
  }
}
