import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ProxyModule } from "../common/proxy/proxy.module";

@Module({
  imports:[
    UserModule,
    PassportModule ,
    ProxyModule,
    JwtModule.register({
    secret:'JWTCL4V3S3CR3T4',
    signOptions: {
      expiresIn: '12h',
      audience: 'https://todoapp.com',
    },
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
