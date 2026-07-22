import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import StatusBadge from '../../components/common/StatusBadge';
import { contactsService } from '../../services/contacts.service';
import { useToast } from '../../hooks/use-toast';
import { Mail, Clock, Send, ShieldAlert, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export function ContactDetailsModal({ isOpen, onClose, contactId, initialReplyMode = false }) {
  const [isReplyMode, setIsReplyMode] = useState(initialReplyMode);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      setIsReplyMode(initialReplyMode);
      setReplySubject('');
      setReplyMessage('');
    }
  }, [isOpen, initialReplyMode]);

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-contact', contactId],
    queryFn: () => contactsService.getContactById(contactId),
    enabled: !!contactId && isOpen,
  });

  const contact = response?.data?.data;

  // Sync default reply subject once contact is loaded
  useEffect(() => {
    if (contact && !replySubject) {
      setReplySubject(`Re: ${contact.subject}`);
    }
  }, [contact]);

  const statusMutation = useMutation({
    mutationFn: (newStatus) => contactsService.updateStatus(contactId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-contact', contactId]);
      queryClient.invalidateQueries(['admin-contacts']);
      toast({ title: 'Success', description: 'Contact status updated' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to update status', variant: 'destructive' });
    }
  });

  const replyMutation = useMutation({
    mutationFn: (data) => contactsService.replyToContact(contactId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-contact', contactId]);
      queryClient.invalidateQueries(['admin-contacts']);
      toast({ title: 'Success', description: 'Reply sent successfully!' });
      setIsReplyMode(false);
      setReplySubject('');
      setReplyMessage('');
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.response?.data?.message || 'Failed to send reply', variant: 'destructive' });
    }
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyMessage.trim()) return;
    replyMutation.mutate({ subject: replySubject, message: replyMessage });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-brand-darker border-brand-purple/20 text-brand-text">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-text">
            {isReplyMode ? 'Reply to Contact' : 'Contact Details'}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          </div>
        ) : !contact ? (
          <div className="p-6 text-center text-destructive">
            <ShieldAlert className="h-10 w-10 mx-auto mb-2" />
            <p>Failed to load contact details.</p>
          </div>
        ) : (
        <div className="flex flex-col h-full max-h-[70vh]">
          {/* Header Info */}
          <div className="bg-brand-dark rounded-xl p-5 border border-brand-purple/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-brand-text flex items-center gap-2">
                {contact.name}
              </h3>
              <p className="text-brand-gray text-sm mt-1">{contact.email} {contact.phone ? `• ${contact.phone}` : ''}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-brand-gray/80">
                <Clock className="h-3 w-3" />
                Submitted on {format(new Date(contact.createdAt), 'MMM d, yyyy h:mm a')}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={contact.status}
                onChange={(e) => statusMutation.mutate(e.target.value)}
                disabled={statusMutation.isLoading}
                className="px-3 py-1.5 bg-brand-card border border-brand-purple/30 rounded-md text-sm text-brand-text focus:border-brand-gold focus:outline-none disabled:opacity-50"
              >
                <option value="Unread">Unread</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <StatusBadge status={contact.status} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {!isReplyMode ? (
              <div className="space-y-6">
                {/* Original Message */}
                <div className="bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow">
                  <h4 className="text-sm font-semibold text-brand-gold mb-4 uppercase tracking-wider">Subject: {contact.subject}</h4>
                  
                  <div className="mb-4 space-y-2">
                    <div className="flex text-sm border-b border-brand-purple/10 pb-2">
                      <span className="text-brand-gray w-1/3">Category:</span>
                      <span className="text-brand-text font-medium w-2/3">{contact.category || 'General Inquiry'}</span>
                    </div>
                    {contact.registrationCode && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Registration Code:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.registrationCode}</span>
                      </div>
                    )}
                    {contact.teamName && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Team Name:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.teamName}</span>
                      </div>
                    )}
                    {contact.transactionId && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Transaction ID:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.transactionId}</span>
                      </div>
                    )}
                    {contact.paymentReference && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Payment Ref:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.paymentReference}</span>
                      </div>
                    )}
                    {contact.issueType && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Issue Type:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.issueType}</span>
                      </div>
                    )}
                    {contact.browser && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Browser:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.browser}</span>
                      </div>
                    )}
                    {contact.device && (
                      <div className="flex text-sm border-b border-brand-purple/10 pb-2 pt-2">
                        <span className="text-brand-gray w-1/3">Device:</span>
                        <span className="text-brand-text font-medium w-2/3">{contact.device}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-brand-dark rounded-lg p-4 text-brand-text text-sm leading-relaxed whitespace-pre-wrap border border-brand-purple/10">
                    {contact.message}
                  </div>
                  
                  {contact.attachments && contact.attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-brand-purple/10">
                      <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {contact.attachments.map((file, i) => (
                          <a 
                            key={i} 
                            href={file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-brand-dark border border-brand-purple/30 rounded-md text-xs text-brand-teal hover:text-brand-gold hover:border-brand-gold transition-colors"
                          >
                            View Attachment {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => setIsReplyMode(true)}
                      className="px-4 py-2 bg-brand-teal text-[#131316] font-semibold rounded-md hover:bg-brand-teal/90 transition-colors flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" /> Reply
                    </button>
                  </div>
                </div>

                {/* Reply History */}
                {contact.replyHistory && contact.replyHistory.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-brand-text mb-4 border-b border-brand-purple/20 pb-2">Reply History</h4>
                    <div className="space-y-4">
                      {contact.replyHistory.map((reply, index) => (
                        <div key={index} className="bg-brand-dark border border-brand-purple/20 rounded-xl p-4 ml-8 relative before:absolute before:content-[''] before:w-6 before:h-px before:bg-brand-purple/30 before:-left-8 before:top-6 border-l-2 border-l-brand-teal">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm font-bold text-brand-gold">Admin ({reply.adminEmail})</p>
                              <p className="text-xs text-brand-gray">Subject: {reply.subject}</p>
                            </div>
                            <span className="text-xs text-brand-gray/70 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(reply.sentAt), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <div className="text-brand-text text-sm leading-relaxed whitespace-pre-wrap mt-3 bg-brand-card border border-brand-purple/10 p-3 rounded-md shadow-sm">
                            {reply.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Reply Form */
              <form onSubmit={handleSendReply} className="space-y-5 bg-brand-card border border-brand-purple/20 rounded-xl p-5 shadow-card-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <button 
                    type="button" 
                    onClick={() => setIsReplyMode(false)}
                    className="p-1.5 text-brand-gray hover:bg-brand-dark rounded-md transition-colors"
                    title="Back to details"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <h4 className="text-lg font-semibold text-brand-gold">Compose Reply</h4>
                </div>
                
                <div className="bg-brand-dark/50 p-3 rounded-lg border border-brand-purple/10 text-sm mb-4">
                  <span className="text-brand-gray">To: </span>
                  <span className="text-brand-text font-medium">{contact.name} &lt;{contact.email}&gt;</span>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-brand-text">Subject</label>
                  <input
                    type="text"
                    required
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="w-full px-4 py-2 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold"
                    placeholder="Subject..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-brand-text">Message</label>
                  <textarea
                    required
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-brand-dark border border-brand-purple/30 rounded-md text-brand-text focus:outline-none focus:border-brand-gold resize-y custom-scrollbar"
                    placeholder="Type your reply here..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-purple/10">
                  <button
                    type="button"
                    onClick={() => setIsReplyMode(false)}
                    className="px-4 py-2 text-brand-gray hover:text-brand-text font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={replyMutation.isLoading || !replySubject.trim() || !replyMessage.trim()}
                    className="px-6 py-2 bg-brand-gold text-[#131316] font-bold rounded-md hover:bg-[#c2984a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {replyMutation.isLoading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#131316]"></span>
                    ) : (
                      <><Send className="h-4 w-4" /> Send Reply</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      </DialogContent>
    </Dialog>
  );
}
