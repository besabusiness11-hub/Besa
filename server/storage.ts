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
        productCount: 145
      },
      {
        id: "cat-2",
        name: "Dentisti",
        slug: "dentisti",
        description: "Strumenti professionali, materiali dentali e tecnologie all'avanguardia",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 82
      },
      {
        id: "cat-3",
        name: "Salute e Benessere",
        slug: "salute-benessere",
        description: "Prodotti per spa, centri estetici e servizi di wellness",
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 98
      },
      {
        id: "cat-4",
        name: "Retail",
        slug: "retail",
        description: "Soluzioni per negozi, arredi, sistemi POS e gestione magazzino",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 156
      },
      {
        id: "cat-5",
        name: "Servizi Professionali",
        slug: "servizi-professionali",
        description: "Consulenze, formazione, servizi legali e amministrativi",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 67
      },
      {
        id: "cat-6",
        name: "Tecnologia",
        slug: "tecnologia",
        description: "Software, hardware, soluzioni IT e automazione per aziende",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 124
      },
      {
        id: "cat-7",
        name: "Hospitality",
        slug: "hospitality",
        description: "Forniture per hotel, B&B, biancheria e servizi di accoglienza",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 89
      },
      {
        id: "cat-8",
        name: "Altre Categorie",
        slug: "altre-categorie",
        description: "Scopri altre soluzioni per settori specializzati",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        productCount: 89
      }
    ];

    categoriesData.forEach(cat => this.categories.set(cat.id, cat));

    // Seed suppliers
    const suppliersData = [
      { id: "supplier-1", username: "horeca_italia", password: "pass123", email: "commerciale@horecaitalia.it", isSupplier: true, companyName: "Horeca Italia S.r.l." },
      { id: "supplier-2", username: "medtech_dental", password: "pass123", email: "vendite@medtechdental.it", isSupplier: true, companyName: "MedTech Dental Equipment" },
      { id: "supplier-3", username: "techretail", password: "pass123", email: "info@techretail.it", isSupplier: true, companyName: "Tech Retail Solutions" },
    ];

    suppliersData.forEach(supplier => this.users.set(supplier.id, supplier));

    // Seed products
    const productsData = [
      {
        id: "prod-1",
        name: "Macchina Caffè Espresso 2 Gruppi La Marzocco",
        description: "Macchina per espresso professionale a 2 gruppi con caldaia da 11 litri. Costruzione in acciaio inox AISI 304, sistema di riscaldamento rapido e controllo elettronico della temperatura. Include macinacaffè professionale integrato. Ideale per bar e ristoranti con alto volume di produzione.",
        shortDescription: "Macchina espresso professionale 2 gruppi, caldaia 11L, acciaio inox",
        price: "3850.00",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-1",
        supplierId: "supplier-1",
        rating: "4.7",
        reviewCount: 23,
        externalUrl: "https://example.com/coffee-machine",
        featured: true
      },
      {
        id: "prod-2",
        name: "Poltrona Odontoiatrica Diplomat DM20",
        description: "Unit odontoiatrico completo con poltrona ergonomica a regolazione elettropneumatica, riunito con 5 strumenti, lampada scialitica LED da 30.000 lux e tavoletta porta-strumenti rotante. Rivestimento antimicrobico certificato e pedale multifunzione wireless. Garanzia 3 anni.",
        shortDescription: "Unit odontoiatrico completo, regolazione elettropneumatica, LED 30.000 lux",
        price: "12500.00",
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-2",
        supplierId: "supplier-2",
        rating: "4.8",
        reviewCount: 18,
        externalUrl: "https://example.com/dental-chair",
        featured: true
      },
      {
        id: "prod-3",
        name: "Sistema POS TouchRetail Premium",
        description: "Soluzione POS completa con software gestionale cloud-based, tablet touchscreen 15', stampante termica 80mm, lettore barcode 2D e POS per carte contactless. Include modulo magazzino, fidelity card e reportistica avanzata. Canone annuale licenza software incluso nel prezzo.",
        shortDescription: "POS completo cloud: tablet 15', stampante, lettore carte contactless",
        price: "1680.00",
        imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-6",
        supplierId: "supplier-3",
        rating: "4.6",
        reviewCount: 42,
        externalUrl: "https://example.com/pos-system",
        featured: true
      },
      {
        id: "prod-4",
        name: "Armadio Refrigerato Verticale GN 600L",
        description: "Frigorifero professionale a 2 porte in acciaio AISI 304, capacità 600 litri netti. Classe energetica D, temperatura +2°/+8°C, gas refrigerante R290 ecologico. Sistema No Frost, controllo digitale touch e allarme temperatura. 4 guide GN 2/1 per porta.",
        shortDescription: "Frigo professionale 600L, AISI 304, classe D, gas R290",
        price: "1950.00",
        imageUrl: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-1",
        supplierId: "supplier-1",
        rating: "4.5",
        reviewCount: 31,
        externalUrl: "https://example.com/professional-fridge",
        featured: false
      },
      {
        id: "prod-5",
        name: "Poltrona Barbiere Hydraulic Premium",
        description: "Poltrona professionale per parrucchieri e barbieri con pompa idraulica rinforzata (portata 180kg), base cromata 5 razze e poggiapiedi regolabile. Rivestimento in similpelle antibatterica disponibile in 6 colori. Schienale reclinabile fino a 150°. Garanzia 2 anni.",
        shortDescription: "Poltrona idraulica 180kg, cromata, similpelle antibatterica, schienale reclinabile",
        price: "890.00",
        imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-3",
        supplierId: "supplier-1",
        rating: "4.4",
        reviewCount: 27,
        externalUrl: "https://example.com/salon-chair",
        featured: false
      },
      {
        id: "prod-6",
        name: "Ortopantomografo Digitale 3D CBCT",
        description: "Sistema radiografico digitale panoramico con tecnologia Cone Beam CT. FOV 8x8 cm, sensore CMOS ad alta risoluzione, software di acquisizione e diagnostica incluso. Dose radiogena ridotta del 40% rispetto ai sistemi tradizionali. Certificazione CE Medical e installazione compresa.",
        shortDescription: "CBCT digitale panoramico FOV 8x8, CMOS, software incluso",
        price: "28900.00",
        imageUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryId: "cat-2",
        supplierId: "supplier-2",
        rating: "4.9",
        reviewCount: 12,
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
