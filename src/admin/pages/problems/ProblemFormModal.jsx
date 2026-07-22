import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Validation Schema
const problemSchema = z.object({
  psNumber: z.string().min(2, "PS Number must be at least 2 characters").max(20, "Too long"),
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title is too long"),
  org: z.string().min(2, "Organization is required").max(100, "Organization is too long"),
  category: z.enum(['Software', 'Hardware', 'Hardware/Software', 'Other']),
  domain: z.string().min(2, "Domain is required"),
  detailedDescription: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.string().optional(),
  status: z.enum(['Active', 'Inactive']).default('Active'),
});

export default function ProblemFormModal({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      psNumber: '',
      title: '',
      org: '',
      category: 'Software',
      domain: '',
      detailedDescription: '',
      techStack: '',
      status: 'Active',
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          psNumber: initialData.psNumber || '',
          title: initialData.title || '',
          org: initialData.org || '',
          category: initialData.category || 'Software',
          domain: initialData.domain || '',
          detailedDescription: initialData.detailedDescription || '',
          techStack: initialData.techStack || '',
          status: initialData.status || 'Active',
        });
      } else {
        reset({
          psNumber: '',
          title: '',
          org: '',
          category: 'Software',
          domain: '',
          detailedDescription: '',
          techStack: '',
          status: 'Active',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <style>{`
        body .modal-center-override,
        body .modal-center-override:hover {
          transform: translate(-50%, -50%) !important;
          top: 50% !important;
          left: 50% !important;
        }
      `}</style>
      <DialogContent className="bg-brand-card modal-center-override border-brand-purple/20 text-brand-text max-w-2xl max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-brand-gold">{isEditing ? 'Edit Problem Statement' : 'New Problem Statement'}</DialogTitle>
          <DialogDescription className="text-brand-gray">
            {isEditing ? 'Update the details of the problem statement below.' : 'Fill in the details to create a new problem statement.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>PS Number (ID) <span className="text-destructive">*</span></Label>
              <Input 
                {...register('psNumber')} 
                placeholder="e.g. AG-01" 
                className={`bg-brand-dark border-brand-purple/30 text-brand-text ${errors.psNumber ? 'border-destructive' : ''}`}
                disabled={isEditing} 
              />
              {errors.psNumber && <p className="text-destructive text-xs">{errors.psNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Category <span className="text-destructive">*</span></Label>
              <Select 
                defaultValue={initialData?.category || 'Software'} 
                onValueChange={(val) => setValue('category', val)}
              >
                <SelectTrigger className={`bg-brand-dark border-brand-purple/30 text-brand-text ${errors.category ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-brand-card text-brand-text border-brand-purple/20">
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Hardware/Software">Hardware/Software</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-destructive text-xs">{errors.category.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Problem Statement / Title <span className="text-destructive">*</span></Label>
              <Input 
                {...register('title')} 
                placeholder="Problem statement title..." 
                className={`bg-brand-dark border-brand-purple/30 text-brand-text ${errors.title ? 'border-destructive' : ''}`}
              />
              {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Organization <span className="text-destructive">*</span></Label>
              <Input 
                {...register('org')} 
                placeholder="e.g. Ministry of Education" 
                className={`bg-brand-dark border-brand-purple/30 text-brand-text ${errors.org ? 'border-destructive' : ''}`}
              />
              {errors.org && <p className="text-destructive text-xs">{errors.org.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Domain Bucket <span className="text-destructive">*</span></Label>
              <Input 
                {...register('domain')} 
                placeholder="e.g. Smart Automation" 
                className={`bg-brand-dark border-brand-purple/30 text-brand-text ${errors.domain ? 'border-destructive' : ''}`}
              />
              {errors.domain && <p className="text-destructive text-xs">{errors.domain.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Detailed Description <span className="text-destructive">*</span></Label>
              <textarea 
                {...register('detailedDescription')} 
                placeholder="Provide a full description of the problem..."
                className={`flex w-full rounded-md border border-brand-purple/30 bg-brand-dark px-3 py-2 text-sm text-brand-text placeholder:text-brand-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] ${errors.detailedDescription ? 'border-destructive' : ''}`}
              />
              {errors.detailedDescription && <p className="text-destructive text-xs">{errors.detailedDescription.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Tech Stack (Optional)</Label>
              <Input 
                {...register('techStack')} 
                placeholder="e.g. React, Node.js, Python" 
                className="bg-brand-dark border-brand-purple/30 text-brand-text"
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                defaultValue={initialData?.status || 'Active'} 
                onValueChange={(val) => setValue('status', val)}
              >
                <SelectTrigger className="bg-brand-dark border-brand-purple/30 text-brand-text">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-brand-card text-brand-text border-brand-purple/20">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-brand-purple/30 text-brand-text hover:bg-brand-dark">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-brand-gold text-brand-dark hover:bg-brand-teal">
              {isLoading ? 'Saving...' : 'Save Problem Statement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
