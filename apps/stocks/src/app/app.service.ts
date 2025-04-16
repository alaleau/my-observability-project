import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  getStock(id: string): number {
    const stock = {
      "1": 50,
      "2": 200,
      "3": 150,
      "4": 30,
      "5": 100,
      "6": 80,
      "7": 120,
      "8": 60,
      "9": 90,
      "10": 40,
      "11": 70,
      "12": 110,
      "13": 130,
      "14": 140,
      "15": 35,
      "16": 35,
      "17": 35,
      "18": 35,
      "19": 35,
    };

    if(id === "20"){
      throw new Error("Invalid stock ID");
    }

    return stock[id]
  }
}
