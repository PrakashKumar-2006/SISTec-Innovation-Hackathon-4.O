import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { problemsService } from '../../services/problems.service';
import { ArrowLeft, Building2, Tag, Cpu, MapPin, AlignLeft, Code, Clock } from 'lucide-react';
import { PageHeader } from '../../components/navigation/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import StatusBadge from '../../components/common/StatusBadge';
import { format } from 'date-fns';

export default function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['problem', id],
    queryFn: () => problemsService.getProblemById(id),
  });

  const problem = response?.data?.data;

  if (isLoading) {
    return <div className="p-12 text-center text-brand-gold animate-pulse">Loading problem statement details...</div>;
  }

  if (isError || !problem) {
    return (
      <div className="p-8 text-center text-destructive">
        <h3 className="text-xl font-bold mb-2">Problem Statement Not Found</h3>
        <p className="mb-4">{error?.message}</p>
        <Button variant="outline" onClick={() => navigate('/admin/problems')}>Return to List</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/problems')} className="rounded-full hover:bg-brand-dark text-brand-gray hover:text-brand-gold">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <PageHeader 
          title={`[${problem.psNumber}] ${problem.title}`}
          description={`Category: ${problem.category}`}
        />
        <div className="ml-auto">
          <StatusBadge 
            status={problem.status === 'Active' ? 'verified' : 'rejected'} 
            type="verification" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <AlignLeft className="h-5 w-5" />
                Detailed Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-brand-text whitespace-pre-wrap leading-relaxed text-sm">
                {problem.detailedDescription}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10 bg-brand-dark/50">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <Tag className="h-5 w-5" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm text-brand-text">
              <div>
                <span className="text-brand-gray block mb-1 flex items-center gap-1"><Building2 className="h-3 w-3" /> Organization</span>
                <p className="font-medium">{problem.org}</p>
              </div>
              <div>
                <span className="text-brand-gray block mb-1 flex items-center gap-1"><Cpu className="h-3 w-3" /> Domain Bucket</span>
                <p className="font-medium text-brand-teal">{problem.domain}</p>
              </div>
              <div>
                <span className="text-brand-gray block mb-1 flex items-center gap-1"><Code className="h-3 w-3" /> Tech Stack</span>
                <p className="font-mono text-xs text-brand-gold bg-brand-dark p-2 rounded mt-1 border border-brand-purple/10">
                  {problem.techStack || 'Not specified'}
                </p>
              </div>
              <div className="border-t border-brand-purple/10 pt-4 mt-4">
                <span className="text-brand-gray block mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Created</span>
                <p className="text-xs">{problem.createdAt ? format(new Date(problem.createdAt), 'PPpp') : 'N/A'}</p>
              </div>
              <div>
                <span className="text-brand-gray block mb-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Last Updated</span>
                <p className="text-xs">{problem.updatedAt ? format(new Date(problem.updatedAt), 'PPpp') : 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
