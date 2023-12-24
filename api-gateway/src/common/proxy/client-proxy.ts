import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxySis{
  constructor(private readonly config:ConfigService){}

  clientProxyUsers():ClientProxy{
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: [this.config.get('RABBITMQ_URL')],
        queue: RabbitMQ.UserQueue,
      }
    })
  }
  clientProxyProductos():ClientProxy{
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: [this.config.get('RABBITMQ_URL')],
        queue: RabbitMQ.ProductoQueue,
      }
    })
  }
}