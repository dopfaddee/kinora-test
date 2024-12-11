import React from 'react';
import { roles } from '../../lib/auth';

interface RoleSelectionProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}

export function RoleSelection({ selectedRole, onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Choose your role</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleSelect(role.id)}
            className={`relative rounded-lg border p-4 text-left transition-colors ${
              selectedRole === role.id
                ? 'border-green-600 ring-2 ring-green-600'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{role.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{role.label}</p>
                <p className="mt-1 text-sm text-gray-500">{role.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}