import { Injectable } from '@nestjs/common';

import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../user/dto/user.dto";
import { ClientProxySis } from "./../common/proxy/client-proxy";
import { UserMSG } from "../common/constants";

@Injectable()
export class AuthService {
  constructor(private readonly clientProxy:ClientProxySis,
              private readonly jwtService:JwtService){}
  private _clientProxy = this.clientProxy.clientProxyUsers();
  async validateUser(username:string, password:string):Promise<any>{
    const user = await this._clientProxy.send(UserMSG.Valid,{username,password}).toPromise();
    if(!user) throw new Error('User not found');
    //const isValid = await this.userService.comparePassword(password,user.password);

    if(user) return user;

    return null;
  }
  async login(user:any){
    const payload = { username: user.username, sub: user._id };
    console.log( payload.sub  + 'payload');
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  async register(userDto:UserDto){
    return await this._clientProxy.send(UserMSG.Create,userDto).toPromise();
  }
}
