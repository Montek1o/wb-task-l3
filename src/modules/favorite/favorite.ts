import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorite.tpl.html';
import { favoriteService } from '../../services/favorite.service';
import { ProductData } from 'types';

class Favorite extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoriteService.get();

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.favoriteProducts);
    });
  }
}

export const favoriteComp = new Favorite(html);