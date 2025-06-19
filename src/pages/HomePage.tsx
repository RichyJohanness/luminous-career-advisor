import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  Users, 
  Shield, 
  BarChart3, 
  Target, 
  CheckCircle, 
  Star, 
  Zap, 
  TrendingUp,
  Award,
  Brain,
  Lightbulb,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'admin' | 'user' | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleModeSelect = (mode: 'admin' | 'user') => {
    setSelectedMode(mode);
    setTimeout(() => {
      navigate(`/${mode}`);
    }, 300);
  };

  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-400" />,
      title: "Rekomendasi Akurat",
      description: "Sistem menggunakan metode AHP dan Profile Matching untuk memberikan rekomendasi karier yang tepat sesuai profil Anda"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
      title: "Analisis Mendalam",
      description: "Dashboard analitik lengkap dengan visualisasi data untuk memahami pola dan tren dalam rekomendasi karier"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: "Proses Cepat",
      description: "Interface yang responsif dan intuitif untuk pengalaman pengguna yang optimal dengan hasil dalam hitungan detik"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      title: "Data Real-time",
      description: "Pembaruan data secara real-time untuk hasil yang selalu akurat dan terkini dengan tren industri terbaru"
    }
  ];

  const stats = [
    { number: "10K+", label: "Pengguna Aktif", icon: <Users className="h-5 w-5" /> },
    { number: "95%", label: "Tingkat Akurasi", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "500+", label: "Profesi Tersedia", icon: <Star className="h-5 w-5" /> },
    { number: "24/7", label: "Layanan Tersedia", icon: <Shield className="h-5 w-5" /> }
  ];

  const testimonials = [
    {
      name: "Ahmad Rizki",
      role: "Software Engineer",
      content: "Platform ini membantu saya menemukan jalur karier yang tepat. Rekomendasi yang diberikan sangat akurat!",
      rating: 5
    },
    {
      name: "Sari Dewi",
      role: "Product Manager",
      content: "Fitur analisis yang mendalam membuat saya yakin dengan pilihan karier saya. Sangat recommended!",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Data Analyst",
      content: "Interface yang user-friendly dan hasil yang cepat. Terima kasih SPK Rekomendasi Karier!",
      rating: 5
    }
  ];

  const methodCards = [
    {
      title: "Metode AHP",
      description: "Analytical Hierarchy Process untuk pengambilan keputusan multi-kriteria",
      icon: <Brain className="h-12 w-12 text-blue-400" />,
      features: ["Analisis Hierarki", "Konsistensi Data", "Bobot Kriteria"]
    },
    {
      title: "Profile Matching",
      description: "Pencocokan profil berdasarkan kompetensi dan preferensi",
      icon: <Target className="h-12 w-12 text-blue-400" />,
      features: ["Gap Analysis", "Core Factor", "Secondary Factor"]
    },
    {
      title: "Machine Learning",
      description: "Algoritma pembelajaran mesin untuk akurasi yang lebih tinggi",
      icon: <Lightbulb className="h-12 w-12 text-blue-400" />,
      features: ["Pattern Recognition", "Predictive Analysis", "Continuous Learning"]
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg gradient-blue flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SPK Rekomendasi Karier</h1>
                <p className="text-sm text-slate-400">Sistem Pendukung Keputusan</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline" 
                onClick={() => handleModeSelect('admin')}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <Shield className="h-4 w-4 mr-2" />
                Mode Admin
              </Button>
              <Button
                onClick={() => handleModeSelect('user')}
                className="gradient-blue text-white hover:opacity-90"
              >
                <Users className="h-4 w-4 mr-2" />
                Mode User
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">
              <Award className="h-4 w-4 mr-2" />
              Sistem Pendukung Keputusan Terdepan
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Temukan Karier
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {" "}Impian Anda
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Platform revolusioner yang menggunakan teknologi AI dan metode AHP serta Profile Matching 
              untuk memberikan rekomendasi karier yang akurat dan personal sesuai dengan kemampuan, 
              minat, dan potensi unik Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => handleModeSelect('user')}
                className={`gradient-blue text-white hover:opacity-90 transition-all duration-300 transform ${
                  selectedMode === 'user' ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Mulai Sebagai User
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleModeSelect('admin')}
                className={`border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 transform ${
                  selectedMode === 'admin' ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <Shield className="h-5 w-5 mr-2" />
                Panel Admin
              </Button>
            </div>

            {/* Hero Process Steps */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-blue flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Isi Profil</h3>
                <p className="text-slate-400">Lengkapi data diri dan kemampuan Anda</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-blue flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Analisis AI</h3>
                <p className="text-slate-400">Sistem menganalisis profil dengan metode canggih</p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-blue flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Dapatkan Rekomendasi</h3>
                <p className="text-slate-400">Terima rekomendasi karier yang tepat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800/30">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Method Cards Section */}
      <section className="bg-slate-900/80">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Metode Canggih</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Menggunakan kombinasi metode terdepan untuk hasil yang akurat
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {methodCards.map((method, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 h-full">
                <CardHeader className="text-center">
                  <div className="mb-4 flex justify-center">{method.icon}</div>
                  <CardTitle className="text-white text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300">
                        <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Dilengkapi dengan teknologi terdepan untuk memberikan pengalaman terbaik
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <section className="bg-slate-900">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Testimoni Pengguna</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Dengarkan pengalaman mereka yang telah menemukan karier impiannya
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-white mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-slate-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-400' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <Progress 
                value={((currentTestimonial + 1) / testimonials.length) * 100} 
                className="h-1 bg-slate-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/50 to-slate-800/50">
        <div className="container mx-auto px-6 py-20">
          <Card className="bg-gradient-to-r from-blue-900/30 to-slate-800/30 border-blue-500/30">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <Globe className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Siap Menemukan Karier Ideal Anda?
              </h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pengguna yang telah menemukan jalur karier yang tepat 
                menggunakan sistem rekomendasi kami. Mulai perjalanan karier impian Anda hari ini!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => handleModeSelect('user')}
                  className="gradient-blue text-white hover:opacity-90"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Mulai Sekarang
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleModeSelect('admin')}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Kelola Sistem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded gradient-blue flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-semibold">SPK Rekomendasi Karier</span>
              </div>
              <p className="text-slate-400 mb-4">
                Platform terdepan untuk menemukan karier yang tepat menggunakan teknologi AI 
                dan metode ilmiah yang terpercaya.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  AHP Method
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  Profile Matching
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Rekomendasi Karier</li>
                <li>Analisis Profil</li>
                <li>Dashboard Admin</li>
                <li>Laporan Detail</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Panduan Pengguna</li>
                <li>FAQ</li>
                <li>Kontak Support</li>
                <li>Tutorial</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 SPK Rekomendasi Karier. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <span className="text-slate-500 text-sm">v2.0.1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
