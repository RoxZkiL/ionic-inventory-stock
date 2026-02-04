import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const supabase = createClient(
    environment.baseUrl,
    environment.apiKey,
    {
        auth: {
            autoRefreshToken: true,  // Deja que Supabase lo maneje internamente
            persistSession: true,
            detectSessionInUrl: true,
            flowType: 'pkce'        // Si usas flujos modernos, esto ayuda a la estabilidad
        }
    }
);