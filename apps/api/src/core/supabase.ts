import { createClient } from '@supabase/supabase-js';

// Allow local API boot without real Supabase credentials so /health and
// direct demo flows can run. Routes that require DB access will still fail
// gracefully at request time when real credentials are missing.
const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dev-local-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
