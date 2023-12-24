import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly isActive: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly createdAt: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly updatedAt: Date;
}