import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../../components/navigation/PageHeader';
import { adminSettingsService } from '../../services/adminSettings.service';
import { useToast } from '../../hooks/use-toast';
import { Settings as SettingsIcon, Shield, Mail, AppWindow, Wrench, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

// Import Tabs
import GeneralSettings from './tabs/GeneralSettings';
import EmailSettings from './tabs/EmailSettings';
import SecuritySettings from './tabs/SecuritySettings';
import ApplicationSettings from './tabs/ApplicationSettings';
import MaintenanceSettings from './tabs/MaintenanceSettings';

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({});

  // Fetch Settings
  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => adminSettingsService.getSettings(),
    onSuccess: (res) => {
      if (res.data?.data && Object.keys(formData).length === 0) {
        setFormData(res.data.data);
      }
    }
  });

  const settings = response?.data?.data || {};

  // Initialize form data if it's empty but settings have loaded
  React.useEffect(() => {
    if (settings && Object.keys(formData).length === 0 && !isLoading) {
      setFormData(settings);
    }
  }, [settings, formData, isLoading]);

  // Update Settings Mutation
  const mutation = useMutation({
    mutationFn: (newSettings) => adminSettingsService.updateSettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-settings']);
      toast({ title: 'Success', description: 'Settings updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Failed to update settings', 
        variant: 'destructive' 
      });
    }
  });

  const handleSave = () => {
    mutation.mutate(formData);
  };

  const handleUpdateField = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  if (isLoading || Object.keys(formData).length === 0) {
    return <div className="p-8 text-brand-gray animate-pulse">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="System Settings"
        description="Configure application-wide settings and system behaviors."
        action={
          <button
            onClick={handleSave}
            disabled={mutation.isLoading}
            className="px-6 py-2 bg-brand-gold text-[#131316] font-bold rounded-md hover:bg-[#c2984a] transition-colors flex items-center gap-2"
          >
            {mutation.isLoading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#131316]"></span>
            ) : (
              <><Save className="h-4 w-4" /> Save Changes</>
            )}
          </button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-brand-card border border-brand-purple/20 p-1 mb-6 flex flex-wrap h-auto">
          <TabsTrigger value="general" className="flex-1 min-w-[120px] data-[state=active]:bg-brand-purple/20 data-[state=active]:text-brand-purple">
            <SettingsIcon className="w-4 h-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="email" className="flex-1 min-w-[120px] data-[state=active]:bg-brand-teal/20 data-[state=active]:text-brand-teal">
            <Mail className="w-4 h-4 mr-2" /> Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 min-w-[120px] data-[state=active]:bg-brand-gold/20 data-[state=active]:text-brand-gold">
            <Shield className="w-4 h-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="application" className="flex-1 min-w-[120px] data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            <AppWindow className="w-4 h-4 mr-2" /> Application
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex-1 min-w-[120px] data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive">
            <Wrench className="w-4 h-4 mr-2" /> Maintenance
          </TabsTrigger>
        </TabsList>

        <div className="bg-brand-card border border-brand-purple/20 rounded-xl p-6 shadow-card-shadow">
          <TabsContent value="general" className="mt-0 outline-none">
            <GeneralSettings data={formData.general} onChange={(f, v) => handleUpdateField('general', f, v)} />
          </TabsContent>
          
          <TabsContent value="email" className="mt-0 outline-none">
            <EmailSettings data={formData.email} onChange={(f, v) => handleUpdateField('email', f, v)} />
          </TabsContent>
          
          <TabsContent value="security" className="mt-0 outline-none">
            <SecuritySettings data={formData.security} onChange={(f, v) => handleUpdateField('security', f, v)} />
          </TabsContent>

          <TabsContent value="application" className="mt-0 outline-none">
            <ApplicationSettings data={formData.application} onChange={(f, v) => handleUpdateField('application', f, v)} />
          </TabsContent>

          <TabsContent value="maintenance" className="mt-0 outline-none">
            <MaintenanceSettings 
              data={formData.maintenance} 
              onChange={(f, v) => handleUpdateField('maintenance', f, v)} 
              onImportSuccess={() => queryClient.invalidateQueries(['admin-settings'])}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
