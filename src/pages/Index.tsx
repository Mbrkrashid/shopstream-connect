import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { VideoUpload } from "@/components/VideoUpload";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { Star, Sparkles, Gift, Award, Gem, Upload } from "lucide-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { user } = useAuthContext();
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <Gem className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NorthMarket
            </h1>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: 'hsl(var(--primary))',
                  borderRadius: '0.75rem',
                },
                anchor: {
                  color: 'hsl(var(--primary))',
                },
              },
            }}
            providers={["google"]}
            redirectTo={window.location.origin}
            theme="light"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Elegant Design */}
        <div className="relative h-[70vh] mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-[#243949] to-[#517fa4]">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          <div className="relative z-10 h-full flex flex-col justify-center px-12">
            <div className="flex items-center mb-4 animate-fade-in">
              <Award className="h-10 w-10 text-white/90 mr-3" />
              <span className="text-white/80 font-semibold">Premium Quality</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
              Discover Northern Nigeria's
              <span className="block text-accent">Finest Artisans</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fade-in delay-200 leading-relaxed">
              Experience the rich heritage and exceptional craftsmanship of local artisans and vendors
            </p>
            <div className="flex gap-6 animate-fade-in delay-300">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
                Explore Collection
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 rounded-full px-8"
              >
                Meet Our Artisans
              </Button>
            </div>
          </div>
        </div>

        {/* Promotional Banner with Elegant Design */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#e6b980] to-[#eacda3] text-[#1A1F2C] animate-scale-in">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wider">FEATURED COLLECTION</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-3">Artisanal Marketplace</h3>
              <p className="text-[#403E43] mb-6 max-w-xl">
                Discover unique handcrafted pieces that tell stories of tradition and innovation
              </p>
              <Button 
                className="bg-[#1A1F2C] text-white hover:bg-[#2A2F3C] rounded-full px-6"
              >
                <Gift className="mr-2 h-4 w-4" />
                Browse Collection
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {user?.is_vendor && (
          <section className="mb-12 fade-in">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                Upload Product Video
              </h2>
              <VideoUpload />
            </div>
          </section>
        )}

        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#1A1F2C]">Featured Products</h2>
            <Button variant="link" className="text-primary hover:text-primary/80">
              View All Collections
            </Button>
          </div>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
}