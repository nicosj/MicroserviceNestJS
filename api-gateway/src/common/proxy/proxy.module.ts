import { ClientProxySis } from "./client-proxy";
import { Module } from "@nestjs/common";

@Module({
  providers: [ClientProxySis],
  exports: [ClientProxySis]
})
export class ProxyModule {}