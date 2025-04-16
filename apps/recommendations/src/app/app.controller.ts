import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('recommendations')
export class AppController {
  constructor(private readonly recommendationService: AppService) {}

  @Get("/:id")
  getRecommendations() {
    return this.recommendationService.get();
  }
}