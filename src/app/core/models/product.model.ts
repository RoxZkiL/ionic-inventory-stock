export interface Product {
    id: string;              // uuid
    fakestore_id: number;    // int unique
    title: string;           // text
    description: string;     // text
    price: number;           // numeric
    category: string;        // text
    image: string;           // text
    stock: number;           // int default 0
}

// Para POST: no mandas id, lo genera Supabase con gen_random_uuid()
export type CreateProductDTO = Omit<Product, 'id'>;

// Para PATCH: todo es opcional
export type UpdateProductDTO = Partial<CreateProductDTO>;