
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Award,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendationDetail = () => {
  const { jobId } = useParams();

  // Mock job detail data
  const jobDetail = {
    id: jobId,
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    experience: '2-5 tahun',
    salary: 'Rp 8,000,000 - 15,000,000',
    matchPercentage: 95,
    description: 'Kami mencari Software Engineer yang berpengalaman untuk bergabung dengan tim development kami. Posisi ini menawarkan kesempatan untuk bekerja dengan teknologi terdepan dan berkontribusi pada proyek-proyek yang menarik.',
    requirements: [
      'Minimal S1 Teknik Informatika atau bidang terkait',
      'Pengalaman 2+ tahun dalam software development',
      'Menguasai JavaScript, Python, atau Java',
      'Familiar dengan framework modern (React, Vue, Angular)',
      'Pengalaman dengan database (MySQL, PostgreSQL)',
      'Kemampuan problem solving yang baik',
      'Komunikasi dan kerjasama tim yang efektif'
    ],
    benefits: [
      'Gaji kompetitif + bonus performance',
      'Asuransi kesehatan keluarga',
      'Flexible working hours',
      'Work from home option',
      'Training dan sertifikasi',
      'Career advancement opportunities'
    ],
    skills: [
      { name: 'JavaScript', level: 90, match: true },
      { name: 'React', level: 85, match: true },
      { name: 'Node.js', level: 80, match: true },
      { name: 'Python', level: 75, match: false },
      { name: 'Database', level: 70, match: true },
      { name: 'DevOps', level: 60, match: false }
    ],
    criteriaAnalysis: [
      { criteria: 'Pendidikan', required: 4, user: 4, gap: 0, score: 100 },
      { criteria: 'Pengalaman Kerja', required: 3, user: 3, gap: 0, score: 100 },
      { criteria: 'Keterampilan Teknis', required: 4, user: 4, gap: 0, score: 100 },
      { criteria: 'Soft Skills', required: 3, user: 4, gap: 1, score: 110 }
    ]
  };

  const getGapColor = (gap: number) => {
    if (gap === 0) return 'text-green-400';
    if (gap === 1) return 'text-blue-400';
    if (gap === -1) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMatchIcon = (match: boolean) => {
    return match ? (
      <CheckCircle className="h-4 w-4 text-green-400" />
    ) : (
      <AlertCircle className="h-4 w-4 text-yellow-400" />
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/user">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{jobDetail.title}</h1>
            <p className="text-muted-foreground">{jobDetail.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-2xl font-bold text-foreground">{jobDetail.matchPercentage}%</span>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Sangat Cocok
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ringkasan Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{jobDetail.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{jobDetail.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{jobDetail.experience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Kompetitif</span>
                </div>
              </div>
              <p className="text-muted-foreground">{jobDetail.description}</p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Persyaratan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobDetail.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Tunjangan & Fasilitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {jobDetail.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Match Analysis */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Analisis Kecocokan
              </CardTitle>
              <CardDescription>Perbandingan profil Anda dengan persyaratan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobDetail.criteriaAnalysis.map((criteria, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{criteria.criteria}</span>
                    <Badge variant="outline" className={getGapColor(criteria.gap)}>
                      {criteria.score}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>Target: {criteria.required}</span>
                    <span>•</span>
                    <span>Anda: {criteria.user}</span>
                    <span>•</span>
                    <span className={getGapColor(criteria.gap)}>
                      Gap: {criteria.gap > 0 ? '+' : ''}{criteria.gap}
                    </span>
                  </div>
                  <Progress value={criteria.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills Match */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Kesesuaian Skill</CardTitle>
              <CardDescription>Evaluasi keahlian teknis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobDetail.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getMatchIcon(skill.match)}
                      <span className="text-sm text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Salary Info */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Informasi Gaji
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {jobDetail.salary}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Range gaji untuk posisi ini
                </p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Kompetitif untuk level Anda
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full gradient-blue">
              Lamar Sekarang
            </Button>
            <Button variant="outline" className="w-full">
              Simpan Pekerjaan
            </Button>
            <Button variant="ghost" className="w-full">
              Bagikan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetail;
