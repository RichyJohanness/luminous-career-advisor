
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Calculator, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AHPComparison {
  criteria1: string;
  criteria2: string;
  value: number;
  importance: string;
}

const AHPSetup = () => {
  const { jobId } = useParams();
  const [jobTitle] = useState('Software Engineer');
  
  const criteria = [
    { name: 'Pendidikan', weight: 0 },
    { name: 'Pengalaman Kerja', weight: 0 },
    { name: 'Keterampilan Teknis', weight: 0 }
  ];

  const [comparisons, setComparisons] = useState<AHPComparison[]>([
    { criteria1: 'Pendidikan', criteria2: 'Pengalaman Kerja', value: 1, importance: 'Sama penting' },
    { criteria1: 'Pendidikan', criteria2: 'Keterampilan Teknis', value: 1, importance: 'Sama penting' },
    { criteria1: 'Pengalaman Kerja', criteria2: 'Keterampilan Teknis', value: 1, importance: 'Sama penting' }
  ]);

  const [calculatedWeights, setCalculatedWeights] = useState<{ [key: string]: number }>({});
  const [consistencyRatio, setConsistencyRatio] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const importanceScale = [
    { value: 1, label: 'Sama penting', description: '1' },
    { value: 3, label: 'Sedikit lebih penting', description: '3' },
    { value: 5, label: 'Lebih penting', description: '5' },
    { value: 7, label: 'Sangat lebih penting', description: '7' },
    { value: 9, label: 'Mutlak lebih penting', description: '9' }
  ];

  const handleComparisonChange = (index: number, value: number) => {
    const newComparisons = [...comparisons];
    newComparisons[index].value = value;
    newComparisons[index].importance = importanceScale.find(s => s.value === value)?.label || 'Sama penting';
    setComparisons(newComparisons);
    setIsCalculated(false);
  };

  const calculateAHP = () => {
    // Simplified AHP calculation (in real implementation, this would be more complex)
    const mockWeights = {
      'Pendidikan': 0.25,
      'Pengalaman Kerja': 0.35,
      'Keteramp ilan Teknis': 0.40
    };
    const mockConsistencyRatio = 0.08; // Should be < 0.1 for valid AHP

    setCalculatedWeights(mockWeights);
    setConsistencyRatio(mockConsistencyRatio);
    setIsCalculated(true);
  };

  const handleSave = () => {
    if (!isCalculated) {
      alert('Please calculate AHP weights first');
      return;
    }
    console.log('Saving AHP configuration for job:', jobId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/admin/pekerjaan/${jobId}/kriteria`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Setup AHP</h1>
            <p className="text-muted-foreground">Konfigurasi Analytical Hierarchy Process untuk: <span className="font-medium text-foreground">{jobTitle}</span></p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button onClick={calculateAHP} variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Hitung Bobot
          </Button>
          <Button onClick={handleSave} className="gradient-blue" disabled={!isCalculated}>
            <Save className="h-4 w-4 mr-2" />
            Simpan AHP
          </Button>
        </div>
      </div>

      {/* AHP Theory Info */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Tentang AHP</CardTitle>
          <CardDescription>
            Analytical Hierarchy Process adalah metode pengambilan keputusan multi-kriteria yang menggunakan perbandingan berpasangan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Skala Kepentingan</h4>
              <div className="space-y-2">
                {importanceScale.map((scale) => (
                  <div key={scale.value} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{scale.description}</span>
                    <span className="text-foreground">{scale.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Consistency Ratio</h4>
              <p className="text-sm text-muted-foreground mb-2">
                CR harus &lt; 0.1 untuk memastikan konsistensi penilaian
              </p>
              {isCalculated && (
                <Badge 
                  variant={consistencyRatio < 0.1 ? 'default' : 'destructive'}
                  className={consistencyRatio < 0.1 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }
                >
                  CR: {consistencyRatio.toFixed(3)} {consistencyRatio < 0.1 ? '✓ Konsisten' : '✗ Tidak Konsisten'}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pairwise Comparisons */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Perbandingan Berpasangan</CardTitle>
          <CardDescription>Bandingkan kepentingan antar kriteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {comparisons.map((comparison, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {comparison.criteria1}
                  </Badge>
                  <span className="text-muted-foreground">vs</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {comparison.criteria2}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Saat ini: {comparison.importance}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Mana yang lebih penting?
                </Label>
                <Select 
                  value={comparison.value.toString()} 
                  onValueChange={(value) => handleComparisonChange(index, parseInt(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {importanceScale.map((scale) => (
                      <SelectItem key={scale.value} value={scale.value.toString()}>
                        {scale.description} - {scale.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Results */}
      {isCalculated && (
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Hasil Perhitungan AHP
            </CardTitle>
            <CardDescription>Bobot kriteria berdasarkan perbandingan berpasangan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Bobot Kriteria</h4>
                <div className="space-y-3">
                  {Object.entries(calculatedWeights).map(([criteria, weight]) => (
                    <div key={criteria} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-foreground">{criteria}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full gradient-blue"
                            style={{ width: `${weight * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {(weight * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Validasi</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Consistency Ratio</span>
                      <Badge 
                        variant={consistencyRatio < 0.1 ? 'default' : 'destructive'}
                        className={consistencyRatio < 0.1 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        {consistencyRatio.toFixed(3)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status Konsistensi</span>
                      <Badge 
                        variant={consistencyRatio < 0.1 ? 'default' : 'destructive'}
                        className={consistencyRatio < 0.1 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        {consistencyRatio < 0.1 ? 'Konsisten' : 'Tidak Konsisten'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AHPSetup;
