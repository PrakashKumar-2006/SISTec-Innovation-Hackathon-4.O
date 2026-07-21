import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamsService } from '../../services/teams.service';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { ArrowLeft, User, Users, MapPin, Tag, FileText, CheckCircle, Clock, XCircle, Download, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/navigation/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

export default function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['team', id],
    queryFn: () => teamsService.getTeamById(id),
  });

  const team = response?.data;

  const statusMutation = useMutation({
    mutationFn: (newStatus) => teamsService.updateTeamStatus(id, newStatus),
    onSuccess: () => {
      toast({ title: 'Status updated successfully', variant: 'success' });
      queryClient.invalidateQueries(['team', id]);
    },
    onError: (error) => {
      toast({ 
        title: 'Failed to update status', 
        description: error.response?.data?.message || error.message,
        variant: 'destructive' 
      });
    }
  });

  if (isLoading) {
    return <div className="p-12 text-center text-brand-gold animate-pulse">Loading team details...</div>;
  }

  if (isError || !team) {
    return (
      <div className="p-8 text-center text-destructive">
        <h3 className="text-xl font-bold mb-2">Team Not Found</h3>
        <Button variant="outline" onClick={() => navigate('/admin/teams')}>Return to Teams</Button>
      </div>
    );
  }

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      registrationStatus: formData.get('registrationStatus'),
      verificationStatus: formData.get('verificationStatus'),
      adminRemarks: formData.get('adminRemarks'),
    };
    statusMutation.mutate(updates);
  };

  const isEditor = ['Super Admin', 'Admin', 'Moderator'].includes(user?.role);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/teams')} className="rounded-full hover:bg-brand-purple/20 text-brand-gray hover:text-brand-gold">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <PageHeader 
          title={team.teamName} 
          description={`Registration ID: ${team.registrationId || 'N/A'}`}
        />
        <div className="ml-auto flex gap-2">
          <StatusBadge status={team.registrationStatus} type="registration" />
          <StatusBadge status={team.verificationStatus} type="verification" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - General Info */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Team Leader
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-text">
                <div><span className="text-brand-gray block mb-1">Name</span><p className="font-medium">{team.leaderName}</p></div>
                <div><span className="text-brand-gray block mb-1">Email</span><p className="font-medium">{team.leaderEmail}</p></div>
                <div><span className="text-brand-gray block mb-1">Phone</span><p className="font-medium">{team.leaderPhone}</p></div>
                <div><span className="text-brand-gray block mb-1">Gender</span><p className="font-medium capitalize">{team.leaderGender}</p></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                College & Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-brand-text">
                <div className="space-y-4">
                  <div><span className="text-brand-gray block mb-1">Institute Name</span><p className="font-medium">{team.instituteName}</p></div>
                  <div><span className="text-brand-gray block mb-1">Theme</span><p className="font-medium"><Tag className="inline h-3 w-3 mr-1 text-brand-teal"/>{team.theme}</p></div>
                  <div><span className="text-brand-gray block mb-1">IEEE/CSI Member</span><p className="font-medium">{team.isIeeeCsiMember || 'No'}</p></div>
                </div>
                <div className="space-y-4">
                  <div><span className="text-brand-gray block mb-1">PS ID</span><p className="font-mono text-brand-gold">{team.psid}</p></div>
                  <div><span className="text-brand-gray block mb-1">PS Title</span><p className="font-medium text-brand-teal">{team.psTitle}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Team Members ({team.members?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {team.members?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.members.map((member, idx) => (
                    <div key={idx} className="bg-brand-dark p-3 rounded border border-brand-purple/10">
                      <p className="font-medium text-brand-text mb-1">{member.name} <span className="text-xs text-brand-gray capitalize">({member.gender})</span></p>
                      <p className="text-xs text-brand-gray mb-1">{member.email}</p>
                      <p className="text-xs text-brand-gray">{member.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-gray text-sm">No additional members listed.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status & Documents */}
        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-brand-dark p-4 rounded-lg border border-brand-purple/20 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-text">Idea Presentation (PPT/PDF)</span>
                </div>
                {team.ideaPpt ? (
                  <div className="flex gap-2">
                    <a href={team.ideaPpt} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-brand-gold/10 text-brand-gold px-3 py-2 rounded-md hover:bg-brand-gold hover:text-brand-dark transition-colors text-sm font-medium">
                      <ExternalLink className="h-4 w-4" /> View File
                    </a>
                  </div>
                ) : (
                  <span className="text-xs text-destructive">Not uploaded</span>
                )}
              </div>
              
              <div className="bg-brand-dark p-4 rounded-lg border border-brand-purple/20 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-text">Consent Letter (PDF)</span>
                </div>
                {team.consentLetter ? (
                  <div className="flex gap-2">
                    <a href={team.consentLetter} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-brand-teal/10 text-brand-teal px-3 py-2 rounded-md hover:bg-brand-teal hover:text-brand-dark transition-colors text-sm font-medium">
                      <ExternalLink className="h-4 w-4" /> View File
                    </a>
                  </div>
                ) : (
                  <span className="text-xs text-destructive">Not uploaded</span>
                )}
              </div>

              <div className="bg-brand-dark p-4 rounded-lg border border-brand-purple/20 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-text">Payment Screenshot</span>
                </div>
                {team.paymentScreenshot ? (
                  <div className="flex gap-2">
                    <a href={team.paymentScreenshot} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-2 rounded-md hover:bg-emerald-500 hover:text-brand-dark transition-colors text-sm font-medium">
                      <ExternalLink className="h-4 w-4" /> View Screenshot
                    </a>
                  </div>
                ) : (
                  <span className="text-xs text-brand-gray">Not uploaded</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-card border-brand-purple/20">
            <CardHeader className="border-b border-brand-purple/10 bg-brand-dark/50">
              <CardTitle className="text-brand-gold flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5" />
                Admin Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isEditor ? (
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-brand-gray">Verification Status</Label>
                    <Select name="verificationStatus" defaultValue={team.verificationStatus || 'pending'}>
                      <SelectTrigger className="bg-brand-dark border-brand-purple/30 text-brand-text">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-card text-brand-text">
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="verified">Verified (Approved docs)</SelectItem>
                        <SelectItem value="flagged">Flagged (Issue with docs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-brand-gray">Registration Status</Label>
                    <Select name="registrationStatus" defaultValue={team.registrationStatus || 'pending'}>
                      <SelectTrigger className="bg-brand-dark border-brand-purple/30 text-brand-text">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-card text-brand-text">
                        <SelectItem value="pending">Pending Final Approval</SelectItem>
                        <SelectItem value="approved">Approved & Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-brand-gray">Admin Remarks (Private)</Label>
                    <Input 
                      name="adminRemarks" 
                      defaultValue={team.adminRemarks || ''}
                      placeholder="e.g. PPT is missing problem ID..."
                      className="bg-brand-dark border-brand-purple/30 text-brand-text"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-gold text-brand-dark hover:bg-brand-teal" disabled={statusMutation.isLoading}>
                    {statusMutation.isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              ) : (
                <div className="text-sm text-brand-gray">
                  <p className="mb-2"><strong className="text-brand-text">Verification:</strong> {team.verificationStatus}</p>
                  <p className="mb-2"><strong className="text-brand-text">Registration:</strong> {team.registrationStatus}</p>
                  <p><strong className="text-brand-text">Remarks:</strong> {team.adminRemarks || 'None'}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-brand-card border-brand-purple/20">
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-brand-text font-semibold">Payment Status</h3>
                  <StatusBadge status={team.paymentStatus} type="payment" />
                </div>
                <div className="text-xs text-brand-gray space-y-2">
                  <p>Transaction ID: <span className="font-mono text-brand-gold">{team.transactionId || 'N/A'}</span></p>
                  <p>Amount: <span className="text-brand-text font-medium">₹{team.amountPaid || 0}</span></p>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
