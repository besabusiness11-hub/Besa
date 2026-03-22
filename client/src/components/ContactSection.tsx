import { useState } from "react";
import { Button } from "./ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contatti" className="py-16 lg:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Informazioni di Contatto */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Mettiamoci in contatto</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Siamo pronti ad ascoltare le tue idee e a trasformarle in un progetto di successo. 
              Compila il modulo o contattaci direttamente.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Email</h4>
                  <a href="mailto:info@besaweb.com" className="text-muted-foreground hover:text-primary transition-colors">info@besaweb.com</a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Telefono</h4>
                  <a href="tel:+393512338575" className="text-muted-foreground hover:text-primary transition-colors">+39 3512338575</a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Sede</h4>
                  <p className="text-muted-foreground">Via Adriano Olivetti 1, 31056,<br/>Roncade TV, Italia</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Inviaci un messaggio</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Nome completo *</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                    placeholder="mario@esempio.it"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                  placeholder="+39 333 1234567"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Messaggio *</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background resize-none"
                  placeholder="Descrivi brevemente il tuo progetto..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={status === "loading"}
                className={`w-full py-6 text-lg rounded-xl font-semibold flex items-center justify-center transition-all ${
                  status === "success" ? "bg-success hover:bg-success/90" : 
                  status === "error" ? "bg-destructive hover:bg-destructive/90" : 
                  "bg-primary hover:bg-primary/90"
                }`}
              >
                {status === "loading" ? (
                  <span className="flex items-center">Invio in corso...</span>
                ) : status === "success" ? (
                  <span className="flex items-center">Messaggio inviato! ✓</span>
                ) : status === "error" ? (
                  <span className="flex items-center">Errore nell'invio ✕</span>
                ) : (
                  <span className="flex items-center">
                    Invia messaggio
                    <Send className="w-5 h-5 ml-2" />
                  </span>
                )}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
