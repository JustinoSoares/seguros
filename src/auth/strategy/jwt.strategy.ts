import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY, // Substitua por uma variável de ambiente
    });
  }

  async validate(payload: any) {
    // Retorna o payload que será acessível nas rotas protegidas
    return { userId: payload.sub, email: payload.email };
  }
}
