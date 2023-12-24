import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxySis } from "../common/proxy/client-proxy";
import { UserDto } from "./dto/user.dto";
import { Observable } from "rxjs";
import { IUser } from "../common/interfaces/user.interface";
import { UserMSG } from "../common/constants";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
@ApiTags('usuarios')
@UseGuards(JwtAuthGuard)

@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySis){}
  private clientProxyUsers = this.clientProxy.clientProxyUsers();
  @Post()
  create(@Body() userDTO: UserDto):Observable<IUser>{
    return this.clientProxyUsers.send(UserMSG.Create, userDTO);
  }
  @Post('validate')
  validate(@Body() userDTO: UserDto):Observable<IUser>{
    return this.clientProxyUsers.send(UserMSG.Valid, userDTO);
  }
  @Get()
  getAll():Observable<IUser[]>{
    return this.clientProxyUsers.send(UserMSG.GetAll, '');
  }
  @Get(':id')
  getById(@Param('id') id:string):Observable<IUser>{
    return this.clientProxyUsers.send(UserMSG.GetById, id);
  }
  @Put(':id')
  update(@Param('id') id:string, @Body() userDTO: UserDto):Observable<IUser>{
    return this.clientProxyUsers.send(UserMSG.Update, {id, userDTO});
  }
  @Delete(':id')
  delete(@Param('id') id:string):Observable<IUser>{
    return this.clientProxyUsers.send(UserMSG.Delete, id);
  }
}
