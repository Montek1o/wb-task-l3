import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
  }

  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const favoriteLink = document.querySelector('.favoriteLink') as HTMLElement;
    const favoriteCounter = document.querySelector('.js__favorite-counter') as HTMLElement;  

    if (products.length > 0) {
      favoriteLink.style.display = 'block';
    } else {
      favoriteLink.style.display = 'none';
    }

    favoriteCounter.innerHTML = String(count);
  }
}

export const favoriteService = new FavoriteService();