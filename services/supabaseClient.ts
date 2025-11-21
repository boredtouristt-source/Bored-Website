
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpfudnucopawxfoxeotv.supabase.co';
const supabaseKey = 'sb_publishable_UwkN_X5z0Yzx4IQYZIt57g_skhUl4Rk';

export const supabase = createClient(supabaseUrl, supabaseKey);
