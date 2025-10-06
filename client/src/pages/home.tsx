import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sparkles, CheckCircle, TrendingUp, Users, Package, Star } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Category, ProductWithDetails } from "@shared/schema";

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts, isLoading: productsLoading } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products/featured"],
  });

  const testimonials = [
    {
      rating: 5,
      text: "BeSa mi ha permesso di trovare fornitori affidabili per il mio ristorante. La qualità dei prodotti è eccellente e i prezzi competitivi.",
      author: "Marco Rossi",
      role: "Proprietario Ristorante",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      rating: 5,
      text: "Come dentista, ho trovato su BeSa attrezzature professionali di altissimo livello. Il servizio clienti è impeccabile.",
      author: "Dott.ssa Laura Bianchi",
      role: "Odontoiatra",
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      rating: 5,
      text: "Piattaforma intuitiva e completa. Ho trovato tutto ciò di cui avevo bisogno per rinnovare il mio negozio in un unico posto.",
      author: "Giuseppe Verdi",
      role: "Titolare Negozio",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-white to-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-primary text-sm font-semibold" data-testid="hero-badge">Il Marketplace che Connette</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Scopri i Migliori <span className="text-primary">Servizi</span> e <span className="text-primary">Prodotti</span> per la Tua Attività
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="hero-description">
                BeSa è la piattaforma innovativa che mette in contatto fornitori e clienti di qualità. 
                Trova soluzioni professionali per ristorazione, dentistica e molto altro in un unico posto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary px-8 py-4 rounded-lg font-semibold text-base shadow-lg" data-testid="hero-explore-button">
                  <Link href="/marketplace">Esplora il Marketplace</Link>
                </Button>
                <Button asChild variant="outline" className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-base hover:bg-secondary transition-colors" data-testid="hero-supplier-button">
                  <Link href="/suppliers">Diventa Fornitore</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div data-testid="stat-providers">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Fornitori Attivi</div>
                </div>
                <div data-testid="stat-categories">
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground mt-1">Categorie</div>
                </div>
                <div data-testid="stat-products">
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-muted-foreground mt-1">Prodotti/Servizi</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:block">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900" 
                alt="Professional workspace" 
                className="rounded-2xl shadow-2xl w-full object-cover"
                data-testid="hero-image"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground" data-testid="hero-card-title">Verifica Qualità</div>
                    <div className="text-xs text-muted-foreground" data-testid="hero-card-subtitle">Tutti i fornitori certificati</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="categories-title">Esplora per Categoria</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="categories-description">
              Trova esattamente ciò di cui hai bisogno navigando tra le nostre categorie specializzate
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="categories-grid">
              {categories?.slice(0, 8).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

        {/* Featured Products Section */}
        <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="featured-title">Prodotti in Evidenza</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="featured-description">
              Scopri le migliori offerte selezionate per te dai fornitori certificati
            </p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border animate-pulse h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="featured-products-grid">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild className="btn-primary px-8 py-4 rounded-lg font-semibold" data-testid="view-all-products-button">
              <Link href="/marketplace">Vedi Tutti i Prodotti</Link>
            </Button>
          </div>
        </div>
      </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="how-it-works-title">Come Funziona BeSa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="how-it-works-description">
              Un processo semplice e intuitivo per trovare i migliori fornitori e prodotti per la tua attività
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center" data-testid="step-1">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Registrati</h3>
              <p className="text-muted-foreground">
                Crea il tuo account gratuito in pochi minuti. Nessun costo iniziale.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center" data-testid="step-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Cerca</h3>
              <p className="text-muted-foreground">
                Utilizza i nostri filtri avanzati per trovare esattamente ciò che ti serve.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center" data-testid="step-3">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Confronta</h3>
              <p className="text-muted-foreground">
                Valuta prezzi, recensioni e specifiche per scegliere la soluzione migliore.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center" data-testid="step-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">4</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Acquista</h3>
              <p className="text-muted-foreground">
                Contatta direttamente il fornitore o acquista tramite link esterno sicuro.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" data-testid="cta-title">
                Pronto a Iniziare?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto" data-testid="cta-description">
                Unisciti a migliaia di professionisti che hanno già scelto BeSa per far crescere il loro business
              </p>
              <Button className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl" data-testid="cta-signup-button">
                Registrati Gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-description">
              Storie di successo da professionisti che hanno trovato le soluzioni perfette su BeSa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-border shadow-md" data-testid={`testimonial-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-500">{renderStars(testimonial.rating)}</div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`testimonial-text-${index}`}>
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                      data-testid={`testimonial-avatar-${index}`}
                    />
                    <div>
                      <div className="font-semibold text-foreground" data-testid={`testimonial-author-${index}`}>{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        <Footer />
    </div>
  );
}
