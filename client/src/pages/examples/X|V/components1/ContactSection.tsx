import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: t('contact.form.success'),
      description: '',
    });
    setFormData({ name: '', email: '', phone: '', date: '', guests: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-4" data-testid="text-contact-title">
            {t('contact.title')}
          </h2>
          <p className="text-white/70 text-lg" data-testid="text-contact-subtitle">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.name')}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
                data-testid="input-name"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.email')}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
                data-testid="input-email"
              />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact.form.phone')}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                data-testid="input-phone"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
                data-testid="input-date"
              />
              <Input
                name="guests"
                type="number"
                value={formData.guests}
                onChange={handleChange}
                placeholder={t('contact.form.guests')}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
                data-testid="input-guests"
              />
            </div>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.form.message')}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-32"
              data-testid="textarea-message"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gold hover:bg-gold/90 text-black font-medium relative overflow-hidden group"
              data-testid="button-submit"
            >
              <span className="relative z-10">{t('contact.form.submit')}</span>
              <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-md" />
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-md overflow-hidden h-full min-h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.105775729959!2d9.19289431544324!3d45.46822897910109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6aec34636a1%3A0x8a6f0d8b1c8c8c8c!2sVia%20della%20Spiga%2C%2015%2C%2020121%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="iframe-contact-map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
