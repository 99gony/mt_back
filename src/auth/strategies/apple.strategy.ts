import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyLocation: process.env.APPLE_KEY_LOCATION,
      passReqToCallback: true,
    });
  }

  async validate(accessToken, refreshToken, idToken, profile, done) {
    console.log('idToken :', idToken);
    console.log('profile :', profile);
    done(null, idToken);
  }
}
