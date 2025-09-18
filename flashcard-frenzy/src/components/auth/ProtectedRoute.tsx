'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { User } from '@supabase/supabase-js'; // Import User type

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Changed from any to User | null

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          toast.error('You must be logged in to access this page');
          router.push('/login');
          return;
        }

        setUser(session.user);

        if (requireAdmin) {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          if (userError || !userData?.is_admin) {
            toast.error('You do not have permission to access this page');
            router.push('/dashboard');
            return;
          }
        }
      } catch (error: unknown) { // Changed error to unknown
        console.error('Authentication error:', error);
        toast.error(
          (error instanceof Error && error.message) ||
            'An error occurred while authenticating'
        );
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting, no need to render anything
  }

  return <>{children}</>;
}