import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { VideoUpload } from "@/components/VideoUpload";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Star, Sparkles, Gift } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Fetch featured video content
const fetchFeaturedVideo = async () => {
  console.log("Fetching featured video...");
  const { data, error } = await supabase
    .from('video_content')
    .select()
    .order('views_count', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching featured video:", error);
    throw error;
  }
  console.log("Featured video data:", data);
  return data;
};

// Fetch sponsored brand campaign
const fetchSponsoredCampaign = async () => {
  console.log("Fetching sponsored campaign...");
  const { data, error } = await supabase
    .from('brand_campaigns')
    .select()
    .eq('status', 'active')
    .order('budget', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  if (error) {
    console.error("Error fetching sponsored campaign:", error);
    throw error;
  }
  console.log("Sponsored campaign data:", data);
  return data;
};

export default function Index() {
  const { user } = useAuthContext();
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const { data: featuredVideo, isError: isVideoError } = useQuery({
    queryKey: ['featuredVideo'],
    queryFn: fetchFeaturedVideo,
  });

  const { data: sponsoredCampaign, isError: isCampaignError } = useQuery({
    queryKey: ['sponsoredCampaign'],
    queryFn: fetchSponsoredCampaign,
  });

  useEffect(() => {
    // Trigger video visibility after a delay
    const timer = setTimeout(() => setIsVideoVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Background Video */}
        <div className="relative h-[70vh] mb-12 rounded-xl overflow-hidden">
          {featuredVideo && featuredVideo.video_url && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoVisible ? 'opacity-100' : 'opacity-0'
              }`}
              src={featuredVideo.video_url}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Discover Northern Nigeria's Finest
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl animate-fade-in delay-200">
              Shop authentic products from local artisans and vendors
            </p>
            <div className="flex gap-4 animate-fade-in delay-300">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Sponsored Brand Campaign */}
        {sponsoredCampaign && (
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-[#FFA99F] to-[#FF719A] text-white animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-6 w-6 animate-pulse" />
              <span className="text-sm font-semibold">SPONSORED</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{sponsoredCampaign.campaign_title}</h3>
                <p className="text-white/90 mb-4">{sponsoredCampaign.description}</p>
                <Button 
                  className="bg-white text-[#FF719A] hover:bg-white/90"
                  onClick={() => window.open('#', '_blank')}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-12 w-12 animate-pulse text-yellow-300" />
              </div>
            </div>
          </div>
        )}

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