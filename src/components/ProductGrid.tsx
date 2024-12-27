import ProductCard from "./ProductCard";

// Sample product data
const products = [
  {
    id: 1,
    title: "Handwoven Basket",
    price: 15000,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    vendor: "Kano Crafts"
  },
  {
    id: 2,
    title: "Traditional Jewelry Set",
    price: 45000,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    vendor: "Zaria Artisans"
  },
  {
    id: 3,
    title: "Leather Sandals",
    price: 12000,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    vendor: "Sokoto Leather"
  },
  {
    id: 4,
    title: "Spice Collection",
    price: 8000,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    vendor: "Northern Spices"
  }
];

export default function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}