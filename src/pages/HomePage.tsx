
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Shield, BarChart3, Target, CheckCircle, Star, Zap, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'admin' | 'user' | null>(null);

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
      description: "Sistem menggunakan metode AHP dan Profile Matching untuk memberikan rekomendasi karier yang tepat"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
      title: "Analisis Mendalam",
      description: "Dashboard analitik lengkap untuk memahami pola dan tren dalam rekomendasi karier"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: "Proses Cepat",
      description: "Interface yang responsif dan intuitif untuk pengalaman pengguna yang optimal"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      title: "Data Real-time",
      description: "Pembaruan data secara real-time untuk hasil yang selalu akurat dan terkini"
    }
  ];

  const stats = [
    { number: "10K+", label: "Pengguna Aktif", icon: <Users className="h-5 w-5" /> },
    { number: "95%", label: "Tingkat Akurasi", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "500+", label: "Profesi Tersedia", icon: <Star className="h-5 w-5" /> },
    { number: "24/7", label: "Layanan Tersedia", icon: <Shield className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
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
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            Sistem Pendukung Keputusan Terdepan
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Temukan Karier
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}Impian Anda
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Platform canggih yang menggunakan metode AHP dan Profile Matching untuk memberikan 
            rekomendasi karier yang akurat dan personal sesuai dengan kemampuan dan minat Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 text-center hover:bg-slate-800/70 transition-colors">
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
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
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
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-blue-900/50 to-slate-800/50 border-blue-500/30">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Siap Menemukan Karier Ideal Anda?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah menemukan jalur karier yang tepat 
              menggunakan sistem rekomendasi kami.
            </p>
            <Button
              size="lg"
              onClick={() => handleModeSelect('user')}
              className="gradient-blue text-white hover:opacity-90"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded gradient-blue flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-semibold">SPK Rekomendasi Karier</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 Sistem Pendukung Keputusan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
