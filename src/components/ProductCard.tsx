import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  vendor: string;
}

export default function ProductCard({ title, price, image, vendor }: ProductCardProps) {
  return (
    <Card className="product-card overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-sm text-muted-foreground">{vendor}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-bold">₦{price.toLocaleString()}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}