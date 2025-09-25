const API_BASE = '/api'
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers||{}) },
    credentials: 'include',
  })
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)
  return response.json()
}

export async function sendMagicLink(email, userData){return fetchAPI('/auth-magic-link',{method:'POST',body:JSON.stringify({email,userData})})}
export async function verifyMagicLink(token){return fetchAPI('/auth-verify',{method:'POST',body:JSON.stringify({token})})}
export async function createTeam(teamData){return fetchAPI('/teams-crud',{method:'POST',body:JSON.stringify(teamData)})}
export async function updateTeam(teamId, updates){return fetchAPI('/teams-crud',{method:'PUT',body:JSON.stringify({teamId,...updates})})}
export async function searchGames(filters){const params=new URLSearchParams(filters);return fetchAPI(`/games-crud?${params}`)}
export async function createGame(gameData){return fetchAPI('/games-crud',{method:'POST',body:JSON.stringify(gameData)})}
export async function createLike(gameId){return fetchAPI('/matches',{method:'POST',body:JSON.stringify({action:'like',gameId})})}
export async function getMatches(){return fetchAPI('/matches')}
export async function sendMessage(matchId, message){return fetchAPI('/chat',{method:'POST',body:JSON.stringify({matchId,message})})}
export async function getMessages(matchId){return fetchAPI(`/chat?matchId=${matchId}`)}
export async function createRating(teamId, rating, comment){return fetchAPI('/ratings',{method:'POST',body:JSON.stringify({teamId,rating,comment})})}
export async function checkAuth(){ return Promise.resolve({ id: 'demo-user', email: 'demo@example.com' }) }
