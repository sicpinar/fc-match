const PLZ_COORDS = {
  '40476': { lat: 51.2562, lng: 6.7734 },
  '10115': { lat: 52.5200, lng: 13.4050 },
  '80331': { lat: 48.1351, lng: 11.5820 },
  '20095': { lat: 53.5511, lng: 9.9937 },
  '50667': { lat: 50.9375, lng: 6.9603 }
}
export function calculateDistance(plz1, plz2){
  const c1 = PLZ_COORDS[plz1] || getPLZRegion(plz1)
  const c2 = PLZ_COORDS[plz2] || getPLZRegion(plz2)
  if(!c1 || !c2) return 999999
  const R=6371, toRad=d=>d*Math.PI/180
  const dLat=toRad(c2.lat-c1.lat), dLng=toRad(c2.lng-c1.lng)
  const a=Math.sin(dLat/2)**2 + Math.cos(toRad(c1.lat))*Math.cos(toRad(c2.lat))*Math.sin(dLng/2)**2
  return Math.round(2*R*Math.asin(Math.sqrt(a)))
}
function getPLZRegion(plz){
  const r=String(plz).slice(0,2)
  const regions={'01':{lat:51.05,lng:13.74},'04':{lat:51.34,lng:12.37},'10':{lat:52.52,lng:13.40},'20':{lat:53.55,lng:9.99},'30':{lat:52.37,lng:9.73},'40':{lat:51.23,lng:6.78},'50':{lat:50.94,lng:6.96},'60':{lat:50.11,lng:8.68},'70':{lat:48.78,lng:9.18},'80':{lat:48.14,lng:11.58},'90':{lat:49.45,lng:11.08}}
  return regions[r]||null
}
export function validatePLZ(plz){ return /^[0-9]{5}$/.test(plz) && plz>='01000' && plz<='99999' }
