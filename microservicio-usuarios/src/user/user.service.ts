import { Injectable } from '@nestjs/common';
import { UserDto } from "./dto/user.dto";
import { IUser } from "../common/interfaces/user.interface";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { USER } from "../common/models/models";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model:Model<IUser>) {
  }
  async hashPassword(password:string):Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt)
  }
  async create(userDto:UserDto):Promise<IUser>{
    const hash= await this.hashPassword(userDto.password);
    const newUser= new this.model({
      ... userDto,
      password:hash
    })
    return await newUser.save();
  }

  async findAll():Promise<IUser[]>{
    return await this.model.find();
  }
  async findOne(id:string):Promise<IUser>{
    return await this.model.findById(id);
  }
  async update(id:string,userDto:UserDto):Promise<IUser>{
    const hash= await this.hashPassword(userDto.password);
    const user= {...userDto,password:hash}
    return await this.model.findByIdAndUpdate(id,user,{new:true});
  }
  async delete(id:string):Promise<IUser>{
    const user= await this.model.findById(id);
    await this.model.findByIdAndDelete(id);
    return user;
  }
  async findbyUsername(name:string):Promise<IUser>{
    return await this.model.findOne({username:name})
  }
  async comparePassword(attempt:string, password:string):Promise<boolean>{
    return await bcrypt.compare(attempt,password);
  }
}
