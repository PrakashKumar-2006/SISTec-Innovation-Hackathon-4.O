import React from 'react';
import { FormFieldWrapper } from '../../../components/form/FormFieldWrapper';

export default function ApplicationSettings({ data = {}, onChange }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-brand-purple/20 pb-4 mb-4">
        <h2 className="text-lg font-bold text-brand-gold">Application Configuration</h2>
        <p className="text-sm text-brand-gray">Customize formatting, pagination, and UI behaviors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper label="Default Pagination Size">
          <select
            value={data.defaultPaginationSize || 10}
            onChange={(e) => onChange('defaultPaginationSize', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          >
            <option value={10}>10 Items</option>
            <option value={20}>20 Items</option>
            <option value={50}>50 Items</option>
            <option value={100}>100 Items</option>
          </select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Dashboard Refresh Interval (Seconds)">
          <input
            type="number"
            min="10"
            value={data.dashboardRefreshIntervalSeconds || 60}
            onChange={(e) => onChange('dashboardRefreshIntervalSeconds', parseInt(e.target.value) || 60)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Default Time Zone">
          <select
            value={data.defaultTimeZone || 'Asia/Kolkata'}
            onChange={(e) => onChange('defaultTimeZone', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Date Format">
          <select
            value={data.dateFormat || 'MMM dd, yyyy'}
            onChange={(e) => onChange('dateFormat', e.target.value)}
            className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
          >
            <option value="MMM dd, yyyy">Jan 01, 2026</option>
            <option value="dd/MM/yyyy">01/12/2026</option>
            <option value="MM/dd/yyyy">12/01/2026</option>
            <option value="yyyy-MM-dd">2026-01-01</option>
          </select>
        </FormFieldWrapper>
      </div>
    </div>
  );
}
