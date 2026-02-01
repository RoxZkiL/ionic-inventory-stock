import { Injectable } from '@angular/core';
import { supabase } from 'src/app/core/client/supabase.client';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';


@Injectable({ providedIn: 'root' })
export class ProductService {

    // ─────────────────────────────────────────────
    // READ
    // ─────────────────────────────────────────────

    async getProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('title', { ascending: true });

        if (error) throw error;
        return data;
    }

    async getProductById(id: string): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();       // .single() retorna un objeto, no un array

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
            .select()        // .select() retorna el objeto creado
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