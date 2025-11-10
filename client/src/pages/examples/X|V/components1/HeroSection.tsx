import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
      
      <motion.div
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ opacity: 0.3, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920')] bg-cover bg-center"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
        className="relative z-20 text-center px-4 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.7 }}
          className="text-5xl md:text-7xl font-serif text-white mb-6"
          data-testid="text-hero-title"
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.9 }}
          className="text-xl md:text-2xl text-white/90 mb-8"
          data-testid="text-hero-subtitle"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.1 }}
        >
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-black font-medium px-8 py-6 text-lg relative overflow-hidden group"
            data-testid="button-reserve"
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-md" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/70"
        >
          <ChevronDown className="w-6 h-6" />
          <span className="text-xs mt-2">{t('hero.scrollDown')}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
