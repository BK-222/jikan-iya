import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gynhgqsdfnjuevkgrtaw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bmhncXNkZm5qdWV2a2dydGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NDYxMTUsImV4cCI6MjA0MzEyMjExNX0.dcPO3mlOyIP4syB5YnEuEYg4lq4I06ZgYXU_k_6zPKM';

const supabase = createClient(supabaseUrl, supabaseKey);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      supabase,
    },
  }
});