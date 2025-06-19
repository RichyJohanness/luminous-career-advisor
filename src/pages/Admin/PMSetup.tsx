
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileLevel {
  id: number;
  level: number;
  description: string;
  value: number;
}

interface CriteriaProfile {
  criteriaName: string;
  targetProfile: number;
  levels: ProfileLevel[];
}

const PMSetup = () => {
  const { jobId } = useParams();
  const [jobTitle] = useState('Software Engineer');
  
  const [criteriaProfiles, setCriteriaProfiles] = useState<CriteriaProfile[]>([
    {
      criteriaName: 'Pendidikan',
      targetProfile: 4,
      levels: [
        { id: 1, level: 1, description: 'SMA/SMK', value: 1 },
        { id: 2, level: 2, description: 'D3', value: 2 },
        { id: 3, level: 3, description: 'S1', value: 3 },
        { id: 4, level: 4, description: 'S2', value: 4 },
        { id: 5, level: 5, description: 'S3', value: 5 }
      ]
    },
    {
      criteriaName: 'Pengalaman Kerja',
      targetProfile: 3,
      levels: [
        { id: 1, level: 1, description: '< 1 tahun', value: 1 },
        { id: 2, level: 2, description: '1-2 tahun', value: 2 },
        { id: 3, level: 3, description: '3-5 tahun', value: 3 },
        { id: 4, level: 4, description: '6-10 tahun', value: 4 },
        { id: 5, level: 5, description: '> 10 tahun', value: 5 }
      ]
    },
    {
      criteriaName: 'Keterampilan Teknis',
      targetProfile: 4,
      levels: [
        { id: 1, level: 1, description: 'Pemula', value: 1 },
        { id: 2, level: 2, description: 'Menengah', value: 2 },
        { id: 3, level: 3, description: 'Mahir', value: 3 },
        { id: 4, level: 4, description: 'Ahli', value: 4 },
        { id: 5, level: 5, description: 'Expert', value: 5 }
      ]
    }
  ]);

  const handleTargetProfileChange = (criteriaIndex: number, targetProfile: number) => {
    const newProfiles = [...criteriaProfiles];
    newProfiles[criteriaIndex].targetProfile = targetProfile;
    setCriteriaProfiles(newProfiles);
  };

  const handleLevelDescriptionChange = (criteriaIndex: number, levelId: number, description: string) => {
    const newProfiles = [...criteriaProfiles];
    const levelIndex = newProfiles[criteriaIndex].levels.findIndex(l => l.id === levelId);
    if (levelIndex !== -1) {
      newProfiles[criteriaIndex].levels[levelIndex].description = description;
      setCriteriaProfiles(newProfiles);
    }
  };

  const addLevel = (criteriaIndex: number) => {
    const newProfiles = [...criteriaProfiles];
    const levels = newProfiles[criteriaIndex].levels;
    const newLevel: ProfileLevel = {
      id: Date.now(),
      level: levels.length + 1,
      description: '',
      value: levels.length + 1
    };
    newProfiles[criteriaIndex].levels.push(newLevel);
    setCriteriaProfiles(newProfiles);
  };

  const removeLevel = (criteriaIndex: number, levelId: number) => {
    const newProfiles = [...criteriaProfiles];
    newProfiles[criteriaIndex].levels = newProfiles[criteriaIndex].levels.filter(l => l.id !== levelId);
    // Reorder levels
    newProfiles[criteriaIndex].levels.forEach((level, index) => {
      level.level = index + 1;
      level.value = index + 1;
    });
    setCriteriaProfiles(newProfiles);
  };

  const handleSave = () => {
    console.log('Saving Profile Matching configuration for job:', jobId);
  };

  const getProfileColor = (level: number, targetProfile: number) => {
    if (level === targetProfile) {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    } else if (Math.abs(level - targetProfile) === 1) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    } else {
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
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
            <h1 className="text-3xl font-bold text-foreground">Setup Profile Matching</h1>
            <p className="text-muted-foreground">Konfigurasi profil target untuk: <span className="font-medium text-foreground">{jobTitle}</span></p>
          </div>
        </div>
        <Button onClick={handleSave} className="gradient-blue">
          <Save className="h-4 w-4 mr-2" />
          Simpan Profile Matching
        </Button>
      </div>

      {/* PM Theory Info */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Tentang Profile Matching</CardTitle>
          <CardDescription>
            Profile Matching adalah metode yang membandingkan profil individu dengan profil ideal pekerjaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Core Factor (CF)</h4>
              <p className="text-sm text-muted-foreground">
                Faktor utama yang harus dimiliki untuk pekerjaan tertentu
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Secondary Factor (SF)</h4>
              <p className="text-sm text-muted-foreground">
                Faktor pendukung yang dapat menambah nilai
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Gap Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Analisis selisih antara profil kandidat dengan profil ideal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criteria Profiles */}
      <div className="space-y-6">
        {criteriaProfiles.map((criteriaProfile, criteriaIndex) => (
          <Card key={criteriaIndex} className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-foreground">{criteriaProfile.criteriaName}</CardTitle>
                  <CardDescription>Konfigurasi level profil untuk kriteria ini</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Target Profile</Label>
                    <Select 
                      value={criteriaProfile.targetProfile.toString()}
                      onValueChange={(value) => handleTargetProfileChange(criteriaIndex, parseInt(value))}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {criteriaProfile.levels.map((level) => (
                          <SelectItem key={level.level} value={level.level.toString()}>
                            {level.level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Levels */}
              <div className="grid gap-4">
                {criteriaProfile.levels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                    <Badge 
                      variant="outline" 
                      className={getProfileColor(level.level, criteriaProfile.targetProfile)}
                    >
                      Level {level.level}
                    </Badge>
                    
                    <div className="flex-1">
                      <Input
                        value={level.description}
                        onChange={(e) => handleLevelDescriptionChange(criteriaIndex, level.id, e.target.value)}
                        placeholder="Deskripsi level..."
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Nilai: {level.value}</span>
                      {criteriaProfile.levels.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLevel(criteriaIndex, level.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Level Button */}
              <Button
                variant="outline"
                onClick={() => addLevel(criteriaIndex)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Level
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gap Analysis Preview */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Preview Gap Analysis</CardTitle>
          <CardDescription>Contoh perhitungan gap untuk kandidat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-foreground">Kriteria</th>
                  <th className="text-center p-3 text-foreground">Target</th>
                  <th className="text-center p-3 text-foreground">Kandidat</th>
                  <th className="text-center p-3 text-foreground">Gap</th>
                  <th className="text-center p-3 text-foreground">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {criteriaProfiles.map((profile, index) => {
                  const candidateLevel = 3; // Mock candidate level
                  const gap = candidateLevel - profile.targetProfile;
                  const gapValue = gap === 0 ? 5 : gap === 1 ? 4.5 : gap === -1 ? 4 : gap === 2 ? 3.5 : gap === -2 ? 3 : 2;

                  return (
                    <tr key={index} className="border-b border-border/50">
                      <td className="p-3 text-foreground">{profile.criteriaName}</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {profile.targetProfile}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="outline">
                          {candidateLevel}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge 
                          variant="outline"
                          className={gap === 0 
                            ? 'text-green-400 border-green-400' 
                            : Math.abs(gap) === 1 
                            ? 'text-yellow-400 border-yellow-400' 
                            : 'text-red-400 border-red-400'
                          }
                        >
                          {gap > 0 ? '+' : ''}{gap}
                        </Badge>
                      </td>
                      <td className="p-3 text-center text-foreground font-medium">
                        {gapValue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PMSetup;
