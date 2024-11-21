import { Component } from "@angular/core";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { BadgeModule } from "primeng/badge"; 

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, BadgeModule],
})
export class CartComponent {
  constructor(private readonly cartService: CartService) {}

  public readonly cart = this.cartService.getCart();

  ngOnInit() {
    console.log("Signal cart initialisé :", this.cart()); // Vérifie l'état initial
    if (this.cart().length === 0) {
      console.log("Panier vide détecté.");
    } else {
      console.log("Produits dans le panier :", this.cart());
    }
  }

  public onRemoveFromCart(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
}
