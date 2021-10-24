import { createClient } from '@supabase/supabase-js';

export default ({ $config }, inject) =>
{
  const supabaseUrl = $config.supabaseUrl;
  const supabaseAnonKey = $config.supabaseKey;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  inject('supabase', supabase);
};
