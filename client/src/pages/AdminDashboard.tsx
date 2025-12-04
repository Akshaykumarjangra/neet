import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Plus, Upload, DollarSign, Clock, CheckCircle, XCircle, GraduationCap, ChevronDown, ChevronUp, Layers } from "lucide-react";
import PlaceholderVisualization from "@/components/PlaceholderVisualization";

interface User {
  id: string;
  username: string;
  email: string;
  isPaidUser: boolean;
  adminGranted: boolean;
  accessExpiry: string | null;
  openaiTokensUsed: number;
  openaiTokensLimit: number;
  createdAt: string;
}

interface PendingMentor {
  id: number;
  userId: string;
  bio: string;
  subjects: string[];
  topics: string[];
  hourlyRate: number;
  experienceYears: number;
  education: Array<{degree: string; institution: string; year?: number}>;
  languages: string[];
  verificationDocuments: any[];
  createdAt: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [expandedMentors, setExpandedMentors] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (user && !user.isAdmin) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: pendingMentors = [], isLoading: isLoadingMentors } = useQuery<PendingMentor[]>({
    queryKey: ["/api/admin/mentors/pending"],
  });

  const grantAccessMutation = useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest("POST", `/api/admin/grant-access/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Access granted successfully" });
    },
  });

  const revokeAccessMutation = useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest("POST", `/api/admin/revoke-access/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Access revoked successfully" });
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (data: { email: string; username: string }) => {
      return apiRequest("POST", "/api/admin/add-user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User added successfully" });
      setNewUserEmail("");
      setNewUserUsername("");
    },
  });

  const bulkImportMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      return apiRequest("POST", "/api/admin/bulk-import", { emails });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Bulk import completed",
        description: `Imported ${data.imported} users`
      });
      setBulkEmails("");
    },
  });

  const verifyMentorMutation = useMutation({
    mutationFn: async (mentorId: number) => {
      return apiRequest("PUT", `/api/admin/mentors/${mentorId}/verify`, { status: "approved" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
      toast({ title: "Mentor approved successfully", description: "The mentor can now accept students." });
    },
    onError: () => {
      toast({ title: "Failed to approve mentor", variant: "destructive" });
    },
  });

  const rejectMentorMutation = useMutation({
    mutationFn: async (mentorId: number) => {
      return apiRequest("PUT", `/api/admin/mentors/${mentorId}/verify`, { status: "rejected" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
      toast({ title: "Mentor application rejected" });
    },
    onError: () => {
      toast({ title: "Failed to reject mentor", variant: "destructive" });
    },
  });

  const handleBulkImport = () => {
    const emails = bulkEmails
      .split("\n")
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (emails.length === 0) {
      toast({ title: "No emails provided", variant: "destructive" });
      return;
    }

    bulkImportMutation.mutate(emails);
  };

  const hasAccess = (user: User) => {
    if (user.adminGranted) return true;
    if (!user.accessExpiry) return false;
    return new Date(user.accessExpiry) > new Date();
  };

  const toggleMentorExpanded = (mentorId: number) => {
    setExpandedMentors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mentorId)) {
        newSet.delete(mentorId);
      } else {
        newSet.add(mentorId);
      }
      return newSet;
    });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const stats = {
    totalUsers: users.length,
    paidUsers: users.filter(u => u.isPaidUser).length,
    freeUsers: users.filter(u => u.adminGranted && !u.isPaidUser).length,
    totalTokens: users.reduce((sum, u) => sum + u.openaiTokensUsed, 0),
    pendingMentors: pendingMentors.length,
  };

  return (
    <div className="min-h-screen gradient-mesh-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <Button
            onClick={() => setLocation("/admin/content")}
            className="gap-2"
            data-testid="button-content-manager"
          >
            <Layers className="h-4 w-4" />
            Content Manager
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="glass-panel" data-testid="stat-total-users">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-paid-users">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Paid Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.paidUsers}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-free-access">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Free Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.freeUsers}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-openai-tokens">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">OpenAI Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalTokens.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-pending-mentors">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Pending Mentors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingMentors}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Single User
              </CardTitle>
              <CardDescription>Grant free access to a single user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="student@example.com"
                  data-testid="input-new-user-email"
                />
              </div>
              <div>
                <Label>Username</Label>
                <Input
                  value={newUserUsername}
                  onChange={(e) => setNewUserUsername(e.target.value)}
                  placeholder="student123"
                  data-testid="input-new-user-username"
                />
              </div>
              <Button
                onClick={() => addUserMutation.mutate({ email: newUserEmail, username: newUserUsername })}
                disabled={addUserMutation.isPending || !newUserEmail || !newUserUsername}
                className="w-full"
                data-testid="button-add-user"
              >
                Add User
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Bulk Import
              </CardTitle>
              <CardDescription>Import multiple users (one email per line)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
                placeholder="student1@example.com&#10;student2@example.com&#10;student3@example.com"
                rows={5}
                data-testid="textarea-bulk-emails"
              />
              <Button
                onClick={handleBulkImport}
                disabled={bulkImportMutation.isPending || !bulkEmails.trim()}
                className="w-full"
                data-testid="button-bulk-import"
              >
                Import Users
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Questions Visualization */}
        <div className="mb-8">
          <PlaceholderVisualization />
        </div>

        {/* Mentor Verification Section */}
        <Card className="glass-panel mb-8" data-testid="mentor-verification-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Mentor Verification
              {pendingMentors.length > 0 && (
                <Badge variant="secondary" className="ml-2" data-testid="pending-mentor-count">
                  {pendingMentors.length} pending
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Review and approve mentor applications</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingMentors ? (
              <p data-testid="mentor-loading">Loading mentor applications...</p>
            ) : pendingMentors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="mentor-empty-state">
                <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No pending mentor applications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingMentors.map((mentor) => (
                  <Collapsible
                    key={mentor.id}
                    open={expandedMentors.has(mentor.id)}
                    onOpenChange={() => toggleMentorExpanded(mentor.id)}
                  >
                    <div
                      className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-border transition-colors"
                      data-testid={`mentor-card-${mentor.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12" data-testid={`mentor-avatar-${mentor.id}`}>
                          <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
                          <AvatarFallback>{getInitials(mentor.userName)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h4 className="font-semibold" data-testid={`mentor-name-${mentor.id}`}>
                                {mentor.userName}
                              </h4>
                              <p className="text-sm text-muted-foreground" data-testid={`mentor-email-${mentor.id}`}>
                                {mentor.userEmail}
                              </p>
                            </div>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                data-testid={`button-expand-mentor-${mentor.id}`}
                              >
                                {expandedMentors.has(mentor.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2" data-testid={`mentor-subjects-${mentor.id}`}>
                            {(mentor.subjects || []).map((subject, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span data-testid={`mentor-experience-${mentor.id}`}>
                              {mentor.experienceYears} years experience
                            </span>
                            <span data-testid={`mentor-rate-${mentor.id}`}>
                              ₹{mentor.hourlyRate}/hour
                            </span>
                          </div>

                          {mentor.bio && (
                            <p
                              className="text-sm text-muted-foreground line-clamp-2 mb-3"
                              data-testid={`mentor-bio-preview-${mentor.id}`}
                            >
                              {mentor.bio}
                            </p>
                          )}

                          <CollapsibleContent>
                            <div className="pt-3 border-t border-border/50 space-y-3">
                              {mentor.bio && (
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Full Bio</h5>
                                  <p className="text-sm text-muted-foreground" data-testid={`mentor-bio-full-${mentor.id}`}>
                                    {mentor.bio}
                                  </p>
                                </div>
                              )}

                              {mentor.education && mentor.education.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Education</h5>
                                  <ul className="space-y-1" data-testid={`mentor-education-${mentor.id}`}>
                                    {mentor.education.map((edu, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground">
                                        {edu.degree} - {edu.institution}
                                        {edu.year && ` (${edu.year})`}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {mentor.languages && mentor.languages.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Languages</h5>
                                  <div className="flex gap-1" data-testid={`mentor-languages-${mentor.id}`}>
                                    {mentor.languages.map((lang, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {mentor.topics && mentor.topics.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-sm mb-1">Topics</h5>
                                  <div className="flex flex-wrap gap-1" data-testid={`mentor-topics-${mentor.id}`}>
                                    {mentor.topics.map((topic, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="text-xs text-muted-foreground" data-testid={`mentor-created-${mentor.id}`}>
                                Applied: {new Date(mentor.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </CollapsibleContent>

                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => verifyMentorMutation.mutate(mentor.id)}
                              disabled={verifyMentorMutation.isPending || rejectMentorMutation.isPending}
                              data-testid={`button-approve-mentor-${mentor.id}`}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectMentorMutation.mutate(mentor.id)}
                              disabled={verifyMentorMutation.isPending || rejectMentorMutation.isPending}
                              data-testid={`button-reject-mentor-${mentor.id}`}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapsible>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Manage user access and monitor token usage</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading users...</p>
            ) : (
              <div className="space-y-2">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover-elevate" data-testid={`user-row-${u.id}`}>
                    <div className="flex-1">
                      <div className="font-semibold">{u.username}</div>
                      <div className="text-sm text-muted-foreground">{u.email}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      {hasAccess(u) ? (
                        <Badge variant="default" className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="secondary">No Access</Badge>
                      )}

                      {u.isPaidUser && <Badge>Paid</Badge>}
                      {u.adminGranted && <Badge variant="outline">Admin Granted</Badge>}

                      <div className="text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {u.openaiTokensUsed.toLocaleString()} tokens
                      </div>

                      {!u.adminGranted ? (
                        <Button
                          size="sm"
                          onClick={() => grantAccessMutation.mutate(u.id)}
                          disabled={grantAccessMutation.isPending}
                          data-testid={`button-grant-${u.id}`}
                        >
                          Grant Access
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => revokeAccessMutation.mutate(u.id)}
                          disabled={revokeAccessMutation.isPending}
                          data-testid={`button-revoke-${u.id}`}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
