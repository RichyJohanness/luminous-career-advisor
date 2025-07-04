
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Briefcase, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari panel admin",
    });
    navigate('/');
  };

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

  const jobList = [
    { id: 1, name: 'Software Engineer', category: 'Teknologi', status: 'Aktif' },
    { id: 2, name: 'Data Analyst', category: 'Teknologi', status: 'Aktif' },
    { id: 3, name: 'UI/UX Designer', category: 'Desain', status: 'Review' },
    { id: 4, name: 'Product Manager', category: 'Manajemen', status: 'Aktif' },
    { id: 5, name: 'DevOps Engineer', category: 'Teknologi', status: 'Draft' },
    { id: 6, name: 'Marketing Specialist', category: 'Marketing', status: 'Aktif' },
    { id: 7, name: 'Business Analyst', category: 'Bisnis', status: 'Aktif' },
    { id: 8, name: 'HR Manager', category: 'SDM', status: 'Review' },
  ];

  const systemHealth = [
    { name: 'Server Performance', value: 98, color: 'bg-green-500' },
    { name: 'Database Health', value: 95, color: 'bg-blue-500' },
    { name: 'API Response Time', value: 88, color: 'bg-yellow-500' },
    { name: 'User Satisfaction', value: 92, color: 'bg-purple-500' }
  ];

  const handleDelete = (jobId: number, jobName: string) => {
    toast({
      title: "Pekerjaan Dihapus",
      description: `${jobName} telah dihapus dari sistem`,
    });
  };

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
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
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

      {/* Job List Table */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar Pekerjaan</CardTitle>
          <CardDescription>Kelola semua pekerjaan dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead>Nama Pekerjaan</TableHead>
                <TableHead className="w-32">AHP</TableHead>
                <TableHead className="w-32">PM</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-32">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobList.map((job, index) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>
                    <Link to={`/admin/pekerjaan/${job.id}/ahp`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit AHP
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/pekerjaan/${job.id}/pm`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit PM
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/pekerjaan/${job.id}/kriteria`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        {job.category}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={job.status === 'Aktif' ? 'default' : 'secondary'}
                      className={job.status === 'Aktif' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(job.id, job.name)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* System Health */}
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

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Aksi Cepat</CardTitle>
            <CardDescription>Fungsi-fungsi yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default AdminDashboard;
