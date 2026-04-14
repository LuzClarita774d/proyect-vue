// src/modules/properties/services/ratingService.js
import { ratings } from '../data/ratingData';

export const getRatingByPropertyId = (id) => {
  const result = ratings.find(r => r.propertyId === String(id));
  return result || {
    overallRating: 0,
    totalReviews: 0,
    categories: {},
    reviews: []
  };
};