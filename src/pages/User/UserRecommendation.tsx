
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Target, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Users,
  ChevronRight,
  Star,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  category: string;
  question: string;
  type: 'radio' | 'input';
  value: string;
}

interface UserProfile {
  name: string;
  age: string;
  education: string;
  major: string;
  experience: string;
}

const UserRecommendation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    age: '',
    education: '',
    major: '',
    experience: ''
  });
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load saved data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedQuestions = localStorage.getItem('userQuestions');
    const savedStep = localStorage.getItem('currentStep');
    const savedResults = localStorage.getItem('userRecommendations');

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setShowProfileForm(false);
    }

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      generateQuestions();
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedResults) {
      setRecommendations(JSON.parse(savedResults));
      setShowResults(true);
    }
  }, []);

  const generateQuestions = () => {
    const categories = ['Pendidikan', 'Pengalaman Kerja', 'Keterampilan Teknis', 'Soft Skills'];
    const newQuestions: Question[] = [];

    categories.forEach((category, categoryIndex) => {
      for (let i = 1; i <= 10; i++) {
        newQuestions.push({
          id: categoryIndex * 10 + i,
          category,
          question: `${category} - Pertanyaan ${i}: Bagaimana tingkat kemampuan Anda dalam aspek ini?`,
          type: 'radio',
          value: ''
        });
      }
    });

    setQuestions(newQuestions);
  };

  const categories = ['Pendidikan', 'Pengalaman Kerja', 'Keterampilan Teknis', 'Soft Skills'];
  const currentCategory = categories[currentStep];
  const categoryQuestions = questions.filter(q => q.category === currentCategory);
  const progressPercentage = ((currentStep + 1) / categories.length) * 100;

  const handleProfileSave = () => {
    if (userProfile.name && userProfile.age && userProfile.education && userProfile.major && userProfile.experience) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      setShowProfileForm(false);
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, value } : q
    );
    setQuestions(updatedQuestions);
    localStorage.setItem('userQuestions', JSON.stringify(updatedQuestions));
  };

  const handleNext = () => {
    localStorage.setItem('currentStep', (currentStep + 1).toString());
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handlePrevious = () => {
    const newStep = currentStep - 1;
    localStorage.setItem('currentStep', newStep.toString());
    setCurrentStep(newStep);
  };

  const generateRecommendations = () => {
    const mockRecommendations = [
      {
        id: 1,
        title: 'Software Engineer',
        match: 95,
        description: 'Cocok dengan latar belakang pendidikan dan pengalaman Anda',
        requirements: ['S1 Teknik Informatika', '2+ tahun pengalaman', 'Programming skills'],
        salary: 'Rp 8,000,000 - 15,000,000'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        match: 88,
        description: 'Sesuai dengan kemampuan teknis dan minat Anda',
        requirements: ['HTML/CSS/JavaScript', 'React/Vue experience', 'UI/UX understanding'],
        salary: 'Rp 6,000,000 - 12,000,000'
      },
      {
        id: 3,
        title: 'Product Manager',
        match: 76,
        description: 'Cocok dengan soft skills dan pengalaman leadership',
        requirements: ['Business analysis', 'Team leadership', 'Product strategy'],
        salary: 'Rp 10,000,000 - 20,000,000'
      }
    ];
    
    setRecommendations(mockRecommendations as any);
    localStorage.setItem('userRecommendations', JSON.stringify(mockRecommendations));
    setShowResults(true);
  };

  const canProceed = () => {
    return categoryQuestions.every(q => q.value.trim() !== '');
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'Pendidikan': <GraduationCap className="h-5 w-5" />,
      'Pengalaman Kerja': <Briefcase className="h-5 w-5" />,
      'Keterampilan Teknis': <Code className="h-5 w-5" />,
      'Soft Skills': <Users className="h-5 w-5" />
    };
    return icons[category] || <Target className="h-5 w-5" />;
  };

  const resetAssessment = () => {
    localStorage.removeItem('userQuestions');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('userRecommendations');
    setShowResults(false);
    setCurrentStep(0);
    generateQuestions();
  };

  if (showProfileForm) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Informasi Pribadi</h1>
          <p className="text-muted-foreground">Lengkapi profil Anda untuk rekomendasi yang lebih akurat</p>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <User className="h-5 w-5 mr-2" />
              Data Pribadi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Usia</Label>
                <Input
                  id="age"
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Masukkan usia"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Pendidikan Terakhir</Label>
              <Input
                id="education"
                value={userProfile.education}
                onChange={(e) => setUserProfile(prev => ({ ...prev, education: e.target.value }))}
                placeholder="Contoh: S1, S2, D3, SMA, dll"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Jurusan/Bidang Studi</Label>
              <Input
                id="major"
                value={userProfile.major}
                onChange={(e) => setUserProfile(prev => ({ ...prev, major: e.target.value }))}
                placeholder="Contoh: Teknik Informatika, Ekonomi, dll"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Pengalaman Kerja</Label>
              <Input
                id="experience"
                value={userProfile.experience}
                onChange={(e) => setUserProfile(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Contoh: 2 tahun sebagai developer, Fresh graduate, dll"
              />
            </div>
            <Button 
              onClick={handleProfileSave}
              className="w-full gradient-blue"
              disabled={!userProfile.name || !userProfile.age || !userProfile.education || !userProfile.major || !userProfile.experience}
            >
              Lanjutkan ke Asesmen
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* User Profile Summary */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profil Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Nama:</span>
                <p className="font-medium text-foreground">{userProfile.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Usia:</span>
                <p className="font-medium text-foreground">{userProfile.age} tahun</p>
              </div>
              <div>
                <span className="text-muted-foreground">Pendidikan:</span>
                <p className="font-medium text-foreground">{userProfile.education}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Jurusan:</span>
                <p className="font-medium text-foreground">{userProfile.major}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Pengalaman:</span>
                <p className="font-medium text-foreground">{userProfile.experience}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rekomendasi Karier Anda</h1>
          <p className="text-muted-foreground">Berdasarkan profil dan kemampuan yang Anda miliki</p>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {recommendations.map((rec: any, index) => (
            <Card key={rec.id} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg gradient-blue flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{rec.title}</h3>
                      <p className="text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-2xl font-bold text-foreground">{rec.match}%</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={rec.match >= 90 
                        ? 'text-green-400 border-green-400' 
                        : rec.match >= 80 
                        ? 'text-blue-400 border-blue-400'
                        : 'text-yellow-400 border-yellow-400'
                      }
                    >
                      {rec.match >= 90 ? 'Sangat Cocok' : rec.match >= 80 ? 'Cocok' : 'Cukup Cocok'}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Persyaratan Utama:</h4>
                    <ul className="space-y-1">
                      {rec.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Estimasi Gaji:</h4>
                    <p className="text-lg font-semibold text-blue-400">{rec.salary}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-muted-foreground">
                      Tingkat kecocokan: {rec.match}%
                    </span>
                  </div>
                  <Link to={`/user/rekomendasi/${rec.id}/detail`}>
                    <Button variant="outline" size="sm">
                      Lihat Detail
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={resetAssessment}>
            Mulai Ulang Asesmen
          </Button>
          <Button className="gradient-blue">
            Simpan Hasil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Asesmen Karier</h1>
        <p className="text-muted-foreground">Jawab semua pertanyaan untuk mendapatkan rekomendasi karier yang tepat</p>
      </div>

      {/* Progress */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">
              {currentStep + 1} dari {categories.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-4">
            {categories.map((category, index) => (
              <div key={category} className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {getCategoryIcon(category)}
                <span className="text-sm font-medium hidden sm:inline">{category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Category Questions */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {getCategoryIcon(currentCategory)}
            <div>
              <CardTitle className="text-foreground">{currentCategory}</CardTitle>
              <CardDescription>Bagian {currentStep + 1} dari {categories.length} - Jawab 10 pertanyaan berikut</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {categoryQuestions.map((question) => (
              <div key={question.id} className="space-y-4 p-4 rounded-lg bg-muted/20 border border-border">
                <Label className="text-sm font-medium text-foreground">
                  {question.question}
                </Label>
                
                <div className="space-y-3">
                  <RadioGroup
                    value={question.value}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="flex items-center justify-between gap-2"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center space-y-2">
                        <RadioGroupItem 
                          value={value.toString()} 
                          id={`q${question.id}-${value}`}
                          className="h-4 w-4"
                        />
                        <Label 
                          htmlFor={`q${question.id}-${value}`}
                          className="text-xs text-center cursor-pointer text-foreground"
                        >
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Sangat Kurang</span>
                    <span>Sangat Baik</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sebelumnya
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="gradient-blue"
        >
          {currentStep === categories.length - 1 ? 'Dapatkan Rekomendasi' : 'Selanjutnya'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default UserRecommendation;
