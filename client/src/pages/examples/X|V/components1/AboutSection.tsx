import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutSection() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const sections = ['story', 'philosophy', 'chef'];

  return (
    <section id="about" className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-gold text-center mb-16"
          data-testid="text-about-title"
        >
          {t('about.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-md" />
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800"
              alt="Restaurant interior"
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                data-testid={`section-${section}`}
              >
                <h3 className="text-2xl font-serif text-gold mb-3">
                  {t(`about.${section}.title`)}
                </h3>
                <p className="text-white/80 leading-relaxed font-zalando">
                  {t(`about.${section}.content`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
