'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { safeReturnTo } from '@/lib/auth-navigation';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email wajib diisi')
    .email('Email tidak valid')
    .max(254, 'Email terlalu panjang'),
  password: z.string().min(8, 'Password minimal 8 karakter').max(128, 'Password terlalu panjang'),
  remember: z.boolean(),
});

const sessionResponseSchema = z.object({
  user: z.object({
    userId: z.string().min(1).max(128),
    tenantId: z.string().min(1).max(128),
    roles: z.array(z.string().min(1).max(64)).min(1).max(20),
    email: z.string().max(254),
  }),
});

type LoginInput = z.infer<typeof loginSchema>;

interface LoginFormProps {
  readonly returnTo?: string;
}

export function LoginForm({ returnTo }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  async function onSubmit(data: LoginInput) {
    const destination = safeReturnTo(returnTo);

    setIsLoading(true);
    setServerError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof body === 'object' &&
          body !== null &&
          'error' in body &&
          typeof body.error === 'string'
            ? body.error
            : 'Login gagal';
        throw new Error(message);
      }
      const session = sessionResponseSchema.safeParse(body);
      if (!session.success || !session.data.user.roles.includes('admin')) {
        throw new Error('Respons sesi tidak valid');
      }

      login(session.data.user);
      toast.success('Welcome back, admin!');
      router.replace(destination);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login gagal';
      setServerError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  const errors = form.formState.errors;

  return (
    <div className="animate-in-up">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back 👋</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your admin account</p>
      </div>

      {serverError && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@michishirube.dev"
            autoComplete="email"
            aria-invalid={!!errors.email}
            disabled={isLoading}
            {...form.register('email')}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-primary hover:underline" tabIndex={-1}>
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              disabled={isLoading}
              className="pr-10"
              {...form.register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            disabled={isLoading}
            checked={form.watch('remember')}
            onCheckedChange={(v) => form.setValue('remember', Boolean(v))}
          />
          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isLoading}
        onClick={() => toast.info('SSO belum tersedia')}
      >
        🔑 Continue with SSO
      </Button>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <span className="font-medium text-foreground">Contact administrator</span>
      </p>

    </div>
  );
}
