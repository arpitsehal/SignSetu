const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // This is no longer needed
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
};

export default nextConfig;
