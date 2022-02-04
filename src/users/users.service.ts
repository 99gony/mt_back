import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async localJoin(data) {
    const hashedpassword = await bcrypt.hash(data.password, 10);
    const newUser = this.usersRepository.create({
      email: data.email,
      password: hashedpassword,
      nickname: data.nickname,
    });
    return await this.usersRepository.save(newUser);
  }
}
