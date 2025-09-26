import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to generate Health ID
export const generateHealthId = () => {
  const year = new Date().getFullYear()
  const randomNum = Math.floor(Math.random() * 900000) + 100000
  return `HS-${year}-${randomNum}`
}