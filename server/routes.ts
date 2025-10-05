import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories routes
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const { categoryId, search, minPrice, maxPrice, minRating } = req.query;
      
      const filters: any = {};
      if (categoryId) filters.categoryId = categoryId as string;
      if (search) filters.search = search as string;
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (minRating) filters.minRating = parseFloat(minRating as string);

      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validation = insertNewsletterSchema.safeParse({
        ...req.body,
        subscribedAt: new Date().toISOString()
      });

      if (!validation.success) {
        return res.status(400).json({ 
          error: "Dati non validi",
          details: validation.error.issues 
        });
      }

      const newsletter = await storage.subscribeNewsletter(validation.data);
      res.status(201).json({ 
        success: true,
        message: "Iscrizione completata con successo!"
      });
    } catch (error: any) {
      if (error.message === "Email già registrata") {
        return res.status(409).json({ error: "Email già registrata" });
      }
      res.status(500).json({ error: "Errore durante l'iscrizione" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
