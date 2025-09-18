'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  view?: 'sign_in' | 'sign_up' | 'forgotten_password';
}

export default function AuthForm({ view = 'sign_in' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (view === 'sign_in') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success('Successfully signed in!');
        router.push('/dashboard');
      } else if (view === 'sign_up') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        
        toast.success('Check your email for the confirmation link!');
      } else if (view === 'forgotten_password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;
        
        toast.success('Password reset link sent to your email!');
      }
    } catch (error: any) {
      toast.error(error.error_description || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {view === 'sign_in' ? 'Sign in to your account' : 
           view === 'sign_up' ? 'Create a new account' : 'Reset your password'}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {view === 'sign_in' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => router.push(view === 'sign_in' ? '/signup' : '/login')}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {view === 'sign_in' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          {view !== 'forgotten_password' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={view === 'sign_up' ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          )}
        </div>

        {view === 'sign_in' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-500 dark:border-gray-600"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={() => router.push('/forgot-password')}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        )}

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {view === 'sign_in' ? 'Sign in' : 
             view === 'sign_up' ? 'Sign up' : 'Send reset link'}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-800">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              });
              if (error) toast.error(error.message);
            }}
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span className="ml-2">Google</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              });
              if (error) toast.error(error.message);
            }}
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.2 20 14.45 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2">GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
