import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

export function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [video, setVideo] = useState<File | null>(null);
  const [music, setMusic] = useState<File | null>(null);
  const [musicTitle, setMusicTitle] = useState("");
  const [adPlacement, setAdPlacement] = useState("pre_roll");
  const [bidAmount, setBidAmount] = useState("");
  const { toast } = useToast();

  const handleVideoUpload = async () => {
    if (!video) {
      toast({
        title: "Error",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // Upload video
      const videoFileName = `${Date.now()}_${video.name}`;
      const { error: videoError } = await supabase.storage
        .from("product_videos")
        .upload(videoFileName, video);

      if (videoError) throw videoError;

      // Get video URL
      const { data: videoData } = await supabase.storage
        .from("product_videos")
        .getPublicUrl(videoFileName);

      let musicUrl = null;
      if (music) {
        // Upload music if provided
        const musicFileName = `${Date.now()}_${music.name}`;
        const { error: musicError } = await supabase.storage
          .from("background_music")
          .upload(musicFileName, music);

        if (musicError) throw musicError;

        const { data: musicData } = await supabase.storage
          .from("background_music")
          .getPublicUrl(musicFileName);

        musicUrl = musicData.publicUrl;
      }

      // Create video content record
      const { data: videoContent, error: dbError } = await supabase
        .from("video_content")
        .insert({
          title: video.name.split(".")[0],
          video_url: videoData.publicUrl,
          music_url: musicUrl,
          music_title: musicTitle,
          vendor_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Create promotion record for ads
      if (bidAmount && videoContent) {
        const { error: promotionError } = await supabase
          .from("vendor_promotions")
          .insert({
            vendor_id: (await supabase.auth.getUser()).data.user?.id,
            product_id: null, // This can be linked to a product if needed
            promotion_type: "video_ad",
            ad_placement_type: adPlacement,
            bid_amount: parseFloat(bidAmount),
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            status: "active",
          });

        if (promotionError) throw promotionError;
      }

      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });

      // Reset form
      setVideo(null);
      setMusic(null);
      setMusicTitle("");
      setBidAmount("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label htmlFor="video">Product Video</Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Label htmlFor="music">Background Music (Optional)</Label>
        <Input
          id="music"
          type="file"
          accept="audio/*"
          onChange={(e) => setMusic(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <Label htmlFor="musicTitle">Music Title (Optional)</Label>
        <Input
          id="musicTitle"
          value={musicTitle}
          onChange={(e) => setMusicTitle(e.target.value)}
          placeholder="Enter music title"
        />
      </div>

      <div>
        <Label htmlFor="adPlacement">Ad Placement</Label>
        <select
          id="adPlacement"
          value={adPlacement}
          onChange={(e) => setAdPlacement(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="pre_roll">Pre-Roll</option>
          <option value="mid_roll">Mid-Roll</option>
          <option value="post_roll">Post-Roll</option>
          <option value="banner">Banner</option>
          <option value="overlay">Overlay</option>
        </select>
      </div>

      <div>
        <Label htmlFor="bidAmount">Bid Amount (NGN)</Label>
        <Input
          id="bidAmount"
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
        />
      </div>

      <Button
        onClick={handleVideoUpload}
        disabled={uploading || !video}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2" />
            Upload Video
          </>
        )}
      </Button>
    </div>
  );
}