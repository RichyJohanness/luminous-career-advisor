
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCriteria {
  id: number;
  name: string;
  description: string;
  weight: number;
  category: string;
  isActive: boolean;
}

const JobCriteriaToggle = () => {
  const { jobId } = useParams();
  const [jobTitle] = useState('Software Engineer'); // Simulate job data
  
  const [criteriaList, setCriteriaList] = useState<JobCriteria[]>([
    { id: 1, name: 'Pendidikan', description: 'Tingkat pendidikan yang dibutuhkan', weight: 25, category: 'Akademik', isActive: true },
    { id: 2, name: 'Pengalaman Kerja', description: 'Lama pengalaman kerja yang relevan', weight: 30, category: 'Profesional', isActive: true },
    { id: 3, name: 'Keterampilan Teknis', description: 'Kemampuan teknis spesifik', weight: 35, category: 'Teknis', isActive: true },
    { id: 4, name: 'Soft Skills', description: 'Kemampuan interpersonal dan komunikasi', weight: 10, category: 'Personal', isActive: false },
    { id: 5, name: 'Sertifikasi', description: 'Sertifikasi profesional yang relevan', weight: 0, category: 'Akademik', isActive: false }
  ]);

  const handleToggle = (id: number) => {
    setCriteriaList(prev => prev.map(criteria => 
      criteria.id === id 
        ? { ...criteria, isActive: !criteria.isActive }
        : criteria
    ));
  };

  const handleSave = () => {
    // Simulate save functionality
    console.log('Saving criteria configuration for job:', jobId);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Akademik': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Profesional': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Teknis': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Personal': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const activeCriteria = criteriaList.filter(c => c.isActive);
  const totalActiveWeight = activeCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kriteria Pekerjaan</h1>
            <p className="text-muted-foreground">Konfigurasi kriteria untuk: <span className="font-medium text-foreground">{jobTitle}</span></p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to={`/admin/pekerjaan/${jobId}/ahp`}>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Setup AHP
            </Button>
          </Link>
          <Button onClick={handleSave} className="gradient-blue">
            <Save className="h-4 w-4 mr-2" />
            Simpan Konfigurasi
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Ringkasan Kriteria Aktif</CardTitle>
          <CardDescription>Kriteria yang akan digunakan untuk penilaian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{activeCriteria.length}</div>
              <div className="text-sm text-muted-foreground">Kriteria Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{totalActiveWeight}%</div>
              <div className="text-sm text-muted-foreground">Total Bobot</div>
            </div>
            <div className="text-center">
              <Badge 
                variant={totalActiveWeight === 100 ? 'default' : 'destructive'}
                className={totalActiveWeight === 100 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                }
              >
                {totalActiveWeight === 100 ? 'Konfigurasi Valid' : 'Perlu Penyesuaian'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria List */}
      <div className="grid gap-6">
        <h2 className="text-xl font-semibold text-foreground">Daftar Kriteria</h2>
        
        {criteriaList.map((criteria) => (
          <Card key={criteria.id} className={`bg-card/50 border-border transition-all ${
            criteria.isActive ? 'ring-2 ring-blue-500/20' : 'opacity-75'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${criteria.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {criteria.name}
                    </h3>
                    <Badge className={getCategoryColor(criteria.category)}>
                      {criteria.category}
                    </Badge>
                    {criteria.isActive && (
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {criteria.weight}%
                      </Badge>
                    )}
                  </div>
                  <p className={`${criteria.isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {criteria.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 ml-6">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`criteria-${criteria.id}`} className="sr-only">
                      Toggle {criteria.name}
                    </Label>
                    <Switch
                      id={`criteria-${criteria.id}`}
                      checked={criteria.isActive}
                      onCheckedChange={() => handleToggle(criteria.id)}
                    />
                    <span className={`text-sm ${criteria.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {criteria.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h3 className="font-semibold text-foreground">Langkah Selanjutnya</h3>
              <p className="text-sm text-muted-foreground">
                Setelah mengkonfigurasi kriteria, lanjutkan ke setup AHP atau Profile Matching
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to={`/admin/pekerjaan/${jobId}/ahp`}>
                <Button variant="outline">
                  Setup AHP
                </Button>
              </Link>
              <Link to={`/admin/pekerjaan/${jobId}/pm`}>
                <Button variant="outline">
                  Setup Profile Matching
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCriteriaToggle;
