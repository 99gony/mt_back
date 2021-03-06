import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { DecodedIdToken, Strategy, VerifyCallback } from 'passport-apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private jwtService: JwtService) {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_KEY.replace(/\\n/g, '\n'),
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    idToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const decodedIdToken: DecodedIdToken = this.jwtService.verify(idToken);
    console.log(decodedIdToken);
    const user = {
      provider: 'apple',
      snsId: decodedIdToken.sub,
      password: decodedIdToken.sub,
    };
    console.log(user);
    done(null, user);
  }
}
