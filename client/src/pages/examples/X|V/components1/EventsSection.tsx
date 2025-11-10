import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const events = [
  {
    id: 1,
    title: 'Private Events',
    description: 'Eventi privati esclusivi per occasioni speciali',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800'
  },
  {
    id: 2,
    title: 'Corporate Catering',
    description: 'Servizi di catering per eventi aziendali',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800'
  },
  {
    id: 3,
    title: 'Chef at Home',
    description: 'Esperienza gourmet nella comodità di casa tua',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'
  }
];

export default function EventsSection() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section id="events" className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4" data-testid="text-events-title">
            {t('events.title')}
          </h2>
          <p className="text-white/70 text-lg" data-testid="text-events-subtitle">
            {t('events.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden" data-testid="card-event-carousel">
            <div className="relative h-96 overflow-hidden">
              <img
                src={events[currentIndex].image}
                alt={events[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="text-3xl font-serif text-gold mb-3" data-testid="text-event-title">
                  {events[currentIndex].title}
                </h3>
                <p className="text-white/90 text-lg mb-6" data-testid="text-event-description">
                  {events[currentIndex].description}
                </p>
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-black"
                  data-testid="button-request-info"
                >
                  {t('events.requestInfo')}
                </Button>
              </div>
            </div>
          </Card>

          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 border-gold text-gold hover:bg-gold hover:text-black"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 border-gold text-gold hover:bg-gold hover:text-black"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gold w-8' : 'bg-white/30'
                }`}
                data-testid={`button-carousel-dot-${index}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
