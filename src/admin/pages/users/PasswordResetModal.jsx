import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUsersService } from '../../services/adminUsers.service';
import { useToast } from '../../hooks/use-toast';
import { FormFieldWrapper } from '../../components/form/FormFieldWrapper';
import { AlertTriangle } from 'lucide-react';

const passwordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});

export function PasswordResetModal({ isOpen, onClose, user }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' }
  });

  const mutation = useMutation({
    mutationFn: (data) => adminUsersService.resetAdminPassword(user._id, data.newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
      toast({ title: 'Password Reset', description: `Password for ${user.email} was reset successfully.` });
      reset();
      onClose();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to reset password', variant: 'destructive' });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!isOpen || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#131316] border-brand-purple/20 text-brand-text">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-gold flex items-center gap-2">
            <AlertTriangle className="text-destructive h-5 w-5" /> Reset Password
          </DialogTitle>
        </DialogHeader>
        
        <div className="my-4">
          <p className="text-sm text-brand-gray">
            You are about to force a password reset for <strong>{user.email}</strong>. The user will be logged out of their current session immediately if their token expires or is refreshed.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormFieldWrapper label="New Password" error={errors.newPassword?.message} required>
            <input
              {...register('newPassword')}
              type="text"
              placeholder="Enter new strong password"
              className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
            />
          </FormFieldWrapper>

          <div className="flex justify-end gap-3 pt-4 border-t border-brand-purple/20">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isLoading}
              className="px-4 py-2 text-brand-gray hover:text-brand-text font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-6 py-2 bg-destructive text-white font-bold rounded-md hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {mutation.isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              ) : (
                'Force Reset'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
