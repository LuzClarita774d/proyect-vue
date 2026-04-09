import { PROPERTY_IMAGES } from '../data/propertyImages'


export function getImagesByPropertyId(propertyId){
  return PROPERTY_IMAGES
    .filter(img => img.propertyId == propertyId)
    .sort((a,b) => a.order - b.order)
}


export function getMainImage(propertyId){
  return PROPERTY_IMAGES.find(
    img => img.propertyId == propertyId && img.isMain
  )
}


export function getPreviewImages(propertyId){
  return PROPERTY_IMAGES
    .filter(img => img.propertyId == propertyId)
    .sort((a,b) => a.order - b.order)
    .slice(0, 5)
}