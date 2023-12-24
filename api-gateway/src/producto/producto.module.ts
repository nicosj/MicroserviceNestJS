import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProxyModule } from "../common/proxy/proxy.module";

@Module({
  imports: [ProxyModule],
  controllers: [ProductoController]
})
export class ProductoModule {}
