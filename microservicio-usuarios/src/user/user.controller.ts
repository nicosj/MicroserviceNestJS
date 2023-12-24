import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserMSG } from "../common/constants";

@Controller()
export class UserController {
  constructor(private readonly userService:UserService) {
  }
  @MessagePattern(UserMSG.Create)
  create(@Payload() userDto: UserDto) {
    return this.userService.create(userDto)
  }

  @MessagePattern(UserMSG.GetAll)
  findAll() {
    return this.userService.findAll()
  }
  @MessagePattern(UserMSG.GetById)
  findOne(@Payload() id:string) {
    return this.userService.findOne(id)
  }

  @MessagePattern(UserMSG.Update)
  update(@Payload() payload:any){
    return this.userService.update(payload.id,payload.userDto)
  }
  @MessagePattern(UserMSG.Delete)
  delete(@Payload() id:string){
    return this.userService.delete(id)
  }
  @MessagePattern(UserMSG.Valid)
  async validateUser(@Payload() payload):Promise<any>{
    const user = await this.userService.findbyUsername(payload.username);
    if(!user) throw new Error('User not found');
    const isValid = await this.userService.comparePassword(payload.password,user.password);
    if(user && isValid){
      return user;
    }
    return null;
  }
}
