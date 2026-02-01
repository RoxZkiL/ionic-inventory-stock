import { Injectable } from '@angular/core';
import { supabase } from 'src/app/core/client/supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {

    // ─────────────────────────────────────────────
    // Login
    // ─────────────────────────────────────────────
    // Retorna una Promise (no Observable) porque así retorna el cliente de Supabase.
    // En el componente lo usamos con async/await en lugar de .subscribe()
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw error;
        }

        return data;
    }

    // ─────────────────────────────────────────────
    // Logout
    // ─────────────────────────────────────────────
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    // ─────────────────────────────────────────────
    // Sesión actual
    // ─────────────────────────────────────────────
    // Esto es lo que el guard usa para verificar si hay sesión activa.
    // getSession() ya lee automáticamente del storage donde Supabase persistió la sesión.
    async getSession() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    }
}