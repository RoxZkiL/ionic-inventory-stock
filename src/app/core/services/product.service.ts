import { Injectable } from '@angular/core';
import { supabase } from 'src/app/core/client/supabase.client';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductService {

   private selectedProductSource = new BehaviorSubject<Product | null>(null);
    
    // Este es el que escuchará el componente de detalle
    selectedProduct$ = this.selectedProductSource.asObservable();

    // Método para guardar el producto antes de navegar
    setSelectedProduct(product: Product) {
        this.selectedProductSource.next(product);
    }

    clearSelectedProduct() {
        this.selectedProductSource.next(null);
    }

    // ─────────────────────────────────────────────
    // READ
    // ─────────────────────────────────────────────

    async getProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('title', { ascending: true });

        if (error) throw error;

        return data.map(product => {
            if (product.image) {
            if (product.image.startsWith('http')) {
                product.image = `https://images.weserv.nl/?url=${encodeURIComponent(product.image)}&w=300&h=320&fit=cover`;
            }
            }
            return product;
        });
    }

    async getProductById(id: string): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    // ─────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────

    async createProduct(product: CreateProductDTO): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // ─────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────

    async updateProduct(id: string, product: UpdateProductDTO): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // ─────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────

    async deleteProduct(id: string): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
}