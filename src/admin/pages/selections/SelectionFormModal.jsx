import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Loader } from 'lucide-react';
import { selectionsService } from '../../services/selections.service';

const SelectionFormModal = ({ isOpen, onClose, selectionData, onSuccess }) => {
  const isEditing = !!selectionData;
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      registrationId: '',
      teamName: '',
      leaderName: '',
      leaderEmail: '',
      instituteName: '',
      psNumber: '',
      psTitle: '',
      theme: '',
      evaluationRound: 'PPT Evaluation',
      selectionStatus: 'Draft',
      evaluationRemarks: '',
      internalNotes: ''
    }
  });

  useEffect(() => {
    if (selectionData) {
      Object.keys(selectionData).forEach(key => {
        setValue(key, selectionData[key]);
      });
    } else {
      reset();
    }
  }, [selectionData, setValue, reset]);

  const mutation = useMutation({
    mutationFn: (data) => 
      isEditing 
        ? selectionsService.updateSelection(selectionData._id, data)
        : selectionsService.createSelection(data),
    onSuccess: () => {
      onSuccess?.();
      onClose();
      reset();
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit Selection Record' : 'Add Manual Selection'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <form id="selection-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Registration ID *</label>
                <input
                  {...register('registrationId', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.registrationId && <span className="text-red-500 text-xs">{errors.registrationId.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Team Name *</label>
                <input
                  {...register('teamName', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.teamName && <span className="text-red-500 text-xs">{errors.teamName.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Leader Name *</label>
                <input
                  {...register('leaderName', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.leaderName && <span className="text-red-500 text-xs">{errors.leaderName.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Leader Email *</label>
                <input
                  type="email"
                  {...register('leaderEmail', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.leaderEmail && <span className="text-red-500 text-xs">{errors.leaderEmail.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Institute *</label>
                <input
                  {...register('instituteName', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.instituteName && <span className="text-red-500 text-xs">{errors.instituteName.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Theme *</label>
                <input
                  {...register('theme', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.theme && <span className="text-red-500 text-xs">{errors.theme.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">PS Number *</label>
                <input
                  {...register('psNumber', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.psNumber && <span className="text-red-500 text-xs">{errors.psNumber.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">PS Title *</label>
                <input
                  {...register('psTitle', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                />
                {errors.psTitle && <span className="text-red-500 text-xs">{errors.psTitle.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Evaluation Round *</label>
                <select
                  {...register('evaluationRound', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                >
                  <option value="PPT Evaluation">PPT Evaluation</option>
                  <option value="Offline Round">Offline Round</option>
                  <option value="Grand Finale">Grand Finale</option>
                </select>
                {errors.evaluationRound && <span className="text-red-500 text-xs">{errors.evaluationRound.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Selection Status *</label>
                <select
                  {...register('selectionStatus', { required: 'Required' })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
                >
                  <option value="Draft">Draft</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Not Shortlisted">Not Shortlisted</option>
                </select>
                {errors.selectionStatus && <span className="text-red-500 text-xs">{errors.selectionStatus.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Evaluation Remarks</label>
              <textarea
                {...register('evaluationRemarks')}
                rows="2"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Internal Notes (Admin Only)</label>
              <textarea
                {...register('internalNotes')}
                rows="2"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500/20"
              />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="selection-form"
            disabled={mutation.isLoading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {mutation.isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : isEditing ? 'Save Changes' : 'Add Selection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionFormModal;
