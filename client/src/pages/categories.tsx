import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import type { Category, ProductWithDetails } from "@shared/schema";

export default function Categories() {
  const params = useParams();
  const categorySlug = params.slug;

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: selectedCategory } = useQuery<Category>({
    queryKey: ["/api/categories", categorySlug],
    queryFn: async () => {
      if (!categorySlug) throw new Error("No category slug");
      const response = await fetch(`/api/categories/${categorySlug}`);
      if (!response.ok) throw new Error("Category not found");
      return response.json();
    },
    enabled: !!categorySlug,
  });

  const { data: categoryProducts, isLoading: productsLoading } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products", "category", selectedCategory?.id],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const response = await fetch(`/api/products?categoryId=${selectedCategory.id}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
    enabled: !!selectedCategory,
  });

  // Show all categories if no specific category is selected
  if (!categorySlug) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="categories-page-title">
              Tutte le Categorie
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="categories-page-description">
              Esplora le nostre categorie specializzate per trovare ciò che ti serve
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="all-categories-grid">
              {categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  // Show specific category with its products
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory && (
          <>
            {/* Category Header */}
            <div className="mb-12">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/20 p-8 lg:p-12">
                <div className="relative z-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="category-title">
                    {selectedCategory.name}
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-3xl" data-testid="category-description">
                    {selectedCategory.description}
                  </p>
                  <div className="mt-6 inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                    <span className="text-primary font-semibold" data-testid="category-product-count">
                      {selectedCategory.productCount}+ prodotti disponibili
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="category-products-title">
                Prodotti in {selectedCategory.name}
              </h2>

              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl border animate-pulse h-96" />
                  ))}
                </div>
              ) : categoryProducts && categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="category-products-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12" data-testid="no-products-in-category">
                  <p className="text-muted-foreground text-lg">
                    Al momento non ci sono prodotti disponibili in questa categoria.
                  </p>
                </div>
              )}
            </div>

            {/* Other Categories */}
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="other-categories-title">
                Altre Categorie
              </h2>
              
              {categoriesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card rounded-xl border animate-pulse h-80" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="other-categories-grid">
                  {categories
                    ?.filter(cat => cat.id !== selectedCategory.id)
                    ?.slice(0, 4)
                    .map((category) => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
