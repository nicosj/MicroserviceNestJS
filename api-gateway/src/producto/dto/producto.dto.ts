import { IsDecimal, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoriaDto } from "./categoria.dto";

export class ProductoDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  precio: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imagen: string;
  /*@ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoria: CategoriaDto;*/
}