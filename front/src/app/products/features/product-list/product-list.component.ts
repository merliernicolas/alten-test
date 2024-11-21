import { Component, OnInit, inject, signal } from "@angular/core";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { PaginatorModule } from "primeng/paginator";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    PaginatorModule,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  public readonly products = this.productsService.products; 
  public filteredProducts: Product[] = []; 
  public paginatedProducts: Product[] = []; 
  public rowsPerPage: number = 5; 
  public currentPage: number = 0; 

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe(() => {
      this.filteredProducts = this.products(); 
      this.updatePagination();
    });
  }

  private updatePagination() {
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  public onPageChange(event: any) {
    this.currentPage = Math.floor(event.first / this.rowsPerPage);
    this.updatePagination();
  }

  public filterByRating(rating: number) {
    this.filteredProducts = this.products().filter(product => product.rating === rating);
    this.currentPage = 0; 
    this.updatePagination();
  }

  public resetFilter() {
    this.filteredProducts = this.products();
    this.currentPage = 0;
    this.updatePagination();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.resetFilter(); 
    });
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe(() => {
        this.resetFilter(); 
      });
    } else {
      this.productsService.update(product).subscribe(() => {
        this.resetFilter(); 
      });
    }
    this.closeDialog();
  }

  public onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}