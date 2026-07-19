import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resultsService } from '../../services/results.service';
import { teamsService } from '../../services/teams.service';
import { useToast } from '../../hooks/use-toast';
import { FormFieldWrapper } from '../../components/form/FormFieldWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const resultSchema = z.object({
  registrationId: z.string().min(1, "Team selection is required"),
  teamName: z.string(),
  problemStatement: z.string(), // ID
  rank: z.enum(['1st', '2nd', '3rd', 'Runner-up', 'Consolation', 'Participation']),
  prizeTitle: z.string().min(2, "Prize Title is required"),
  prizeAmount: z.string().optional(),
  remarks: z.string().optional(),
  status: z.enum(['Draft', 'Published']),
});

export function ResultFormModal({ isOpen, onClose, result, isEditMode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedRegistration, setSelectedRegistration] = useState(null);
  
  // Fetch available teams (only approved registrations) to populate the dropdown
  // Wait, in a real app this might be a searchable combobox. We'll fetch all approved teams for simplicity.
  const { data: teamsResponse, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['admin-teams-approved'],
    queryFn: () => teamsService.getTeams({ limit: 1000, registrationStatus: 'approved' }),
    enabled: isOpen && !isEditMode, // Only needed when creating
  });
  
  const teams = teamsResponse?.data?.data || [];

  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      registrationId: '',
      teamName: '',
      problemStatement: '',
      rank: '1st',
      prizeTitle: '',
      prizeAmount: '',
      remarks: '',
      status: 'Draft'
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && result) {
        reset({
          registrationId: result.registrationId,
          teamName: result.teamName,
          problemStatement: result.problemStatement?._id || result.problemStatement,
          rank: result.rank,
          prizeTitle: result.prizeTitle,
          prizeAmount: result.prizeAmount || '',
          remarks: result.remarks || '',
          status: result.status
        });
      } else {
        reset({
          registrationId: '',
          teamName: '',
          problemStatement: '',
          rank: '1st',
          prizeTitle: '',
          prizeAmount: '',
          remarks: '',
          status: 'Draft'
        });
      }
    }
  }, [isOpen, isEditMode, result, reset]);

  // When a registration is selected, auto-fill teamName and problemStatement
  const handleTeamSelection = (regId) => {
    const team = teams.find(t => t._id === regId);
    if (team) {
      setSelectedRegistration(team);
      setValue('registrationId', team._id, { shouldValidate: true });
      setValue('teamName', team.teamName, { shouldValidate: true });
      // Problem statement is nested or ID depending on how getTeams populates it
      // In getTeams, problemStatement is populated with _id and psNumber.
      setValue('problemStatement', team.problemStatement?._id || team.problemStatement, { shouldValidate: true });
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => isEditMode ? resultsService.updateResult(result._id, data) : resultsService.createResult(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-results']);
      queryClient.invalidateQueries(['admin-results-stats']);
      toast({ title: 'Success', description: `Result ${isEditMode ? 'updated' : 'created'} successfully` });
      onClose();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to save result', variant: 'destructive' });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#131316] border-brand-purple/20 text-brand-text max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-gold">
            {isEditMode ? 'Edit Result' : 'Add New Result'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          
          {!isEditMode && (
            <FormFieldWrapper label="Select Team" error={errors.registrationId?.message} required>
              <Controller
                name="registrationId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      handleTeamSelection(val);
                    }}
                    value={field.value}
                    disabled={isLoadingTeams}
                  >
                    <SelectTrigger className="w-full bg-brand-dark border-brand-purple/30 text-brand-text focus:border-brand-gold">
                      <SelectValue placeholder={isLoadingTeams ? "Loading teams..." : "Select an approved team"} />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text max-h-[200px]">
                      {teams.map(team => (
                        <SelectItem key={team._id} value={team._id}>
                          {team.teamName} ({team.registrationId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormFieldWrapper>
          )}

          {isEditMode && (
            <FormFieldWrapper label="Team Name">
              <input
                type="text"
                disabled
                value={result?.teamName || ''}
                className="w-full px-4 py-2 bg-brand-dark/50 border border-brand-purple/30 rounded-md text-brand-gray cursor-not-allowed"
              />
            </FormFieldWrapper>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldWrapper label="Rank" error={errors.rank?.message} required>
              <Controller
                name="rank"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-brand-dark border-brand-purple/30 text-brand-text focus:border-brand-gold">
                      <SelectValue placeholder="Select Rank" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
                      <SelectItem value="1st">1st Place</SelectItem>
                      <SelectItem value="2nd">2nd Place</SelectItem>
                      <SelectItem value="3rd">3rd Place</SelectItem>
                      <SelectItem value="Runner-up">Runner-up</SelectItem>
                      <SelectItem value="Consolation">Consolation</SelectItem>
                      <SelectItem value="Participation">Participation</SelectItem>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-brand-dark border-brand-purple/30 text-brand-text focus:border-brand-gold">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-card border-brand-purple/20 text-brand-text">
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormFieldWrapper>
          </div>

          <FormFieldWrapper label="Prize Title" error={errors.prizeTitle?.message} required>
            <input
              {...register('prizeTitle')}
              type="text"
              placeholder="e.g. Grand Prize Winner, Best UI/UX"
              className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Prize Amount (Optional)" error={errors.prizeAmount?.message}>
            <input
              {...register('prizeAmount')}
              type="text"
              placeholder="e.g. ₹1,00,000"
              className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold transition-colors"
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Remarks / Jury Comments (Optional)" error={errors.remarks?.message}>
            <textarea
              {...register('remarks')}
              rows={3}
              placeholder="Any specific comments from the jury..."
              className="w-full px-4 py-3 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold resize-y custom-scrollbar"
            />
          </FormFieldWrapper>

          <div className="flex justify-end gap-3 pt-6 border-t border-brand-purple/20 mt-6">
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
              className="px-6 py-2 bg-brand-gold text-[#131316] font-bold rounded-md hover:bg-[#c2984a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {mutation.isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#131316]"></span>
              ) : (
                <>{isEditMode ? 'Save Changes' : 'Create Result'}</>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
