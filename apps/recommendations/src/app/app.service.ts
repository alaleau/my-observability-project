
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private recommendations = [
    { id: 1, name: 'Pommes bio', category: 'Fruits', rating: 4.5 },
    { id: 2, name: 'Pain complet', category: 'Boulangerie', rating: 4.8 },
    { id: 3, name: 'Lait d’amande', category: 'Boissons', rating: 4.3 },
    { id: 4, name: 'Yaourt grec', category: 'Produits laitiers', rating: 4.7 },
    { id: 5, name: 'Poulet fermier', category: 'Viandes', rating: 4.6 },
    { id: 6, name: 'Saumon fumé', category: 'Poissons', rating: 4.9 },
    { id: 7, name: 'Riz basmati', category: 'Céréales', rating: 4.4 },
    { id: 8, name: 'Chocolat noir', category: 'Confiseries', rating: 4.8 },
    { id: 9, name: 'Eau minérale', category: 'Boissons', rating: 4.2 },
    { id: 10, name: 'Fromage de chèvre', category: 'Produits laitiers', rating: 4.5 },

  ];

  get() {
    const randomCount = Math.floor(Math.random() * this.recommendations.length) + 1;
    const shuffled = this.recommendations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  }
}