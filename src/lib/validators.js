export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateDFBNumber(number) {
  return /^[0-9]{7}$/.test(number)
}

export function validateTeamData(data) {
  const errors = {}
  
  if (!data.dfbNumber || !validateDFBNumber(data.dfbNumber)) {
    errors.dfbNumber = 'Ungültige DFB-Nummer (7 Ziffern)'
  }
  
  if (!data.clubName || data.clubName.length < 3) {
    errors.clubName = 'Vereinsname zu kurz'
  }
  
  if (!data.teamName || data.teamName.length < 2) {
    errors.teamName = 'Teamname zu kurz'
  }
  
  if (!data.ageGroup) {
    errors.ageGroup = 'Altersklasse fehlt'
  }
  
  if (!data.plz || !/^[0-9]{5}$/.test(data.plz)) {
    errors.plz = 'Ungültige PLZ'
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Ungültige E-Mail'
  }
  
  if (!data.trainerName || data.trainerName.length < 2) {
    errors.trainerName = 'Trainername zu kurz'
  }
  
  return Object.keys(errors).length ? errors : null
}
