import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonList, IonItem, IonFab, IonFabButton, 
  IonIcon, IonInput, IonTextarea, IonSpinner 
} from '@ionic/angular/standalone'; // <--- Faltaban inputs y textareas aquí
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/product.model';
import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, IonList, IonItem, IonFab, 
    IonFabButton, IonIcon, IonInput, IonTextarea, IonSpinner
  ]
})
export class ItemDetailPage implements OnInit {
  item: Product = {
    id: '',
    fakestore_id: 0,
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0
  };

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    addIcons({ add, trashOutline });
  }

  ngOnInit() {
    this.productService.selectedProduct$.subscribe(product => {
      if (product) {
        this.item = { ...product };
        this.loading = false;
      } else {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.loadFromSupabase(id);
        }
      }
    });
  }

  async loadFromSupabase(id: string) {
    try {
      this.loading = true;
      const data = await this.productService.getProductById(id);
      if (data) this.item = data;
    } catch (error) {
      console.error('Error cargando producto:', error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    // Limpiamos el producto seleccionado al salir de la pantalla
    this.productService.clearSelectedProduct(); 
  }
  
}