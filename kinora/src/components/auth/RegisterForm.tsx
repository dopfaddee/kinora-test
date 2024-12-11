import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, phoneRegisterSchema, emailRegisterSchema } from '../../lib/auth';
import { Link } from 'react-router-dom';
import { RoleSelection } from './RoleSelection';
import { PhoneInput } from '../ui/PhoneInput';

export function RegisterForm() {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [registrationType, setRegistrationType] = useState<'phone' | 'email'>('phone');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registrationType === 'phone' ? phoneRegisterSchema : emailRegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Implement registration logic
      console.log(data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep('details');
  };

  const toggleRegistrationType = () => {
    setRegistrationType(prev => prev === 'phone' ? 'email' : 'phone');
    reset();
  };

  if (step === 'role') {
    return <RoleSelection selectedRole={selectedRole} onRoleSelect={handleRoleSelect} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register('lastName')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={registrationType} className="block text-sm font-medium text-gray-700">
          {registrationType === 'phone' ? 'Phone Number' : 'Email'}
        </label>
        {registrationType === 'phone' ? (
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
        {errors[registrationType] && (
          <p className="mt-1 text-sm text-red-600">{errors[registrationType]?.message}</p>
        )}
        <button
          type="button"
          onClick={toggleRegistrationType}
          className="mt-1 text-sm text-green-600 hover:text-green-500"
        >
          {registrationType === 'phone' 
            ? 'Register with email instead' 
            : 'Register with phone number instead'}
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

      <input type="hidden" {...register('role')} value={selectedRole || 'screenwriter'} />
      <input type="hidden" {...register('type')} value={registrationType} />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep('role')}
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          ← Back to role selection
        </button>
        <Link to="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
          Already have an account?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}