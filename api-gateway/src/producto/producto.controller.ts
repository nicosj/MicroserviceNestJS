import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClientProxySis } from "../common/proxy/client-proxy";
import {ProductoDto} from "./dto/producto.dto";
import { Observable } from "rxjs";
import { ProductoMSG, RabbitMQ } from "../common/constants";
import { IProducto } from "../common/interfaces/producto.interface";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('productos')
@Controller('api/v2/producto')
export class ProductoController {
  constructor(private readonly productoService: ClientProxySis) {}
  private _clientProxyProducto= this.productoService.clientProxyProductos()
  @Post()
  create(@Body() productoDto:ProductoDto):Observable<IProducto> {
    return this._clientProxyProducto.emit(ProductoMSG.Create, productoDto);
  }
  @Get()
  getAll():Observable<IProducto[]>{
    return this._clientProxyProducto.send(ProductoMSG.GetAll,'')
  }
  @Get(':id')
  getbyId(@Param('id') id:string):Observable<IProducto>{
    return this._clientProxyProducto.send(ProductoMSG.GetById,id)
  }
  @Put(':id')
  update(@Param('id')id:string, @Body() productoDto:ProductoDto) :Observable<IProducto>{
    return this._clientProxyProducto.send(ProductoMSG.Update, { id,productoDto }
    )
  }

  @Delete(':id')
  delete(@Param('id') id:string):Observable<IProducto>{
    return this._clientProxyProducto.send(ProductoMSG.Delete,id)
  }
}
