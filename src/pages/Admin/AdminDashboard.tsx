
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Briefcase, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Pengguna',
      value: '1,234',
      change: '+12%',
      icon: <Users className="h-6 w-6 text-blue-400" />,
      color: 'text-blue-400'
    },
    {
      title: 'Pekerjaan Aktif',
      value: '89',
      change: '+5%',
      icon: <Briefcase className="h-6 w-6 text-green-400" />,
      color: 'text-green-400'
    },
    {
      title: 'Rekomendasi Hari Ini',
      value: '456',
      change: '+18%',
      icon: <Target className="h-6 w-6 text-purple-400" />,
      color: 'text-purple-400'
    },
    {
      title: 'Tingkat Akurasi',
      value: '94.2%',
      change: '+2.1%',
      icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
      color: 'text-orange-400'
    }
  ];

  const recentJobs = [
    { id: 1, title: 'Software Engineer', applications: 45, status: 'Aktif' },
    { id: 2, title: 'Data Analyst', applications: 32, status: 'Aktif' },
    { id: 3, title: 'UI/UX Designer', applications: 28, status: 'Review' },
    { id: 4, title: 'Product Manager', applications: 19, status: 'Aktif' },
    { id: 5, title: 'DevOps Engineer', applications: 15, status: 'Draft' }
  ];

  const systemHealth = [
    { name: 'Server Performance', value: 98, color: 'bg-green-500' },
    { name: 'Database Health', value: 95, color: 'bg-blue-500' },
    { name: 'API Response Time', value: 88, color: 'bg-yellow-500' },
    { name: 'User Satisfaction', value: 92, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground">Kelola sistem rekomendasi karier</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/admin/kriteria-global">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Pengaturan
            </Button>
          </Link>
          <Button className="gradient-blue">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pekerjaan
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className={`${stat.color} bg-transparent border-current`}>
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">dari bulan lalu</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Pekerjaan Terbaru</CardTitle>
                <CardDescription>Daftar pekerjaan yang baru ditambahkan</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Semua
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg gradient-blue flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.applications} aplikasi</p>
                      </div>
                    </div>
                    <Badge 
                      variant={job.status === 'Aktif' ? 'default' : 'secondary'}
                      className={job.status === 'Aktif' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    >
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Kesehatan Sistem</CardTitle>
              <CardDescription>Status performa sistem secara real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {systemHealth.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-foreground font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Aksi Cepat</CardTitle>
          <CardDescription>Fungsi-fungsi yang sering digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/kriteria-global">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Kriteria Global</span>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
              <Briefcase className="h-6 w-6" />
              <span className="text-sm">Tambah Pekerjaan</span>
            </Button>
            <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Laporan</span>
            </Button>
            <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Kelola User</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
