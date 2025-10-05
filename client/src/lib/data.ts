// This file can contain any static data utilities if needed
// Currently all data is managed through the storage system

export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `€${numPrice.toLocaleString('it-IT')}`;
};

export const formatRating = (rating: string | number): number => {
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return Math.round(numRating * 10) / 10; // Round to 1 decimal place
};

export const getCategoryColor = (categoryName: string): string => {
  const colors: { [key: string]: string } = {
    'Ristorazione': 'bg-orange-100 text-orange-800',
    'Dentisti': 'bg-blue-100 text-blue-800',
    'Salute e Benessere': 'bg-green-100 text-green-800',
    'Retail': 'bg-purple-100 text-purple-800',
    'Servizi Professionali': 'bg-indigo-100 text-indigo-800',
    'Tecnologia': 'bg-gray-100 text-gray-800',
    'Hospitality': 'bg-pink-100 text-pink-800',
  };
  
  return colors[categoryName] || 'bg-gray-100 text-gray-800';
};
