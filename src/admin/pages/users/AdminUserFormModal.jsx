import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUsersService } from '../../services/adminUsers.service';
import { useToast } from '../../hooks/use-toast';
import { FormFieldWrapper } from '../../components/form/FormFieldWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(['Super Admin', 'Admin', 'Moderator', 'Reviewer', 'Viewer']),
  status: z.enum(['Active', 'Inactive', 'Suspended']),
  sendEmail: z.boolean().optional()
});

export function AdminUserFormModal({ isOpen, onClose, user, isEditMode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tempPassword, setTempPassword] = useState(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'Viewer',
      status: 'Active',
      sendEmail: true
    }
  });

  useEffect(() => {
    if (isOpen) {
      setTempPassword(null);
      if (isEditMode && user) {
        reset({
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'Viewer',
          status: user.status || 'Active',
          sendEmail: false
        });
      } else {
        reset({
          name: '',
          email: '',
          role: 'Viewer',
          status: 'Active',
          sendEmail: true
        });
      }
    }
  }, [isOpen, isEditMode, user, reset]);

  const mutation = useMutation({
    mutationFn: (data) => isEditMode ? adminUsersService.updateAdmin(user._id, data) : adminUsersService.createAdmin(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['admin-users']);
      queryClient.invalidateQueries(['admin-users-stats']);
      
      if (!isEditMode && response.data.tempPassword) {
        setTempPassword(response.data.tempPassword);
        toast({ title: 'Success', description: 'Admin created successfully.' });
      } else {
        toast({ title: 'Success', description: `Admin ${isEditMode ? 'updated' : 'created'} successfully` });
        onClose();
      }
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to save admin', variant: 'destructive' });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <style>{`
        body .modal-center-override,
        body .modal-center-override:hover {
          transform: translate(-50%, -50%) !important;
          top: 50% !important;
          left: 50% !important;
        }
      `}</style>
      <DialogContent className="sm:max-w-[500px] bg-brand-card modal-center-override border-brand-purple/20 text-brand-text max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-text">
            {isEditMode ? 'Edit Administrator' : 'Create Administrator'}
          </DialogTitle>
        </DialogHeader>

        {tempPassword ? (
          <div className="py-6 space-y-4">
            <div className="bg-brand-teal/10 border border-brand-teal/30 p-4 rounded-md">
              <h3 className="text-brand-teal font-semibold mb-2">Account Created!</h3>
              <p className="text-sm text-brand-text mb-4">Please copy the temporary password and send it securely to the user.</p>
              <div className="bg-brand-dark/50 p-3 rounded-md font-mono text-center text-lg tracking-wider border border-brand-purple/20 text-brand-text">
                {tempPassword}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-brand-gold text-brand-card font-bold rounded-md hover:bg-brand-teal transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormFieldWrapper label="Full Name" error={errors.name?.message} required>
              <input
                {...register('name')}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
              />
            </FormFieldWrapper>

            <FormFieldWrapper label="Email Address" error={errors.email?.message} required>
              <input
                {...register('email')}
                type="email"
                disabled={isEditMode && user?.email === 'admin@sih.gov.in'} // Protect primary admin
                placeholder="admin@example.com"
                className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
              />
            </FormFieldWrapper>

            <div className="grid grid-cols-2 gap-4">
              <FormFieldWrapper label="Role" error={errors.role?.message} required>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={isEditMode && user?.email === 'admin@sih.gov.in'}>
                      <SelectTrigger className="w-full bg-brand-dark border-brand-purple/30 text-brand-text focus:border-brand-gold">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
                        <SelectItem value="Viewer">Viewer</SelectItem>
                        <SelectItem value="Reviewer">Reviewer</SelectItem>
                        <SelectItem value="Moderator">Moderator</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldWrapper>

              <FormFieldWrapper label="Status" error={errors.status?.message} required>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={isEditMode && user?.email === 'admin@sih.gov.in'}>
                      <SelectTrigger className="w-full bg-brand-dark border-brand-purple/30 text-brand-text focus:border-brand-gold">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldWrapper>
            </div>

            {!isEditMode && (
              <div className="flex items-center gap-2">
                <input
                  {...register('sendEmail')}
                  type="checkbox"
                  id="sendEmail"
                  className="rounded border-gray-300 bg-white text-brand-gold focus:ring-brand-gold"
                />
                <label htmlFor="sendEmail" className="text-sm text-brand-gray cursor-pointer">
                  Send welcome email with credentials
                </label>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-brand-gray hover:text-brand-text transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="px-6 py-2 bg-brand-gold hover:bg-brand-teal text-white rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {mutation.isLoading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Admin'}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
