import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const supabase = createClient(
    environment.baseUrl,
    environment.apiKey,
    {
        auth: {
            persistSession: true
        }
    }
);