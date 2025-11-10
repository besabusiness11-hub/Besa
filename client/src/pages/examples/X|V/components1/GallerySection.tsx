import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const scenes = [
  {
    id: 1,
    title: 'Materia.',
    subtitle: 'L\'essenza degli ingredienti',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200',
    videoStyle: 'scale'
  },
  {
    id: 2,
    title: 'Fuoco.',
    subtitle: 'La trasformazione attraverso la fiamma',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    videoStyle: 'pan'
  },
  {
    id: 3,
    title: 'Equilibrio.',
    subtitle: 'L\'armonia nel piatto',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200',
    videoStyle: 'zoom'
  },
  {
    id: 4,
    title: 'Silenzio.',
    subtitle: 'La perfezione nell\'attimo',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200',
    videoStyle: 'drift'
  }
];

export default function GallerySection() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4" data-testid="text-gallery-title">
            {t('gallery.title')}
          </h2>
          <p className="text-white/70 text-lg" data-testid="text-gallery-subtitle">
            {t('gallery.subtitle')}
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="space-y-32">
        {scenes.map((scene, index) => (
          <CinematicScene
            key={scene.id}
            scene={scene}
            index={index}
            inView={inView}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="text-center mt-32 px-4"
      >
        <p className="text-gold/60 text-sm font-serif italic">
          "Ogni piatto è un'opera d'arte temporanea, destinata a scomparire nel momento della sua perfezione."
        </p>
      </motion.div>
    </section>
  );
}

interface CinematicSceneProps {
  scene: typeof scenes[0];
  index: number;
  inView: boolean;
}

function CinematicScene({ scene, index, inView }: CinematicSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const isEven = index % 2 === 0;

  return (
    <div ref={sceneRef} className="relative h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: index * 0.3 }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ y: imageY, scale }}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={scene.image}
              alt={scene.title}
              className={`w-full h-full object-cover ${
                scene.videoStyle === 'scale' ? 'animate-ken-burns-scale' :
                scene.videoStyle === 'pan' ? 'animate-ken-burns-pan' :
                scene.videoStyle === 'zoom' ? 'animate-ken-burns-zoom' :
                'animate-ken-burns-drift'
              }`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${
          isEven ? 'text-left' : 'text-right'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -100 : 100 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: index * 0.3 + 0.4 }}
          className={`max-w-2xl ${isEven ? 'mr-auto' : 'ml-auto'}`}
        >
          <motion.h3
            className="text-6xl md:text-8xl font-serif text-gold mb-4 leading-none"
            data-testid={`text-scene-title-${scene.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 + 0.6 }}
          >
            {scene.title}
          </motion.h3>
          <motion.div
            className={`w-24 h-0.5 bg-gold/50 mb-6 ${isEven ? '' : 'ml-auto'}`}
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 + 0.8 }}
          />
          <motion.p
            className="text-xl md:text-2xl text-white/80 font-light"
            data-testid={`text-scene-subtitle-${scene.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 + 1 }}
          >
            {scene.subtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
