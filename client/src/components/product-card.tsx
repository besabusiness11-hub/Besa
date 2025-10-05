import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { ProductWithDetails } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithDetails;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-500/50 text-yellow-500" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const rating = parseFloat(product.rating || "0");

  return (
    <Card className="product-card cursor-pointer border border-border" data-testid={`product-card-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
          data-testid={`product-image-${product.id}`}
        />
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="px-2 py-1 text-xs font-semibold" data-testid={`product-category-${product.id}`}>
              {product.category.name}
            </Badge>
            <div className="flex items-center text-sm">
              <div className="flex items-center mr-1">
                {renderStars(rating)}
              </div>
              <span className="text-muted-foreground text-xs" data-testid={`product-reviews-${product.id}`}>
                ({product.reviewCount})
              </span>
            </div>
          </div>
          <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`product-description-${product.id}`}>
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-primary" data-testid={`product-price-${product.id}`}>
                €{parseFloat(product.price).toLocaleString('it-IT')}
              </div>
              <div className="text-xs text-muted-foreground">IVA inclusa</div>
            </div>
            <Button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Will navigate to product detail via Link wrapper
              }}
              data-testid={`product-details-button-${product.id}`}
            >
              Dettagli
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
