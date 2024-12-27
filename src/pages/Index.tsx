import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold mb-4">
            Discover Northern Nigeria's Finest
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Shop authentic products from local artisans and vendors
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>

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