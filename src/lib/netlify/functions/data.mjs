
// sample data for server functions
export const sampleTeams = [
  { id: 'team_001', dfbNumber: '1234567', clubName: 'FC Fortuna Düsseldorf', teamName: 'U12 1. Mannschaft', ageGroup: 'U12', plz: '40476', verificationLevel: 'gold', rating: 4.5, ratingCount: 12, trainerName: 'Thomas Müller', email: 'trainer@fortuna-duesseldorf.de' },
  { id: 'team_002', dfbNumber: '2345678', clubName: 'SV Wersten 04', teamName: 'U10', ageGroup: 'U10', plz: '40591', verificationLevel: 'silver', rating: 4.2, ratingCount: 8, trainerName: 'Klaus Schmidt', email: 'klaus@sv-wersten.de' }
];

export const sampleGames = [
  { id:'game_001', teamId:'team_001', teamName:'FC Fortuna Düsseldorf U12', date:'2025-10-15', time:'14:00', location:'Sportplatz Düsseldorf-Nord', plz:'40476', ageGroup:'U12', allowedAgeGroups:['U11','U12','U13'], homeAway:'Heimspiel', surface:'Kunstrasen', hasReferee:true, comment:'Suchen starken Gegner für Testspiel', verificationLevel:'gold', rating:4.5, status:'open', distance: 3 },
  { id:'game_002', teamId:'team_002', teamName:'SV Wersten 04 U10', date:'2025-10-20', time:'10:00', location:'Sportanlage Wersten', plz:'40591', ageGroup:'U10', allowedAgeGroups:['U9','U10','U11'], homeAway:'Heimspiel', surface:'Rasen', hasReferee:false, comment:'Freundschaftsspiel, gerne mit anschließendem Grillen', verificationLevel:'silver', rating:4.2, status:'open', distance: 7 }
];
