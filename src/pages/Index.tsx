import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { VideoUpload } from "@/components/VideoUpload";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { Star, Sparkles, Gift } from "lucide-react";

export default function Index() {
  const { user } = useAuthContext();
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Static Background */}
        <div className="relative h-[70vh] mb-12 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Discover Northern Nigeria's Finest
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl animate-fade-in delay-200">
              Shop authentic products from local artisans and vendors
            </p>
            <div className="flex gap-4 animate-fade-in delay-300">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Static Promotional Banner */}
        <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-[#FFA99F] to-[#FF719A] text-white animate-scale-in">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 animate-pulse" />
            <span className="text-sm font-semibold">FEATURED</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Special Marketplace Offer</h3>
              <p className="text-white/90 mb-4">Discover unique products from our local artisans</p>
              <Button 
                className="bg-white text-[#FF719A] hover:bg-white/90"
              >
                <Gift className="mr-2 h-4 w-4" />
                Explore Now
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-12 w-12 animate-pulse text-yellow-300" />
            </div>
          </div>
        </div>

        {user?.is_vendor && (
          <section className="mb-12 fade-in">
            <h2 className="text-2xl font-semibold mb-4">Upload Product Video</h2>
            <VideoUpload />
          </section>
        )}

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="link">View All</Button>
          </div>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
}