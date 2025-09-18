import type { Pet, Garden, PlantingInfo } from '@/lib/types';

export const adoptionPets: Pet[] = [
  { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3, imageId: 'pet1' },
  { id: '2', name: 'Whiskers', type: 'Cat', breed: 'Tabby', age: 2, imageId: 'pet2' },
  { id: '3', name: 'Rocky', type: 'Dog', breed: 'Mixed Breed', age: 5, imageId: 'pet3' },
  { id: '4', name: 'Luna', type: 'Cat', breed: 'Black Cat', age: 1, imageId: 'pet4' },
];

export const communityGardens: Garden[] = [
  { id: 'g1', name: 'Greenleaf Community Garden', location: '123 Garden Lane, Cityville', description: 'A vibrant community garden focused on organic vegetable cultivation and community events.' },
  { id: 'g2', name: 'Sunshine Plots', location: '456 Bloom Blvd, Townburg', description: 'Individual plots available for rent. We provide tools and water.' },
  { id: 'g3', name: 'The People\'s Patch', location: '789 Root Road, Metropolis', description: 'A collaborative garden where everyone shares in the work and the harvest.' },
];

export const plantingCalendar: PlantingInfo[] = [
  { month: 'January', crops: ['Onions', 'Spinach', 'Lettuce'] },
  { month: 'February', crops: ['Peas', 'Radishes', 'Kale'] },
  { month: 'March', crops: ['Carrots', 'Beets', 'Swiss Chard'] },
  { month: 'April', crops: ['Tomatoes', 'Peppers', 'Broccoli'] },
  { month: 'May', crops: ['Cucumbers', 'Zucchini', 'Beans'] },
  { month: 'June', crops: ['Corn', 'Squash', 'Melons'] },
  { month: 'July', crops: ['Pumpkins', 'Sweet Potatoes', 'Okra'] },
  { month: 'August', crops: ['Cabbage', 'Cauliflower', 'Fall Tomatoes'] },
  { month: 'September', crops: ['Spinach', 'Lettuce', 'Garlic'] },
  { month: 'October', crops: ['Kale', 'Collard Greens', 'Turnips'] },
  { month: 'November', crops: ['Cover Crops', 'Garlic', 'Onions'] },
  { month: 'December', crops: ['Planning for Spring'] },
];
