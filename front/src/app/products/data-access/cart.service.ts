import { computed, Injectable, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart = signal<Product[]>([]);

  getCart() {
    return this.cart.asReadonly();
  }

  addToCart(product: Product) {
    const existingProduct = this.cart().find(p => p.id === product.id);
    if (!existingProduct) {
      this.cart.set([...this.cart(), { ...product, quantity: 1 }]);
    } else {
      existingProduct.quantity! += 1;
      this.cart.set([...this.cart()]);
    }
  }

  removeFromCart(productId: number) {
    const updatedCart = this.cart().filter(p => p.id !== productId);
    this.cart.set(updatedCart);
  }

  public cartCount = computed(() =>
    this.cart().reduce((count, product) => count + (product.quantity || 0), 0)
  );

  clearCart() {
    this.cart.set([]);
  }
}