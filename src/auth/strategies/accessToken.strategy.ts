import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_ACCESS_SECRET } from '@src/constants/constants';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_SECRET,
    });
  }

  public validate(payload: JwtPayload) {
    return payload;
  }
}
