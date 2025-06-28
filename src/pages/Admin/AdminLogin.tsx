
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Static credentials
    if (username === 'admin' && password === '123') {
      localStorage.setItem('adminAuth', 'true');
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di Panel Admin",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 border-border backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full gradient-blue flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-foreground">Panel Admin</CardTitle>
          <CardDescription>Masukkan kredensial untuk mengakses</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full gradient-blue" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Kredensial Demo:</strong><br />
              Username: admin<br />
              Password: 123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
