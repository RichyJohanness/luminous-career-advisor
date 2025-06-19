
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Users,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  category: string;
  question: string;
  type: 'radio' | 'input' | 'textarea';
  options?: { value: string; label: string; score: number }[];
  value: string;
}

const UserRecommendation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      category: 'Pendidikan',
      question: 'Apa tingkat pendidikan terakhir Anda?',
      type: 'radio',
      options: [
        { value: '1', label: 'SMA/SMK', score: 1 },
        { value: '2', label: 'D3/Diploma', score: 2 },
        { value: '3', label: 'S1/Sarjana', score: 3 },
        { value: '4', label: 'S2/Magister', score: 4 },
        { value: '5', label: 'S3/Doktor', score: 5 }
      ],
      value: ''
    },
    {
      id: 2,
      category: 'Pendidikan',
      question: 'Apa bidang studi/jurusan Anda?',
      type: 'input',
      value: ''
    },
    {
      id: 3,
      category: 'Pengalaman Kerja',
      question: 'Berapa lama total pengalaman kerja Anda?',
      type: 'radio',
      options: [
        { value: '1', label: 'Kurang dari 1 tahun', score: 1 },
        { value: '2', label: '1-2 tahun', score: 2 },
        { value: '3', label: '3-5 tahun', score: 3 },
        { value: '4', label: '6-10 tahun', score: 4 },
        { value: '5', label: 'Lebih dari 10 tahun', score: 5 }
      ],
      value: ''
    },
    {
      id: 4,
      category: 'Pengalaman Kerja',
      question: 'Ceritakan pengalaman kerja yang paling relevan:',
      type: 'textarea',
      value: ''
    },
    {
      id: 5,
      category: 'Keterampilan Teknis',
      question: 'Bagaimana tingkat kemampuan programming Anda?',
      type: 'radio',
      options: [
        { value: '1', label: 'Pemula (baru belajar)', score: 1 },
        { value: '2', label: 'Menengah (bisa membuat program sederhana)', score: 2 },
        { value: '3', label: 'Mahir (bisa membuat aplikasi kompleks)', score: 3 },
        { value: '4', label: 'Ahli (bisa mengajar dan memimpin tim)', score: 4 },
        { value: '5', label: 'Expert (diakui industri)', score: 5 }
      ],
      value: ''
    },
    {
      id: 6,
      category: 'Soft Skills',
      question: 'Bagaimana kemampuan komunikasi dan kerjasama tim Anda?',
      type: 'radio',
      options: [
        { value: '1', label: 'Perlu banyak pengembangan', score: 1 },
        { value: '2', label: 'Cukup baik', score: 2 },
        { value: '3', label: 'Baik', score: 3 },
        { value: '4', label: 'Sangat baik', score: 4 },
        { value: '5', label: 'Excellent', score: 5 }
      ],
      value: ''
    }
  ]);

  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const categories = ['Pendidikan', 'Pengalaman Kerja', 'Keterampilan Teknis', 'Soft Skills'];
  const currentCategory = categories[currentStep];
  const categoryQuestions = questions.filter(q => q.category === currentCategory);
  const progressPercentage = ((currentStep + 1) / categories.length) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, value } : q
    ));
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    // Mock recommendation generation
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

  if (showResults) {
    return (
      <div className="space-y-8">
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
          <Button variant="outline" onClick={() => {
            setShowResults(false);
            setCurrentStep(0);
            setQuestions(prev => prev.map(q => ({ ...q, value: '' })));
          }}>
            Mulai Ulang
          </Button>
          <Button className="gradient-blue">
            Simpan Hasil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Asesmen Karier</h1>
        <p className="text-muted-foreground">Jawab pertanyaan berikut untuk mendapatkan rekomendasi karier yang tepat</p>
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
              <CardDescription>Bagian {currentStep + 1} dari {categories.length}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {categoryQuestions.map((question) => (
            <div key={question.id} className="space-y-4">
              <Label className="text-base font-medium text-foreground">
                {question.question}
              </Label>
              
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={question.value}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                      <Label 
                        htmlFor={`q${question.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'input' && (
                <Input
                  value={question.value}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Masukkan jawaban Anda..."
                  className="text-foreground"
                />
              )}

              {question.type === 'textarea' && (
                <Textarea
                  value={question.value}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Ceritakan secara detail..."
                  rows={4}
                  className="text-foreground"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
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
