import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Plus, Upload, DollarSign, Clock } from "lucide-react";
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

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");

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

  const stats = {
    totalUsers: users.length,
    paidUsers: users.filter(u => u.isPaidUser).length,
    freeUsers: users.filter(u => u.adminGranted && !u.isPaidUser).length,
    totalTokens: users.reduce((sum, u) => sum + u.openaiTokensUsed, 0),
  };

  return (
    <div className="min-h-screen gradient-mesh-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-10 w-10 text-yellow-500" />
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-panel">
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

          <Card className="glass-panel">
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

          <Card className="glass-panel">
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

          <Card className="glass-panel">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">OpenAI Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalTokens.toLocaleString()}</div>
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
