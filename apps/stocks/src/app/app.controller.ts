import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller("stocks")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:id")
  getData(@Param('id') id: string) {
    return this.appService.getStock(id);
  }
}
