import {Injectable, Logger} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  private products = [
    { "id": "1", "name": "Pain de campagne", "price": 1.49, "description": "Pain traditionnel à la croûte épaisse" },
    { "id": "2", "name": "Bouteille d'eau", "price": 0.25, "description": "Eau minérale naturelle 1L" },
    { "id": "3", "name": "Lait demi-écrémé", "price": 0.85, "description": "Bouteille de lait demi-écrémé 1L" },
    { "id": "4", "name": "Poulet rôti", "price": 7.99, "description": "Poulet entier rôti, prêt à consommer" },
    { "id": "5", "name": "Pommes de terre", "price": 2.49, "description": "Sac de 2 kg de pommes de terre" },
    { "id": "6", "name": "Tomates", "price": 2.99, "description": "Barquette de tomates fraîches" },
    { "id": "7", "name": "Pâtes spaghetti", "price": 1.69, "description": "Paquet de pâtes spaghetti 500g" },
    { "id": "8", "name": "Savon de Marseille", "price": 3.49, "description": "Savon traditionnel de Marseille, 300g" },
    { "id": "9", "name": "Shampooing", "price": 2.99, "description": "Shampooing doux pour cheveux normaux" },
    { "id": "10", "name": "Café moulu", "price": 4.29, "description": "Café moulu, 250g" },
    { "id": "11", "name": "Fromage râpé", "price": 3.49, "description": "Fromage râpé, 200g" },
    { "id": "12", "name": "Yaourt nature", "price": 0.59, "description": "Yaourt nature 125g" },
    { "id": "13", "name": "Jus d'orange", "price": 1.99, "description": "Bouteille de jus d'orange frais 1L" },
    { "id": "14", "name": "Céréales", "price": 2.29, "description": "Céréales petit déjeuner, 500g" },
    { "id": "15", "name": "Jambon de Paris", "price": 4.99, "description": "Tranches de jambon de Paris"},
    { "id": "16", "name": "Beurre", "price": 2.50, "description": "Beurre doux, 250g" },
    { "id": "17", "name": "Miel", "price": 5.99, "description": "Pot de miel, 500g" },
    { "id": "18", "name": "Confiture de fraises", "price": 3.99, "description": "Confiture de fraises, 370g" },
    { "id": "19", "name": "Huile d'olive", "price": 6.49, "description": "Bouteille d'huile d'olive, 1L" },
    { "id": "20", "name": "Riz basmati", "price": 2.99, "description": "Paquet de riz basmati, 1kg" }
  ];

  findAll() {
    return this.products;
  }

  async findOne(id: string) {
    const product = this.products.find(product => product.id === id)
    if(product){
      this.logger.log(`Searching for product with id: ${id}`);
      const stock = await this.httpService.get(`http://localhost:3001/api/stocks/${id}`).toPromise();
      if(id==="20"){
         await this.httpService.get(`http://localhost:3001/api/stocks/${id}`).toPromise();
      }

      return { ...product, quantity: stock.data };
    }
    return product;
  }

  remove(id: string) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return { message: 'Product removed' };
    }
    return null;
  }
}
