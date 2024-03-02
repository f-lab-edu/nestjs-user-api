import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  'google-oauth',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('googleClientId'),
      clientSecret: configService.get('googleClientSecret'),
      callbackURL: configService.get('googleCallbackUrl'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { displayName, emails } = profile;
    const user = {
      email: emails[0].value,
      name: displayName,
    };
    done(null, user);
  }
}
