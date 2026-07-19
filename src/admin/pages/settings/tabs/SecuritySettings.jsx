import React from 'react';
import { FormFieldWrapper } from '../../../components/form/FormFieldWrapper';

export default function SecuritySettings({ data = {}, onChange }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-purple/20 pb-4 mb-4">
        <h2 className="text-lg font-bold text-brand-gold">Security Configuration</h2>
        <p className="text-sm text-brand-gray">Manage authentication parameters and system defenses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper label="Session Timeout (Minutes)">
          <input
            type="number"
            min="15"
            value={data.sessionTimeoutMinutes || 480}
            onChange={(e) => onChange('sessionTimeoutMinutes', parseInt(e.target.value) || 480)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Password Expiry (Days)">
          <input
            type="number"
            min="0"
            value={data.passwordExpiryDays || 90}
            onChange={(e) => onChange('passwordExpiryDays', parseInt(e.target.value) || 90)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
          <p className="text-xs text-brand-gray mt-1">Set to 0 to disable expiry.</p>
        </FormFieldWrapper>

        <FormFieldWrapper label="Maximum Login Attempts">
          <input
            type="number"
            min="1"
            value={data.maxLoginAttempts || 5}
            onChange={(e) => onChange('maxLoginAttempts', parseInt(e.target.value) || 5)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Account Lockout Duration (Minutes)">
          <input
            type="number"
            min="1"
            value={data.accountLockoutMinutes || 15}
            onChange={(e) => onChange('accountLockoutMinutes', parseInt(e.target.value) || 15)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}
