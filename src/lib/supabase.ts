// Re-export the supabase client from the integrations folder
export { supabase } from '@/integrations/supabase/client'

// Helper function to generate Health ID
export const generateHealthId = () => {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 900000) + 100000
  return `HS-${year}-${randomNum}`
}