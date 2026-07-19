import React from 'react';
import { FormFieldWrapper } from '../../../components/form/FormFieldWrapper';

export default function EmailSettings({ data = {}, onChange }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-purple/20 pb-4 mb-4">
        <h2 className="text-lg font-bold text-brand-gold">Email Configuration</h2>
        <p className="text-sm text-brand-gray">Settings for automated emails sent by the system.</p>
      </div>

      <div className="bg-brand-teal/10 border border-brand-teal/20 p-4 rounded-md mb-6">
        <h3 className="text-sm font-semibold text-brand-teal mb-1">Nodemailer Status</h3>
        <p className="text-xs text-brand-gray">SMTP connection is configured in the environment variables (.env). To change the actual SMTP provider, server restart is required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper label="Sender Name">
          <input
            type="text"
            value={data.senderName || ''}
            onChange={(e) => onChange('senderName', e.target.value)}
            placeholder="SIH Admin"
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Reply-To Address">
          <input
            type="email"
            value={data.replyToAddress || ''}
            onChange={(e) => onChange('replyToAddress', e.target.value)}
            placeholder="no-reply@sih.gov.in"
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Email Signature" className="md:col-span-2">
          <textarea
            rows={4}
            value={data.emailSignature || ''}
            onChange={(e) => onChange('emailSignature', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors resize-none"
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}
