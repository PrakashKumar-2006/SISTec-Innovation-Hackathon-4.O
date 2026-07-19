import React, { useRef, useState } from 'react';
import { FormFieldWrapper } from '../../../components/form/FormFieldWrapper';
import { adminSettingsService } from '../../../services/adminSettings.service';
import { useToast } from '../../../hooks/use-toast';
import { Download, Upload } from 'lucide-react';

export default function MaintenanceSettings({ data = {}, onChange, onImportSuccess }) {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    try {
      const response = await adminSettingsService.exportSettings();
      const settingsData = response.data.data;
      
      const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sih-admin-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({ title: 'Export Successful', description: 'Settings downloaded as JSON.' });
    } catch (error) {
      toast({ title: 'Export Failed', description: 'Could not export settings.', variant: 'destructive' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setIsImporting(true);
        
        await adminSettingsService.importSettings(importedData);
        toast({ title: 'Import Successful', description: 'Settings have been updated.' });
        if (onImportSuccess) onImportSuccess();
      } catch (err) {
        toast({ title: 'Import Failed', description: 'Invalid JSON file or server error.', variant: 'destructive' });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="border-b border-destructive/20 pb-4 mb-4">
          <h2 className="text-lg font-bold text-destructive">Maintenance Mode</h2>
          <p className="text-sm text-brand-gray">Temporarily restrict access to the Admin Portal. Only Super Admins will be able to log in.</p>
        </div>

        <div className="bg-brand-dark/50 border border-brand-purple/20 p-6 rounded-md">
          <label className="flex items-center space-x-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={data.isMaintenanceMode || false}
              onChange={(e) => onChange('isMaintenanceMode', e.target.checked)}
              className="w-5 h-5 accent-destructive bg-brand-dark border-brand-purple/30 rounded focus:ring-destructive"
            />
            <span className="text-brand-text font-medium">Enable Maintenance Mode</span>
          </label>

          <FormFieldWrapper label="Maintenance Message">
            <textarea
              rows={3}
              value={data.maintenanceMessage || ''}
              onChange={(e) => onChange('maintenanceMessage', e.target.value)}
              placeholder="The system is currently undergoing scheduled maintenance..."
              className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors resize-none"
              disabled={!data.isMaintenanceMode}
            />
          </FormFieldWrapper>
        </div>
      </div>

      <div>
        <div className="border-b border-brand-purple/20 pb-4 mb-4 mt-8">
          <h2 className="text-lg font-bold text-brand-gold">Backup & Export</h2>
          <p className="text-sm text-brand-gray">Download a copy of your configuration or restore from a previous backup.</p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-brand-dark border border-brand-purple hover:bg-brand-purple/20 text-brand-purple transition-colors rounded-md"
          >
            <Download className="w-4 h-4" />
            Export Settings
          </button>

          <input 
            type="file" 
            accept=".json" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex items-center gap-2 px-4 py-2 bg-brand-dark border border-brand-gold hover:bg-brand-gold/20 text-brand-gold transition-colors rounded-md disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {isImporting ? 'Importing...' : 'Import Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
