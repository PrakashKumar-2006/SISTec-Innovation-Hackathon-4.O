import React from 'react';
import { FormFieldWrapper } from '../../../components/form/FormFieldWrapper';

export default function GeneralSettings({ data = {}, onChange }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-purple/20 pb-4 mb-4">
        <h2 className="text-lg font-bold text-brand-gold">General Configuration</h2>
        <p className="text-sm text-brand-gray">Basic information about your SIH Admin Portal instance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper label="Organization Name">
          <input
            type="text"
            value={data.orgName || ''}
            onChange={(e) => onChange('orgName', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Portal Name">
          <input
            type="text"
            value={data.portalName || ''}
            onChange={(e) => onChange('portalName', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Logo URL (Cloudinary Asset)">
          <input
            type="url"
            value={data.logoUrl || ''}
            onChange={(e) => onChange('logoUrl', e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Favicon URL">
          <input
            type="url"
            value={data.faviconUrl || ''}
            onChange={(e) => onChange('faviconUrl', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Support Email">
          <input
            type="email"
            value={data.supportEmail || ''}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Contact Phone">
          <input
            type="text"
            value={data.contactPhone || ''}
            onChange={(e) => onChange('contactPhone', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Footer Text" className="md:col-span-2">
          <input
            type="text"
            value={data.footerText || ''}
            onChange={(e) => onChange('footerText', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}
