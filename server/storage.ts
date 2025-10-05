import { type User, type InsertUser, type Category, type InsertCategory, type Product, type InsertProduct, type ProductWithDetails, type Newsletter, type InsertNewsletter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(filters?: { categoryId?: string; search?: string; minPrice?: number; maxPrice?: number; minRating?: number }): Promise<ProductWithDetails[]>;
  getProductById(id: string): Promise<ProductWithDetails | undefined>;
  getFeaturedProducts(limit?: number): Promise<ProductWithDetails[]>;
  getProductsByCategory(categoryId: string): Promise<ProductWithDetails[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.newsletters = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      {
        id: "cat-1",
        name: "Ristorazione",
        slug: "ristorazione",
        description: "Attrezzature, ingredienti premium, servizi per ristoranti e bar",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 320
      },
      {
        id: "cat-2",
        name: "Dentisti",
        slug: "dentisti",
        description: "Strumenti professionali, materiali dentali e tecnologie all'avanguardia",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 180
      },
      {
        id: "cat-3",
        name: "Salute e Benessere",
        slug: "salute-benessere",
        description: "Prodotti per spa, centri estetici e servizi di wellness",
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 250
      },
      {
        id: "cat-4",
        name: "Retail",
        slug: "retail",
        description: "Soluzioni per negozi, arredi, sistemi POS e gestione magazzino",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 420
      },
      {
        id: "cat-5",
        name: "Servizi Professionali",
        slug: "servizi-professionali",
        description: "Consulenze, formazione, servizi legali e amministrativi",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 290
      },
      {
        id: "cat-6",
        name: "Tecnologia",
        slug: "tecnologia",
        description: "Software, hardware, soluzioni IT e automazione per aziende",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 340
      },
      {
        id: "cat-7",
        name: "Hospitality",
        slug: "hospitality",
        description: "Forniture per hotel, B&B, biancheria e servizi di accoglienza",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 200
      },
      {
        id: "cat-8",
        name: "Altre Categorie",
        slug: "altre-categorie",
        description: "Scopri altre soluzioni per settori specializzati",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 150
      }
    ];

    categoriesData.forEach(cat => this.categories.set(cat.id, cat));

    // Seed suppliers
    const suppliersData = [
      { id: "supplier-1", username: "coffeepro", password: "pass123", email: "info@coffeepro.it", isSupplier: true, companyName: "CoffeePro Italia" },
      { id: "supplier-2", username: "dentaltech", password: "pass123", email: "sales@dentaltech.it", isSupplier: true, companyName: "DentalTech Solutions" },
      { id: "supplier-3", username: "retailsys", password: "pass123", email: "info@retailsys.it", isSupplier: true, companyName: "RetailSys Technology" },
    ];

    suppliersData.forEach(supplier => this.users.set(supplier.id, supplier));

    // Seed products
    const productsData = [
      {
        id: "prod-1",
        name: "Macchina Caffè Professionale",
        description: "Macchina per espresso commerciale a 2 gruppi, ideale per bar e ristoranti. Realizzata in acciaio inox di alta qualità con sistema di riscaldamento rapido e controllo temperatura preciso.",
        shortDescription: "Macchina per espresso commerciale, 2 gruppi, ideale per bar e ristoranti",
        price: "2450.00",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-1",
        supplierId: "supplier-1",
        rating: "4.8",
        reviewCount: 48,
        externalUrl: "https://example.com/coffee-machine",
        featured: true
      },
      {
        id: "prod-2",
        name: "Poltrona Odontoiatrica Premium",
        description: "Poltrona ergonomica con sistema di regolazione elettrica e illuminazione LED integrata. Design moderno con materiali antimicrobici e facilità di sterilizzazione.",
        shortDescription: "Poltrona ergonomica con sistema di regolazione elettrica e lighting LED",
        price: "8900.00",
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-2",
        supplierId: "supplier-2",
        rating: "4.9",
        reviewCount: 32,
        externalUrl: "https://example.com/dental-chair",
        featured: true
      },
      {
        id: "prod-3",
        name: "Sistema POS All-in-One",
        description: "Software gestionale completo con hardware incluso: tablet, stampante termica, lettore di codici a barre e terminale per carte. Ideale per negozi e ristoranti.",
        shortDescription: "Software gestionale + hardware completo con stampante e lettore carte",
        price: "1290.00",
        imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-6",
        supplierId: "supplier-3",
        rating: "4.5",
        reviewCount: 89,
        externalUrl: "https://example.com/pos-system",
        featured: true
      },
      {
        id: "prod-4",
        name: "Frigorifero Professionale 600L",
        description: "Refrigeratore verticale in acciaio inox, classe energetica A++, con sistema di sbrinamento automatico e controllo digitale della temperatura.",
        shortDescription: "Refrigeratore verticale in acciaio inox, classe energetica A++",
        price: "1850.00",
        imageUrl: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-1",
        supplierId: "supplier-1",
        rating: "4.7",
        reviewCount: 67,
        externalUrl: "https://example.com/professional-fridge",
        featured: false
      },
      {
        id: "prod-5",
        name: "Poltrona Parrucchiere Design",
        description: "Poltrona ergonomica idraulica con base cromata e rivestimento in ecopelle di alta qualità. Design moderno e funzionale per saloni professionali.",
        shortDescription: "Poltrona ergonomica idraulica con base cromata e rivestimento ecopelle",
        price: "680.00",
        imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-3",
        supplierId: "supplier-1",
        rating: "4.3",
        reviewCount: 41,
        externalUrl: "https://example.com/salon-chair",
        featured: false
      },
      {
        id: "prod-6",
        name: "Radiografo Digitale 3D",
        description: "Sistema radiografico panoramico e 3D con software di diagnostica incluso. Tecnologia all'avanguardia per studi odontoiatrici moderni.",
        shortDescription: "Sistema radiografico panoramico e 3D con software incluso",
        price: "24500.00",
        imageUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-2",
        supplierId: "supplier-2",
        rating: "4.9",
        reviewCount: 28,
        externalUrl: "https://example.com/digital-xray",
        featured: false
      }
    ];

    productsData.forEach(product => this.products.set(product.id, product));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      isSupplier: insertUser.isSupplier ?? false,
      companyName: insertUser.companyName ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description ?? null,
      imageUrl: insertCategory.imageUrl ?? null,
      productCount: insertCategory.productCount ?? 0
    };
    this.categories.set(id, category);
    return category;
  }

  async getProducts(filters?: { categoryId?: string; search?: string; minPrice?: number; maxPrice?: number; minRating?: number }): Promise<ProductWithDetails[]> {
    let products = Array.from(this.products.values());

    if (filters?.categoryId) {
      products = products.filter(p => p.categoryId === filters.categoryId);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.minPrice) {
      products = products.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
      products = products.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }

    if (filters?.minRating) {
      products = products.filter(p => parseFloat(p.rating || "0") >= filters.minRating!);
    }

    return products.map(product => ({
      ...product,
      category: this.categories.get(product.categoryId)!,
      supplier: {
        id: this.users.get(product.supplierId)!.id,
        username: this.users.get(product.supplierId)!.username,
        companyName: this.users.get(product.supplierId)!.companyName
      }
    }));
  }

  async getProductById(id: string): Promise<ProductWithDetails | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    return {
      ...product,
      category: this.categories.get(product.categoryId)!,
      supplier: {
        id: this.users.get(product.supplierId)!.id,
        username: this.users.get(product.supplierId)!.username,
        companyName: this.users.get(product.supplierId)!.companyName
      }
    };
  }

  async getFeaturedProducts(limit = 6): Promise<ProductWithDetails[]> {
    const featuredProducts = Array.from(this.products.values())
      .filter(p => p.featured)
      .slice(0, limit);

    return featuredProducts.map(product => ({
      ...product,
      category: this.categories.get(product.categoryId)!,
      supplier: {
        id: this.users.get(product.supplierId)!.id,
        username: this.users.get(product.supplierId)!.username,
        companyName: this.users.get(product.supplierId)!.companyName
      }
    }));
  }

  async getProductsByCategory(categoryId: string): Promise<ProductWithDetails[]> {
    return this.getProducts({ categoryId });
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      shortDescription: insertProduct.shortDescription ?? null,
      rating: insertProduct.rating ?? "0",
      reviewCount: insertProduct.reviewCount ?? 0,
      externalUrl: insertProduct.externalUrl ?? null,
      featured: insertProduct.featured ?? false
    };
    this.products.set(id, product);
    return product;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const existing = await this.getNewsletterByEmail(insertNewsletter.email);
    if (existing) {
      throw new Error("Email già registrata");
    }
    
    const id = randomUUID();
    const newsletter: Newsletter = {
      id,
      email: insertNewsletter.email,
      subscribedAt: insertNewsletter.subscribedAt
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email.toLowerCase() === email.toLowerCase()
    );
  }
}

export const storage = new MemStorage();
