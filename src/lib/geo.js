export function calculateDistance(plz1, plz2) {
  const getRegion = (plz) => {
    const region = plz.substring(0, 2)
    const regions = {
      '01': { lat: 51.05, lng: 13.74 }, // Dresden
      '04': { lat: 51.34, lng: 12.37 }, // Leipzig
      '10': { lat: 52.52, lng: 13.40 }, // Berlin
      '20': { lat: 53.55, lng: 9.99 },  // Hamburg
      '30': { lat: 52.37, lng: 9.73 },  // Hannover
      '40': { lat: 51.23, lng: 6.78 },  // Düsseldorf
      '50': { lat: 50.94, lng: 6.96 },  // Köln
      '60': { lat: 50.11, lng: 8.68 },  // Frankfurt
      '70': { lat: 48.78, lng: 9.18 },  // Stuttgart
      '80': { lat: 48.14, lng: 11.58 }, // München
      '90': { lat: 49.45, lng: 11.08 }, // Nürnberg
    }
    return regions[region] || { lat: 51.0, lng: 9.0 }
  }
  
  const coord1 = getRegion(plz1)
  const coord2 = getRegion(plz2)
  
  const R = 6371
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c)
}

export function validatePLZ(plz) {
  return /^[0-9]{5}$/.test(plz) && plz >= '01000' && plz <= '99999'
}
