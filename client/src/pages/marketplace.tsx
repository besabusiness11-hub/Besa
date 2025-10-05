import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Category, ProductWithDetails } from "@shared/schema";

export default function Marketplace() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [minRating, setMinRating] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevant");

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const buildFilters = () => {
    const filters: any = {};
    if (selectedCategories.length > 0) {
      // For simplicity, we'll filter by first selected category
      filters.categoryId = selectedCategories[0];
    }
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(p => p === "1000+" ? "1000" : p);
      if (min) filters.minPrice = parseInt(min);
      if (max && max !== "1000") filters.maxPrice = parseInt(max);
    }
    if (minRating) {
      filters.minRating = parseInt(minRating);
    }
    return filters;
  };

  const { data: products, isLoading } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products", selectedCategories, priceRange, minRating],
    queryFn: async () => {
      const filters = buildFilters();
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.set(key, value.toString());
      });
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-foreground mb-6" data-testid="filters-title">Filtri</h3>
      
      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Categoria</h4>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                data-testid={`filter-category-${category.slug}`}
              />
              <Label
                htmlFor={category.id}
                className="text-sm text-foreground cursor-pointer flex-1 flex justify-between items-center"
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.productCount})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Fascia di Prezzo</h4>
        <RadioGroup value={priceRange} onValueChange={setPriceRange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-100" id="price-0-100" data-testid="filter-price-0-100" />
            <Label htmlFor="price-0-100" className="text-sm text-foreground cursor-pointer">
              Meno di €100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-500" id="price-100-500" data-testid="filter-price-100-500" />
            <Label htmlFor="price-100-500" className="text-sm text-foreground cursor-pointer">
              €100 - €500
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="500-1000" id="price-500-1000" data-testid="filter-price-500-1000" />
            <Label htmlFor="price-500-1000" className="text-sm text-foreground cursor-pointer">
              €500 - €1000
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1000+" id="price-1000-plus" data-testid="filter-price-1000-plus" />
            <Label htmlFor="price-1000-plus" className="text-sm text-foreground cursor-pointer">
              Oltre €1000
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Valutazione Minima</h4>
        <RadioGroup value={minRating} onValueChange={setMinRating}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="rating-5" data-testid="filter-rating-5" />
            <Label htmlFor="rating-5" className="text-sm text-foreground cursor-pointer">
              ⭐⭐⭐⭐⭐ 5 stelle
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="rating-4" data-testid="filter-rating-4" />
            <Label htmlFor="rating-4" className="text-sm text-foreground cursor-pointer">
              ⭐⭐⭐⭐ 4+ stelle
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="rating-3" data-testid="filter-rating-3" />
            <Label htmlFor="rating-3" className="text-sm text-foreground cursor-pointer">
              ⭐⭐⭐ 3+ stelle
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="marketplace-title">
            Marketplace BeSa
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="marketplace-description">
            Scopri i migliori prodotti e servizi per la tua attività
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="lg:col-span-1 hidden lg:block">
            <Card className="border border-border sticky top-24">
              <CardContent className="p-6">
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full mb-4" data-testid="mobile-filters-trigger">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtri
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="p-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground" data-testid="results-count">
                  {products?.length || 0}
                </span> risultati
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="sort-select">
                  <SelectValue placeholder="Ordina per" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Più Rilevanti</SelectItem>
                  <SelectItem value="price-asc">Prezzo: Basso a Alto</SelectItem>
                  <SelectItem value="price-desc">Prezzo: Alto a Basso</SelectItem>
                  <SelectItem value="rating">Migliori Recensioni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border animate-pulse h-96" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg" data-testid="no-products-message">
                  Nessun prodotto trovato con i filtri selezionati.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange("");
                    setMinRating("");
                  }}
                  className="mt-4"
                  data-testid="clear-filters-button"
                >
                  Cancella Filtri
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
