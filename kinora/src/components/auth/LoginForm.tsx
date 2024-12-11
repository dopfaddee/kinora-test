import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, phoneLoginSchema, emailLoginSchema } from '../../lib/auth';
import { Link } from 'react-router-dom';
import { PhoneInput } from '../ui/PhoneInput';

export function LoginForm() {
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginType === 'phone' ? phoneLoginSchema : emailLoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Implement login logic
      console.log(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const toggleLoginType = () => {
    setLoginType(prev => prev === 'phone' ? 'email' : 'phone');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor={loginType} className="block text-sm font-medium text-gray-700">
          {loginType === 'phone' ? 'Phone Number' : 'Email'}
        </label>
        {loginType === 'phone' ? (
          <PhoneInput
            register={register}
            name="phone"
            error={errors.phone?.message}
            className="mt-1"
          />
        ) : (
          <input
            {...register('email')}
            type="email"
            placeholder="email@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        )}
        {errors[loginType] && (
          <p className="mt-1 text-sm text-red-600">{errors[loginType]?.message}</p>
        )}
        <button
          type="button"
          onClick={toggleLoginType}
          className="mt-1 text-sm text-green-600 hover:text-green-500"
        >
          {loginType === 'phone' 
            ? 'Sign in with email instead' 
            : 'Sign in with phone number instead'}
        </button>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <input type="hidden" {...register('type')} value={loginType} />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
            Don't have an account?
          </Link>
        </div>
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}