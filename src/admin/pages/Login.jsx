import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PasswordInput } from '../components/form/PasswordInput';
import { FormFieldWrapper } from '../components/form/FormFieldWrapper';
import { useToast } from '../hooks/use-toast';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
      
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'Invalid credentials',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-brand-card border-brand-purple/20 shadow-card-shadow">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-brand-gold">Admin Portal</CardTitle>
          <CardDescription className="text-brand-gray">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldWrapper id="email" label="Email Address" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className="bg-brand-darker border-brand-purple/30 text-brand-text focus-visible:ring-brand-gold"
              />
            </FormFieldWrapper>
            
            <FormFieldWrapper id="password" label="Password" error={errors.password?.message}>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                {...register('password')}
                className="bg-brand-darker border-brand-purple/30 text-brand-text focus-visible:ring-brand-gold"
              />
            </FormFieldWrapper>

            <Button
              type="submit"
              className="w-full bg-brand-gold hover:bg-brand-teal text-brand-dark font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
