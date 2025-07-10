import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AuthButton() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (isLoading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setOpen(true)}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in with Email</DialogTitle>
            </DialogHeader>
            {success ? (
              <div className="text-green-600 py-4">Check your email for a magic link!</div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setError(null);
                  setSuccess(false);
                  try {
                    const res = await fetch("/api/magic-link-request", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || "Failed to send magic link");
                    setSuccess(true);
                  } catch (err: any) {
                    setError(err.message || "Failed to send magic link");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                  disabled={loading}
                />
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <DialogFooter>
                  <Button type="submit" disabled={loading || !email}>
                    {loading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </DialogFooter>
              </form>
            )}
            <div className="pt-4 text-xs text-gray-500 text-center">
              Or <a href="/api/auth/google" className="underline">sign in with Google</a>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture || ""} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}