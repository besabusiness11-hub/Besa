import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Star, ExternalLink, ArrowLeft, Shield, Truck, HeartHandshake, Award, User } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ProductWithDetails } from "@shared/schema";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const productReviews: Record<string, Review[]> = {
  "prod-1": [
    {
      id: "rev-1",
      author: "Marco Rossi",
      rating: 5,
      date: "15 Settembre 2024",
      comment: "Macchina eccezionale! La usiamo nel nostro bar da 3 mesi e non ha mai avuto problemi. Il caffè è sempre perfetto e i clienti lo apprezzano molto. Ottimo investimento.",
      verified: true
    },
    {
      id: "rev-2",
      author: "Laura Bianchi",
      rating: 4,
      date: "8 Settembre 2024",
      comment: "Buona macchina professionale, fa un ottimo espresso. L'unico piccolo difetto è che ci mette un po' a scaldarsi la mattina, ma per il resto è perfetta.",
      verified: true
    },
    {
      id: "rev-3",
      author: "Giuseppe Verdi",
      rating: 5,
      date: "1 Settembre 2024",
      comment: "Qualità costruttiva eccellente, in acciaio inox molto solido. Il controllo temperatura è preciso e permette di ottenere sempre risultati costanti. Consigliata!",
      verified: false
    }
  ],
  "prod-2": [
    {
      id: "rev-4",
      author: "Dott.ssa Elena Ferrari",
      rating: 5,
      date: "20 Settembre 2024",
      comment: "Poltrona odontoiatrica di altissima qualità. I pazienti la trovano molto comoda e il sistema di regolazione elettrica è fluido e silenzioso. Ottimo acquisto per il mio studio.",
      verified: true
    },
    {
      id: "rev-5",
      author: "Dott. Paolo Russo",
      rating: 5,
      date: "12 Settembre 2024",
      comment: "Design moderno e funzionale. I materiali antimicrobici sono un grande plus per l'igiene. La consiglio a tutti i colleghi che vogliono rinnovare lo studio.",
      verified: true
    }
  ],
  "prod-3": [
    {
      id: "rev-6",
      author: "Andrea Colombo",
      rating: 4,
      date: "25 Settembre 2024",
      comment: "Sistema POS completo e facile da usare. Il software è intuitivo e il supporto clienti è stato molto disponibile durante l'installazione. Unica nota: la stampante è un po' rumorosa.",
      verified: true
    },
    {
      id: "rev-7",
      author: "Silvia Martini",
      rating: 5,
      date: "18 Settembre 2024",
      comment: "Perfetto per il mio negozio di abbigliamento. Gestisco facilmente inventario, vendite e clienti tutto da un unico sistema. Ottimo rapporto qualità-prezzo!",
      verified: true
    }
  ]
};

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id;

  const { data: product, isLoading: productLoading } = useQuery<ProductWithDetails>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      if (!productId) throw new Error("No product ID");
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: relatedProducts } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products", "related", product?.categoryId],
    queryFn: async () => {
      if (!product) return [];
      const response = await fetch(`/api/products?categoryId=${product.categoryId}`);
      if (!response.ok) return [];
      const allProducts = await response.json();
      return allProducts.filter((p: ProductWithDetails) => p.id !== product.id).slice(0, 3);
    },
    enabled: !!product,
  });

  const renderStars = (rating: number, size: string = "w-5 h-5") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={`${size} fill-yellow-500 text-yellow-500`} />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className={`${size} fill-yellow-500/50 text-yellow-500`} />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${size} text-gray-300`} />);
    }

    return stars;
  };

  const reviews = product ? (productReviews[product.id] || []) : [];

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
                <div className="h-16 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="product-not-found-title">
              Prodotto non trovato
            </h1>
            <p className="text-muted-foreground mb-8">Il prodotto che stai cercando non esiste o non è più disponibile.</p>
            <Button asChild data-testid="back-to-marketplace-button">
              <Link href="/marketplace">Torna al Marketplace</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rating = parseFloat(product.rating || "0");
  const price = parseFloat(product.price);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/marketplace" className="hover:text-primary transition-colors" data-testid="breadcrumb-marketplace">
            Marketplace
          </Link>
          <span>/</span>
          <Link href={`/categories/${product.category.slug}`} className="hover:text-primary transition-colors" data-testid="breadcrumb-category">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground" data-testid="breadcrumb-product">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6 -ml-4" data-testid="back-button">
          <Link href="/marketplace">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna ai prodotti
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              data-testid="product-image"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-3" data-testid="product-category-badge">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="product-title">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center" data-testid="product-rating">
                  {renderStars(rating)}
                </div>
                <span className="text-sm text-muted-foreground" data-testid="product-rating-text">
                  {rating.toFixed(1)} ({product.reviewCount} recensioni)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-1" data-testid="product-price">
                  €{price.toLocaleString('it-IT')}
                </div>
                <div className="text-sm text-muted-foreground">IVA inclusa</div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">Descrizione</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              {/* Supplier Info */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <HeartHandshake className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground" data-testid="supplier-name">
                        {product.supplier.companyName || product.supplier.username}
                      </div>
                      <div className="text-sm text-muted-foreground">Fornitore verificato</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {product.externalUrl && (
                  <Button asChild className="btn-primary px-8 py-4 flex-1" data-testid="external-buy-button">
                    <a href={product.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acquista Ora
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="px-8 py-4 flex-1" data-testid="contact-supplier-button">
                  Contatta Fornitore
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Qualità Garantita</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4 text-success" />
                  <span>Spedizione Rapida</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <HeartHandshake className="w-4 h-4 text-success" />
                  <span>Fornitore Certificato</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-success" />
                  <span>Assistenza Professionale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8" data-testid="related-products-title">
              Prodotti Correlati
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
