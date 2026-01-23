import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  MoreHorizontal,
  Search,
  Shield,
  Users,
  UserX,
  UserCheck,
  Star,
  StarOff,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin";
  isAdmin: boolean;
  isPaidUser: boolean;
  isOwner: boolean;
  isDisabled: boolean;
  currentLevel: number;
  totalPoints: number;
  createdAt: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface ConfirmDialogState {
  open: boolean;
  type: "role" | "premium" | "status" | null;
  userId: string | null;
  userName: string | null;
  currentValue: string | boolean | null;
  newValue: string | boolean | null;
}

export default function AdminUsers() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [premiumFilter, setPremiumFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    type: null,
    userId: null,
    userName: null,
    currentValue: null,
    newValue: null,
  });

  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ["/api/admin/users", page, pageSize, search, roleFilter, statusFilter, premiumFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      if (search) params.set("search", search);
      if (roleFilter !== "all") params.set("role", roleFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (premiumFilter !== "all") params.set("premium", premiumFilter);

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return apiRequest("PATCH", `/api/admin/users/${userId}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Role updated successfully" });
      setConfirmDialog({ ...confirmDialog, open: false });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update role",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const togglePremiumMutation = useMutation({
    mutationFn: async ({ userId, isPaidUser }: { userId: string; isPaidUser: boolean }) => {
      return apiRequest("PATCH", `/api/admin/users/${userId}/premium`, { isPaidUser });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Premium status updated successfully" });
      setConfirmDialog({ ...confirmDialog, open: false });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update premium status",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ userId, isDisabled }: { userId: string; isDisabled: boolean }) => {
      return apiRequest("PATCH", `/api/admin/users/${userId}/status`, { isDisabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Account status updated successfully" });
      setConfirmDialog({ ...confirmDialog, open: false });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update account status",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const impersonateMutation = useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest("POST", "/api/auth/admin/impersonate", { targetUserId: userId });
    },
    onSuccess: () => {
      // Hard redirect to refresh session and dashboard
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast({
        title: "Impersonation failed",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  if (!user?.isAdmin) {
    setLocation("/");
    return null;
  }

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleConfirmAction = () => {
    if (!confirmDialog.userId) return;

    if (confirmDialog.type === "role" && typeof confirmDialog.newValue === "string") {
      changeRoleMutation.mutate({
        userId: confirmDialog.userId,
        role: confirmDialog.newValue
      });
    } else if (confirmDialog.type === "premium" && typeof confirmDialog.newValue === "boolean") {
      togglePremiumMutation.mutate({
        userId: confirmDialog.userId,
        isPaidUser: confirmDialog.newValue
      });
    } else if (confirmDialog.type === "status" && typeof confirmDialog.newValue === "boolean") {
      toggleStatusMutation.mutate({
        userId: confirmDialog.userId,
        isDisabled: confirmDialog.newValue
      });
    }
  };

  const openRoleDialog = (targetUser: User, newRole: string) => {
    setConfirmDialog({
      open: true,
      type: "role",
      userId: targetUser.id,
      userName: targetUser.name,
      currentValue: targetUser.role,
      newValue: newRole,
    });
  };

  const openPremiumDialog = (targetUser: User) => {
    setConfirmDialog({
      open: true,
      type: "premium",
      userId: targetUser.id,
      userName: targetUser.name,
      currentValue: targetUser.isPaidUser,
      newValue: !targetUser.isPaidUser,
    });
  };

  const openStatusDialog = (targetUser: User) => {
    setConfirmDialog({
      open: true,
      type: "status",
      userId: targetUser.id,
      userName: targetUser.name,
      currentValue: targetUser.isDisabled,
      newValue: !targetUser.isDisabled,
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "mentor": return "secondary";
      default: return "outline";
    }
  };

  const canModifyUser = (targetUser: User) => {
    if (targetUser.isOwner) return false;
    if (targetUser.isAdmin && !user?.isOwner) return false;
    return true;
  };

  const getDialogDescription = () => {
    if (confirmDialog.type === "role") {
      return `Are you sure you want to change ${confirmDialog.userName}'s role from "${confirmDialog.currentValue}" to "${confirmDialog.newValue}"?`;
    }
    if (confirmDialog.type === "premium") {
      return confirmDialog.newValue
        ? `Are you sure you want to grant premium access to ${confirmDialog.userName}?`
        : `Are you sure you want to revoke premium access from ${confirmDialog.userName}?`;
    }
    if (confirmDialog.type === "status") {
      return confirmDialog.newValue
        ? `Are you sure you want to disable ${confirmDialog.userName}'s account? They will not be able to log in.`
        : `Are you sure you want to enable ${confirmDialog.userName}'s account?`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setLocation("/admin")}
            data-testid="button-back-admin"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle data-testid="text-page-title">User Management</CardTitle>
                    <CardDescription data-testid="text-total-users">
                      {data?.pagination.total || 0} total users
                    </CardDescription>
                  </div>
                </div>
                {user?.isOwner && (
                  <Badge variant="default" className="gap-1" data-testid="badge-owner">
                    <Crown className="h-3 w-3" />
                    Owner
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex flex-1 gap-2">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                    data-testid="input-search"
                  />
                  <Button onClick={handleSearch} data-testid="button-search">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Select value={roleFilter} onValueChange={(value) => { setRoleFilter(value); setPage(1); }}>
                    <SelectTrigger className="w-32" data-testid="select-role-filter">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
                    <SelectTrigger className="w-32" data-testid="select-status-filter">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={premiumFilter} onValueChange={(value) => { setPremiumFilter(value); setPage(1); }}>
                    <SelectTrigger className="w-32" data-testid="select-premium-filter">
                      <SelectValue placeholder="Premium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="true">Premium</SelectItem>
                      <SelectItem value="false">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading && (
                <div className="flex justify-center py-8" data-testid="loading-indicator">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              )}

              {error && (
                <div className="text-center py-8 text-destructive" data-testid="error-message">
                  Failed to load users. Please try again.
                </div>
              )}

              {data && (
                <>
                  <div className="rounded-md border">
                    <div className="w-full overflow-x-auto">
                      <Table className="min-w-[860px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Premium</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.users.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No users found
                              </TableCell>
                            </TableRow>
                          ) : (
                            data.users.map((targetUser) => (
                              <TableRow key={targetUser.id} data-testid={`row-user-${targetUser.id}`}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {targetUser.name}
                                    {targetUser.isOwner && (
                                      <Badge variant="default" className="gap-1 text-xs" data-testid={`badge-owner-${targetUser.id}`}>
                                        <Crown className="h-3 w-3" />
                                        Owner
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell data-testid={`text-email-${targetUser.id}`}>
                                  {targetUser.email}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={getRoleBadgeVariant(targetUser.role)}
                                    data-testid={`badge-role-${targetUser.id}`}
                                  >
                                    {targetUser.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                                    {targetUser.role}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {targetUser.isDisabled ? (
                                    <Badge variant="destructive" data-testid={`badge-status-${targetUser.id}`}>
                                      <UserX className="h-3 w-3 mr-1" />
                                      Disabled
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-green-600 border-green-600" data-testid={`badge-status-${targetUser.id}`}>
                                      <UserCheck className="h-3 w-3 mr-1" />
                                      Enabled
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {targetUser.isPaidUser ? (
                                    <Badge className="bg-amber-500 hover:bg-amber-600" data-testid={`badge-premium-${targetUser.id}`}>
                                      <Star className="h-3 w-3 mr-1" />
                                      Premium
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" data-testid={`badge-premium-${targetUser.id}`}>
                                      Free
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm" data-testid={`text-created-${targetUser.id}`}>
                                  {format(new Date(targetUser.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        disabled={targetUser.isOwner}
                                        data-testid={`button-actions-${targetUser.id}`}
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />

                                      {canModifyUser(targetUser) && (
                                        <>
                                          <DropdownMenuLabel className="text-xs text-muted-foreground">
                                            Change Role
                                          </DropdownMenuLabel>
                                          {["student", "mentor", "admin"].filter(r => r !== targetUser.role).map((role) => (
                                            <DropdownMenuItem
                                              key={role}
                                              onClick={() => openRoleDialog(targetUser, role)}
                                              disabled={role === "admin" && !user?.isOwner}
                                              data-testid={`action-role-${role}-${targetUser.id}`}
                                            >
                                              Set as {role}
                                            </DropdownMenuItem>
                                          ))}
                                          <DropdownMenuSeparator />
                                        </>
                                      )}

                                      <DropdownMenuItem
                                        onClick={() => impersonateMutation.mutate(targetUser.id)}
                                        disabled={!canModifyUser(targetUser)}
                                        data-testid={`action-impersonate-${targetUser.id}`}
                                      >
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Log in as User
                                      </DropdownMenuItem>

                                      <DropdownMenuItem
                                        onClick={() => openPremiumDialog(targetUser)}
                                        disabled={!canModifyUser(targetUser)}
                                        data-testid={`action-premium-${targetUser.id}`}
                                      >
                                        {targetUser.isPaidUser ? (
                                          <>
                                            <StarOff className="h-4 w-4 mr-2" />
                                            Revoke Premium
                                          </>
                                        ) : (
                                          <>
                                            <Star className="h-4 w-4 mr-2" />
                                            Grant Premium
                                          </>
                                        )}
                                      </DropdownMenuItem>

                                      <DropdownMenuItem
                                        onClick={() => openStatusDialog(targetUser)}
                                        disabled={!canModifyUser(targetUser)}
                                        className={targetUser.isDisabled ? "text-green-600" : "text-destructive"}
                                        data-testid={`action-status-${targetUser.id}`}
                                      >
                                        {targetUser.isDisabled ? (
                                          <>
                                            <UserCheck className="h-4 w-4 mr-2" />
                                            Enable Account
                                          </>
                                        ) : (
                                          <>
                                            <UserX className="h-4 w-4 mr-2" />
                                            Disable Account
                                          </>
                                        )}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {data.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground" data-testid="text-pagination-info">
                        Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, data.pagination.total)} of {data.pagination.total} users
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                          data-testid="button-prev-page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1 text-sm">
                          Page {page} of {data.pagination.totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                          disabled={page === data.pagination.totalPages}
                          data-testid="button-next-page"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
          <AlertDialogContent data-testid="dialog-confirm">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {confirmDialog.type === "status" && confirmDialog.newValue ? "Disable Account" : "Confirm Action"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {getDialogDescription()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmAction}
                className={confirmDialog.type === "status" && confirmDialog.newValue ? "bg-destructive hover:bg-destructive/90" : ""}
                data-testid="button-confirm"
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main >
    </div >
  );
}
