import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="category-card cursor-pointer border border-border overflow-hidden" data-testid={`category-card-${category.slug}`}>
      <Link href={`/categories/${category.slug}`}>
        <img
          src={category.imageUrl || ''}
          alt={category.name}
          className="w-full h-48 object-cover"
          data-testid={`category-image-${category.slug}`}
        />
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-foreground" data-testid={`category-name-${category.slug}`}>
              {category.name}
            </h3>
            <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold" data-testid={`category-count-${category.slug}`}>
              {category.productCount}+
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4" data-testid={`category-description-${category.slug}`}>
            {category.description}
          </p>
          <div className="flex items-center text-primary font-medium text-sm">
            <span>Scopri di più</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
