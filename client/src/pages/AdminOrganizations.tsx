import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import {
  Building2,
  Users,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Mail,
  Upload,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

interface Organization {
  id: number;
  name: string;
  slug: string;
  type: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  billingEmail?: string | null;
  billingName?: string | null;
  gstNumber?: string | null;
  totalSeats: number;
  usedSeats: number;
  memberCount: number;
  isActive: boolean;
  createdAt: string;
  subscriptionStatus?: string | null;
  subscriptionEndDate?: string | null;
  isVerified?: boolean;
}

interface PlatformInvitation {
  id: number;
  email: string;
  role: string;
  status: string;
  organizationId: number | null;
  organizationName?: string | null;
  expiresAt: string;
  createdAt: string;
}

const ORG_TYPES = [
  { value: "school", label: "School" },
  { value: "coaching", label: "Coaching" },
  { value: "college", label: "College" },
  { value: "corporate", label: "Corporate" },
];

export default function AdminOrganizations() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [formState, setFormState] = useState(createOrgForm());
  const [bulkEmails, setBulkEmails] = useState("");
  const [bulkRole, setBulkRole] = useState("student");

  useEffect(() => {
    if (user && !user.isOwner && !user.isAdmin) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const { data: organizations = [], isLoading: orgLoading } = useQuery<Organization[]>({
    queryKey: ["/api/admin/organizations"],
  });

  const { data: invitationsResponse } = useQuery<{ invitations: PlatformInvitation[] }>({
    queryKey: ["/api/admin/invitations"],
  });

  const invitations = invitationsResponse?.invitations ?? [];

  useEffect(() => {
    if (organizations.length > 0 && !selectedOrgId) {
      setSelectedOrgId(organizations[0].id);
    }
  }, [organizations, selectedOrgId]);

  const activeOrganization = useMemo(
    () => organizations.find((org) => org.id === selectedOrgId) || null,
    [organizations, selectedOrgId]
  );

  const orgInvitations = useMemo(() => {
    if (!selectedOrgId) return [];
    return invitations.filter((invite) => invite.organizationId === selectedOrgId);
  }, [invitations, selectedOrgId]);

  const createMutation = useMutation({
    mutationFn: async (payload: typeof formState) => {
      return apiRequest("POST", "/api/admin/organizations", formatOrgPayload(payload));
    },
    onSuccess: () => {
      toast({ title: "Organization created" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/organizations"] });
      setIsDialogOpen(false);
      setFormState(createOrgForm());
    },
    onError: (error: any) => {
      toast({ title: "Failed to create organization", description: error?.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedOrgId) return;
      return apiRequest("PUT", `/api/admin/organizations/${selectedOrgId}`, formatOrgPayload(formState));
    },
    onSuccess: () => {
      toast({ title: "Organization updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/organizations"] });
      setIsDialogOpen(false);
      setFormState(createOrgForm());
    },
    onError: (error: any) => {
      toast({ title: "Failed to update organization", description: error?.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/admin/organizations/${id}`),
    onSuccess: () => {
      toast({ title: "Organization archived" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/organizations"] });
    },
    onError: () => toast({ title: "Failed to archive organization", variant: "destructive" }),
  });

  const bulkInviteMutation = useMutation({
    mutationFn: async ({
      id,
      emails,
    }: {
      id: number;
      emails: Array<{ email: string }>;
    }) => {
      return apiRequest("POST", `/api/admin/organizations/${id}/invitations/bulk`, {
        emails,
        defaultRole: bulkRole,
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: "Invitations sent",
        description: `Created ${data.created} invite(s)${data.failed ? `, ${data.failed} failed` : ""
          }`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invitations"] });
      setBulkEmails("");
    },
    onError: (error: any) => {
      toast({
        title: "Failed to invite members",
        description: error?.message,
        variant: "destructive",
      });
    },
  });

  const handleSaveOrg = () => {
    if (dialogMode === "create") {
      createMutation.mutate(formState);
    } else {
      updateMutation.mutate();
    }
  };

  const handleEditOrg = (org: Organization) => {
    setDialogMode("edit");
    setSelectedOrgId(org.id);
    setFormState({
      name: org.name,
      email: org.email,
      type: org.type,
      phone: org.phone || "",
      city: org.city || "",
      state: org.state || "",
      country: org.country || "India",
      totalSeats: org.totalSeats,
      website: org.website || "",
      logoUrl: org.logoUrl || "",
      billingEmail: org.billingEmail || "",
      billingName: org.billingName || "",
      address: org.address || "",
      pincode: org.pincode || "",
    });
    setIsDialogOpen(true);
  };

  const handleCreateOrg = () => {
    setDialogMode("create");
    setFormState(createOrgForm());
    setIsDialogOpen(true);
  };

  const handleBulkInvite = () => {
    if (!selectedOrgId) {
      toast({ title: "Select an organization first", variant: "destructive" });
      return;
    }
    const emails = parseEmails(bulkEmails);
    if (!emails.length) {
      toast({ title: "Provide at least one email", variant: "destructive" });
      return;
    }
    bulkInviteMutation.mutate({ id: selectedOrgId, emails });
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result?.toString() ?? "";
      const lines = text.split(/\r?\n/).map((line) => line.split(/[,;]/)[0]?.trim());
      setBulkEmails((prev) => {
        const newline = prev ? "\n" : "";
        return `${prev}${newline}${lines.filter(Boolean).join("\n")}`;
      });
    };
    reader.readAsText(file);
  };

  if (!user?.isOwner && !user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="gradient-mesh-bg p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-4xl font-bold">Organizations</h1>
                <p className="text-muted-foreground">Seat management, branding, and invite tooling</p>
              </div>
            </div>

            <Button onClick={handleCreateOrg} data-testid="button-create-org">
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Institutions
              </CardTitle>
              <CardDescription>
                Track active partners, seat consumption, and subscription state
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orgLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : organizations.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                  No organizations yet. Create one to allocate seats.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {organizations.map((org) => {
                    const occupied = Math.max(org.usedSeats || 0, org.memberCount || 0);
                    const progress = org.totalSeats
                      ? Math.min(100, Math.round((occupied / org.totalSeats) * 100))
                      : 0;
                    const isSelected = selectedOrgId === org.id;
                    return (
                      <Card
                        key={org.id}
                        className={`border ${isSelected ? "border-primary" : ""} cursor-pointer`}
                        onClick={() => setSelectedOrgId(org.id)}
                        data-testid={`org-card-${org.id}`}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{org.name}</h3>
                              <p className="text-sm text-muted-foreground">{org.email}</p>
                            </div>
                            <Badge variant={org.isActive ? "secondary" : "destructive"}>
                              {org.isActive ? "Active" : "Archived"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">{org.type}</Badge>
                            {org.isVerified && (
                              <span className="flex items-center gap-1 text-green-600 text-xs">
                                <ShieldCheck className="h-3 w-3" />
                                Verified
                              </span>
                            )}
                            <span className="text-muted-foreground">
                              {org.memberCount} members
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Seat usage</span>
                              <span>
                                {occupied}/{org.totalSeats}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="text-xs text-muted-foreground space-y-1">
                              {org.subscriptionStatus && (
                                <div>Plan: {org.subscriptionStatus}</div>
                              )}
                              {org.subscriptionEndDate && (
                                <div>
                                  Expires:{" "}
                                  {new Date(org.subscriptionEndDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditOrg(org);
                                }}
                                data-testid={`button-edit-org-${org.id}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    confirm(
                                      `Archive ${org.name}? Members keep existing access but invites stop.`
                                    )
                                  ) {
                                    deleteMutation.mutate(org.id);
                                  }
                                }}
                                data-testid={`button-archive-org-${org.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Bulk Invitations
                </CardTitle>
                <CardDescription>
                  Paste comma/line-separated emails or upload a CSV to invite members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Target Organization</Label>
                  <Select
                    value={selectedOrgId ? String(selectedOrgId) : ""}
                    onValueChange={(value) => setSelectedOrgId(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={String(org.id)}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Default Role</Label>
                    <Select value={bulkRole} onValueChange={setBulkRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>CSV Upload</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" type="button" size="sm" asChild>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            accept=".csv,text/csv"
                            onChange={handleCsvUpload}
                            className="hidden"
                          />
                        </label>
                      </Button>
                      <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Email list</Label>
                  <Textarea
                    rows={6}
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    placeholder="person@example.com, mentor@school.com"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleBulkInvite}
                  disabled={bulkInviteMutation.isPending}
                >
                  {bulkInviteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Invites"
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invitations</CardTitle>
                <CardDescription>
                  Invitations linked to the selected organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedOrgId ? (
                  <ScrollArea className="h-72">
                    {orgInvitations.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center">
                        No invitations yet.
                      </p>
                    ) : (
                      <div className="w-full overflow-x-auto">
                        <Table className="min-w-[520px]">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Email</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Expires</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orgInvitations.map((invite) => (
                              <TableRow key={invite.id}>
                                <TableCell className="font-medium">{invite.email}</TableCell>
                                <TableCell>{invite.role}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      invite.status === "pending" ? "secondary" : "outline"
                                    }
                                  >
                                    {invite.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(invite.expiresAt).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </ScrollArea>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select an organization to see its invitations.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <OrgDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            mode={dialogMode}
            formState={formState}
            onChange={setFormState}
            onSubmit={handleSaveOrg}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      </main>
    </div>
  );
}

function createOrgForm() {
  return {
    name: "",
    email: "",
    type: "school",
    phone: "",
    city: "",
    state: "",
    country: "India",
    totalSeats: 50,
    website: "",
    logoUrl: "",
    billingEmail: "",
    billingName: "",
    address: "",
    pincode: "",
  };
}

function formatOrgPayload(form: ReturnType<typeof createOrgForm>) {
  return {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    type: form.type,
    phone: form.phone || null,
    city: form.city || null,
    state: form.state || null,
    country: form.country || "India",
    totalSeats: Number(form.totalSeats) || 0,
    website: form.website || null,
    logoUrl: form.logoUrl || null,
    billingEmail: form.billingEmail || null,
    billingName: form.billingName || null,
    address: form.address || null,
    pincode: form.pincode || null,
  };
}

function parseEmails(text: string) {
  return text
    .split(/[\n,;]+/)
    .map((value) => value.trim())
    .filter((value) => value.length > 3 && value.includes("@"))
    .map((email) => ({ email }));
}

function OrgDialog({
  open,
  onOpenChange,
  mode,
  formState,
  onChange,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  formState: ReturnType<typeof createOrgForm>;
  onChange: (state: ReturnType<typeof createOrgForm>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const handleInput = (field: keyof ReturnType<typeof createOrgForm>, value: any) => {
    onChange({ ...formState, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[calc(100%-1.5rem)] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Organization" : "Edit Organization"}
          </DialogTitle>
          <DialogDescription>
            Configure branding, seats, and contact details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formState.name}
                onChange={(e) => handleInput("name", e.target.value)}
                placeholder="e.g., Zenith Coaching"
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={formState.type} onValueChange={(value) => handleInput("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORG_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                value={formState.email}
                onChange={(e) => handleInput("email", e.target.value)}
                type="email"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={formState.phone}
                onChange={(e) => handleInput("phone", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Website</Label>
              <Input
                value={formState.website}
                onChange={(e) => handleInput("website", e.target.value)}
              />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input
                value={formState.logoUrl}
                onChange={(e) => handleInput("logoUrl", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Billing Email</Label>
              <Input
                value={formState.billingEmail}
                onChange={(e) => handleInput("billingEmail", e.target.value)}
              />
            </div>
            <div>
              <Label>Billing Name</Label>
              <Input
                value={formState.billingName}
                onChange={(e) => handleInput("billingName", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>City</Label>
              <Input value={formState.city} onChange={(e) => handleInput("city", e.target.value)} />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={formState.state}
                onChange={(e) => handleInput("state", e.target.value)}
              />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input
                value={formState.pincode}
                onChange={(e) => handleInput("pincode", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Textarea
              rows={3}
              value={formState.address}
              onChange={(e) => handleInput("address", e.target.value)}
            />
          </div>
          <div>
            <Label>Total Seats</Label>
            <Input
              type="number"
              min={1}
              value={formState.totalSeats}
              onChange={(e) => handleInput("totalSeats", Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
