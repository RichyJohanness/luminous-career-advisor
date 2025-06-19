
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import KriteriaGlobal from './pages/Admin/KriteriaGlobal';
import JobCriteriaToggle from './pages/Admin/JobCriteriaToggle';
import AHPSetup from './pages/Admin/AHPSetup';
import PMSetup from './pages/Admin/PMSetup';
import UserRecommendation from './pages/User/UserRecommendation';
import RecommendationDetail from './pages/User/RecommendationDetail';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* Homepage route */}
            <Route path="/" element={<HomePage />} />

            {/* Admin routes with Layout */}
            <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/kriteria-global" element={<Layout><KriteriaGlobal /></Layout>} />
            <Route path="/admin/pekerjaan/:jobId/kriteria" element={<Layout><JobCriteriaToggle /></Layout>} />
            <Route path="/admin/pekerjaan/:jobId/ahp" element={<Layout><AHPSetup /></Layout>} />
            <Route path="/admin/pekerjaan/:jobId/pm" element={<Layout><PMSetup /></Layout>} />

            {/* User routes with Layout */}
            <Route path="/user" element={<Layout><UserRecommendation /></Layout>} />
            <Route path="/user/rekomendasi/:jobId/detail" element={<Layout><RecommendationDetail /></Layout>} />

            {/* Fallback route */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-background text-foreground">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-400 mb-2">404 - Halaman Tidak Ditemukan</h1>
                <p className="text-muted-foreground">Silakan periksa URL atau kembali ke halaman utama</p>
              </div>
            </div>} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
