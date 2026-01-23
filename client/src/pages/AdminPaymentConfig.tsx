import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import {
  CreditCard,
  Settings,
  Save,
  Plus,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  IndianRupee,
  ArrowLeft,
  RefreshCw,
  Eye,
  EyeOff,
  Crown,
  Building2,
  Sparkles,
} from "lucide-react";

interface SubscriptionPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  planType: string;
  priceMonthly: number;
  priceYearly: number | null;
  currency: string;
  features: string[];
  limits: Record<string, any> | null;
  trialDays: number | null;
  isActive: boolean;
  isPopular: boolean;
  displayOrder: number;
  stripeProductId: string | null;
  stripePriceIdMonthly: string | null;
  stripePriceIdYearly: string | null;
  razorpayPlanIdMonthly: string | null;
  razorpayPlanIdYearly: string | null;
}

interface SubscriptionStats {
  active_count: number;
  trial_count: number;
  cancelled_count: number;
  expired_count: number;
  total_count: number;
}

const formatPrice = (cents: number) => {
  return `₹${(cents / 100).toLocaleString("en-IN")}`;
};

export default function AdminPaymentConfig() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSecrets, setShowSecrets] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [paymentSettings, setPaymentSettings] = useState({
    paymentProvider: "none",
    stripePublishableKey: "",
    stripeSecretKey: "",
    stripeWebhookSecret: "",
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayWebhookSecret: "",
    enableTestMode: true,
    currency: "INR",
  });

  const [newPlan, setNewPlan] = useState({
    name: "",
    slug: "",
    description: "",
    planType: "premium",
    priceMonthly: 0,
    priceYearly: 0,
    features: [] as string[],
    trialDays: 7,
    isActive: true,
    isPopular: false,
    displayOrder: 0,
  });

  const { data: plans = [], isLoading: plansLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/admin/subscription-plans"],
  });

  const { data: stats } = useQuery<SubscriptionStats>({
    queryKey: ["/api/admin/subscriptions/stats"],
  });

  const { data: settings } = useQuery<Record<string, any>>({
    queryKey: ["/api/admin/settings"],
  });

  useEffect(() => {
    if (settings) {
      setPaymentSettings(prev => ({
        ...prev,
        paymentProvider: settings.paymentProvider || "none",
        stripePublishableKey: settings.stripePublishableKey || "",
        stripeSecretKey: settings.stripeSecretKey || "",
        stripeWebhookSecret: settings.stripeWebhookSecret || "",
        razorpayKeyId: settings.razorpayKeyId || "",
        razorpayKeySecret: settings.razorpayKeySecret || "",
        razorpayWebhookSecret: settings.razorpayWebhookSecret || "",
        enableTestMode: settings.enableTestMode !== false,
        currency: settings.currency || "INR",
      }));
    }
  }, [settings]);

  const saveSettingsMutation = useMutation({
    mutationFn: async (settingsToSave: Record<string, any>) => {
      const res = await fetch("/api/admin/settings/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ settings: settingsToSave }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Settings saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: () => {
      toast({ title: "Failed to save settings", variant: "destructive" });
    },
  });

  const createPlanMutation = useMutation({
    mutationFn: async (plan: typeof newPlan) => {
      const res = await fetch("/api/admin/subscription-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(plan),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create plan");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Plan created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscription-plans"] });
      setIsCreateDialogOpen(false);
      setNewPlan({
        name: "",
        slug: "",
        description: "",
        planType: "premium",
        priceMonthly: 0,
        priceYearly: 0,
        features: [],
        trialDays: 7,
        isActive: true,
        isPopular: false,
        displayOrder: 0,
      });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: async (plan: SubscriptionPlan) => {
      const res = await fetch(`/api/admin/subscription-plans/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(plan),
      });
      if (!res.ok) throw new Error("Failed to update plan");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Plan updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscription-plans"] });
      setEditingPlan(null);
    },
    onError: () => {
      toast({ title: "Failed to update plan", variant: "destructive" });
    },
  });

  const deletePlanMutation = useMutation({
    mutationFn: async (planId: number) => {
      const res = await fetch(`/api/admin/subscription-plans/${planId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete plan");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Plan deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscription-plans"] });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSaveSettings = () => {
    saveSettingsMutation.mutate(paymentSettings);
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "free": return <Sparkles className="h-5 w-5" />;
      case "premium": return <Crown className="h-5 w-5" />;
      case "organization": return <Building2 className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" data-testid="button-back-admin">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold" data-testid="text-page-title">Payment Configuration</h1>
              <p className="text-sm text-muted-foreground">Manage subscription plans and payment providers</p>
            </div>
          </div>
          <Button onClick={handleSaveSettings} disabled={saveSettingsMutation.isPending} data-testid="button-save-settings">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card data-testid="card-stat-active">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.active_count || 0}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-trial">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Trial</p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.trial_count || 0}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-cancelled">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.cancelled_count || 0}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-total">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{stats?.total_count || 0}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plans" data-testid="tab-plans">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscription Plans
            </TabsTrigger>
            <TabsTrigger value="provider" data-testid="tab-provider">
              <Settings className="h-4 w-4 mr-2" />
              Payment Provider
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Subscription Plans</h2>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-create-plan">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-[calc(100%-1.5rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Plan</DialogTitle>
                    <DialogDescription>Add a new subscription plan for your users</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Plan Name</Label>
                        <Input
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                          placeholder="e.g., Premium Plus"
                          data-testid="input-new-plan-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Slug (URL-friendly)</Label>
                        <Input
                          value={newPlan.slug}
                          onChange={(e) => setNewPlan({ ...newPlan, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          placeholder="e.g., premium-plus"
                          data-testid="input-new-plan-slug"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newPlan.description}
                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                        placeholder="Describe this plan..."
                        data-testid="input-new-plan-description"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Plan Type</Label>
                        <Select value={newPlan.planType} onValueChange={(v) => setNewPlan({ ...newPlan, planType: v })}>
                          <SelectTrigger data-testid="select-new-plan-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="organization">Organization</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Monthly Price (paise)</Label>
                        <Input
                          type="number"
                          value={newPlan.priceMonthly}
                          onChange={(e) => setNewPlan({ ...newPlan, priceMonthly: parseInt(e.target.value) || 0 })}
                          placeholder="99900"
                          data-testid="input-new-plan-price-monthly"
                        />
                        <p className="text-xs text-muted-foreground">
                          = {formatPrice(newPlan.priceMonthly)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Yearly Price (paise)</Label>
                        <Input
                          type="number"
                          value={newPlan.priceYearly}
                          onChange={(e) => setNewPlan({ ...newPlan, priceYearly: parseInt(e.target.value) || 0 })}
                          placeholder="799900"
                          data-testid="input-new-plan-price-yearly"
                        />
                        <p className="text-xs text-muted-foreground">
                          = {formatPrice(newPlan.priceYearly)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Trial Days</Label>
                        <Input
                          type="number"
                          value={newPlan.trialDays}
                          onChange={(e) => setNewPlan({ ...newPlan, trialDays: parseInt(e.target.value) || 0 })}
                          data-testid="input-new-plan-trial"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Display Order</Label>
                        <Input
                          type="number"
                          value={newPlan.displayOrder}
                          onChange={(e) => setNewPlan({ ...newPlan, displayOrder: parseInt(e.target.value) || 0 })}
                          data-testid="input-new-plan-order"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newPlan.isActive}
                          onCheckedChange={(v) => setNewPlan({ ...newPlan, isActive: v })}
                          data-testid="switch-new-plan-active"
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newPlan.isPopular}
                          onCheckedChange={(v) => setNewPlan({ ...newPlan, isPopular: v })}
                          data-testid="switch-new-plan-popular"
                        />
                        <Label>Mark as Popular</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => createPlanMutation.mutate(newPlan)} disabled={createPlanMutation.isPending} data-testid="button-submit-create-plan">
                      Create Plan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {plansLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative ${!plan.isActive ? "opacity-60" : ""}`} data-testid={`card-plan-${plan.slug}`}>
                    {plan.isPopular && (
                      <Badge className="absolute -top-2 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {getPlanIcon(plan.planType)}
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <IndianRupee className="h-4 w-4" />
                          <span className="text-2xl font-bold">{(plan.priceMonthly / 100).toLocaleString("en-IN")}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {plan.priceYearly && (
                          <p className="text-sm text-muted-foreground">
                            or ₹{(plan.priceYearly / 100).toLocaleString("en-IN")}/year
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={plan.isActive ? "default" : "secondary"}>
                          {plan.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">{plan.planType}</Badge>
                        {plan.trialDays && plan.trialDays > 0 && (
                          <Badge variant="outline">{plan.trialDays} day trial</Badge>
                        )}
                      </div>
                      {plan.features && plan.features.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {plan.features.length} features configured
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingPlan(plan)} data-testid={`button-edit-plan-${plan.slug}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl w-[calc(100%-1.5rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Plan: {plan.name}</DialogTitle>
                          </DialogHeader>
                          {editingPlan && editingPlan.id === plan.id && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Plan Name</Label>
                                  <Input
                                    value={editingPlan.name}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                    data-testid="input-edit-plan-name"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Slug</Label>
                                  <Input value={editingPlan.slug} disabled className="bg-muted" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  value={editingPlan.description || ""}
                                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                                  data-testid="input-edit-plan-description"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Monthly Price (paise)</Label>
                                  <Input
                                    type="number"
                                    value={editingPlan.priceMonthly}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, priceMonthly: parseInt(e.target.value) || 0 })}
                                    data-testid="input-edit-plan-price-monthly"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    = {formatPrice(editingPlan.priceMonthly)}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label>Yearly Price (paise)</Label>
                                  <Input
                                    type="number"
                                    value={editingPlan.priceYearly || 0}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, priceYearly: parseInt(e.target.value) || null })}
                                    data-testid="input-edit-plan-price-yearly"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    = {formatPrice(editingPlan.priceYearly || 0)}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Trial Days</Label>
                                  <Input
                                    type="number"
                                    value={editingPlan.trialDays || 0}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, trialDays: parseInt(e.target.value) || 0 })}
                                    data-testid="input-edit-plan-trial"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Display Order</Label>
                                  <Input
                                    type="number"
                                    value={editingPlan.displayOrder}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, displayOrder: parseInt(e.target.value) || 0 })}
                                    data-testid="input-edit-plan-order"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={editingPlan.isActive}
                                    onCheckedChange={(v) => setEditingPlan({ ...editingPlan, isActive: v })}
                                    data-testid="switch-edit-plan-active"
                                  />
                                  <Label>Active</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={editingPlan.isPopular}
                                    onCheckedChange={(v) => setEditingPlan({ ...editingPlan, isPopular: v })}
                                    data-testid="switch-edit-plan-popular"
                                  />
                                  <Label>Mark as Popular</Label>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
                            <Button 
                              onClick={() => editingPlan && updatePlanMutation.mutate(editingPlan)} 
                              disabled={updatePlanMutation.isPending}
                              data-testid="button-submit-edit-plan"
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${plan.name}"?`)) {
                            deletePlanMutation.mutate(plan.id);
                          }
                        }}
                        data-testid={`button-delete-plan-${plan.slug}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="provider" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Provider Configuration</CardTitle>
                <CardDescription>
                  Select and configure your preferred payment gateway. API keys are stored securely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Active Payment Provider</Label>
                    <Select 
                      value={paymentSettings.paymentProvider} 
                      onValueChange={(v) => setPaymentSettings({ ...paymentSettings, paymentProvider: v })}
                    >
                      <SelectTrigger data-testid="select-payment-provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Disable Payments)</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={paymentSettings.enableTestMode}
                        onCheckedChange={(v) => setPaymentSettings({ ...paymentSettings, enableTestMode: v })}
                        data-testid="switch-test-mode"
                      />
                      <Label>Test Mode</Label>
                    </div>
                    <Badge variant={paymentSettings.enableTestMode ? "secondary" : "default"}>
                      {paymentSettings.enableTestMode ? "Test Mode" : "Live Mode"}
                    </Badge>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSecrets(!showSecrets)}
                    data-testid="button-toggle-secrets"
                  >
                    {showSecrets ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showSecrets ? "Hide" : "Show"} API Keys
                  </Button>
                </div>

                {paymentSettings.paymentProvider === "stripe" && (
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Stripe Configuration
                    </h3>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Get your API keys from the{" "}
                        <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener" className="underline">
                          Stripe Dashboard
                        </a>
                      </AlertDescription>
                    </Alert>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Publishable Key</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.stripePublishableKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublishableKey: e.target.value })}
                          placeholder="pk_test_..."
                          data-testid="input-stripe-publishable-key"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Secret Key</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                          placeholder="sk_test_..."
                          data-testid="input-stripe-secret-key"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Webhook Secret</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.stripeWebhookSecret}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeWebhookSecret: e.target.value })}
                          placeholder="whsec_..."
                          data-testid="input-stripe-webhook-secret"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentSettings.paymentProvider === "razorpay" && (
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Razorpay Configuration
                    </h3>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Get your API keys from the{" "}
                        <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noopener" className="underline">
                          Razorpay Dashboard
                        </a>
                      </AlertDescription>
                    </Alert>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Key ID</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.razorpayKeyId}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                          placeholder="rzp_test_..."
                          data-testid="input-razorpay-key-id"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Key Secret</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.razorpayKeySecret}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                          placeholder="..."
                          data-testid="input-razorpay-key-secret"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Webhook Secret</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={paymentSettings.razorpayWebhookSecret}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayWebhookSecret: e.target.value })}
                          placeholder="..."
                          data-testid="input-razorpay-webhook-secret"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentSettings.paymentProvider === "none" && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Payment processing is disabled. Users will not be able to subscribe to paid plans.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
