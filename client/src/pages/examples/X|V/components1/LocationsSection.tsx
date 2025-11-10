import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const locations = [
	{
		id: 1,
		name: 'X|V Milano',
		address: 'Via della Spiga 15, Milano',
		hours: 'Mar-Dom: 12:00-23:00',
		image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
	},
	{
		id: 2,
		name: 'X|V Roma',
		address: 'Via Condotti 25, Roma',
		hours: 'Mar-Dom: 12:00-23:00',
		image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800'
	}
];

export default function LocationsSection() {
	const { t } = useTranslation();
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	return (
		<section id="locations" className="py-24 bg-black" ref={ref}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2
						className="text-4xl md:text-5xl font-serif text-gold mb-4"
						data-testid="text-locations-title"
					>
						{t('locations.title')}
					</h2>
					<p
						className="text-white/70 text-lg"
						data-testid="text-locations-subtitle"
					>
						{t('locations.subtitle')}
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{locations.map((location, index) => (
						<motion.div
							key={location.id}
							initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
							animate={inView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
						>
							<Card
								className="overflow-hidden hover-elevate group"
								data-testid={`card-location-${location.id}`}
							>
								<div className="relative h-64 overflow-hidden">
									<img
										src={location.image}
										alt={location.name}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 p-6">
										<h3
											className="text-2xl font-serif text-gold mb-2"
											data-testid={`text-location-name-${location.id}`}
										>
											{location.name}
										</h3>
									</div>
								</div>
								<div className="p-6 space-y-4">
									<div className="flex items-start">
										<MapPin className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
										<span
											className="text-black"
											data-testid={`text-location-address-${location.id}`}
										>
											{location.address}
										</span>
									</div>
									<div className="flex items-start">
										<Clock className="w-5 h-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
										<span
											className="text-black"
											data-testid={`text-location-hours-${location.id}`}
										>
											{location.hours}
										</span>
									</div>
									<Button
										variant="outline"
										className="w-full border-gold text-gold hover:bg-gold hover:text-black"
										data-testid={`button-discover-${location.id}`}
									>
										{t('locations.discover')}
									</Button>
								</div>
							</Card>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="rounded-md overflow-hidden h-96"
				>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.105775729959!2d9.19289431544324!3d45.46822897910109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6aec34636a1%3A0x8a6f0d8b1c8c8c8c!2sVia%20della%20Spiga%2C%2015%2C%2020121%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
						width="100%"
						height="100%"
						style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						data-testid="iframe-map"
					/>
				</motion.div>
			</div>
		</section>
	);
}
