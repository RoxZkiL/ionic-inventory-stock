import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, NavController, IonChip, IonSearchbar, IonCard, IonInfiniteScrollContent, IonInfiniteScroll, IonSkeletonText } from '@ionic/angular/standalone';
import { ProductService } from '../core/services/product.service';
import { Product } from '../core/models/product.model';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.page.html',
  styleUrls: ['./inventory-items.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule, IonSearchbar, IonCard, IonChip,
    IonInfiniteScrollContent, IonInfiniteScroll, IonSkeletonText
  ],
})
export class InventoryItemsPage implements OnInit {

  isLoading: boolean = true
  products: any[] = [];
  searchTerm: string = '';
  filteredProducts: any[] = [];

  allProducts: any[] = [];
  itemsToShow = 5; 
  isInfiniteScrollDisabled = false;


  constructor(private navCtrl: NavController, private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const products = await this.productService.getProducts(); 
      this.allProducts = products;
      this.filteredProducts = this.allProducts.slice(0, this.itemsToShow);
      
      this.isInfiniteScrollDisabled = this.allProducts.length <= this.itemsToShow;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  loadMore(event: any) {
    const currentCount = this.filteredProducts.length;

    if (currentCount >= this.allProducts.length) {
      this.isInfiniteScrollDisabled = true;
      event.target.complete();
      return;
    }

    setTimeout(() => {
      const nextBatch = this.allProducts.slice(currentCount, currentCount + this.itemsToShow);
      this.filteredProducts = [...this.filteredProducts, ...nextBatch];
      
      event.target.complete();

      // 4. Si después de esta carga ya no hay más, desactivamos
      if (this.filteredProducts.length >= this.allProducts.length) {
        this.isInfiniteScrollDisabled = true;
      }
    }, 400);
  }

  filterProducts() {
    const term = this.searchTerm?.trim().toLowerCase() || '';
    if (!term) {
      this.clearSearch();
      return;
    }
    this.isInfiniteScrollDisabled = true; // Desactivar scroll durante búsqueda
    this.filteredProducts = this.allProducts.filter(p => 
      (p.title || '').toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredProducts = this.allProducts.slice(0, this.itemsToShow);
    this.isInfiniteScrollDisabled = this.allProducts.length <= this.itemsToShow;
  }

  getCategoryClass(category?: string): string {
    if (!category) return 'category-default';
    const cat = category.toLowerCase().trim();
    const map: Record<string, string> = {
      'electronics': 'category-electronics',
      "women's clothing": 'category-womens-clothing',
      "men's clothing": 'category-mens-clothing',
      'jewelery': 'category-jewelery'
    };
    return map[cat] || 'category-default';
  }

  navigateToDetail(product: Product) {
    console.log('Objeto recibido en la lista:', product);
    this.productService.setSelectedProduct(product);
    this.navCtrl.navigateForward(`/item-detail/${product.id}`);
  }

} 