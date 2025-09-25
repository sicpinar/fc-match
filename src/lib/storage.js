export class Storage {
  constructor(endpoint) {
    this.endpoint = endpoint
  }
  
  async list(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `/api/${this.endpoint}${queryString ? `?${queryString}` : ''}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  }
  
  async get(id) {
    const response = await fetch(`/api/${this.endpoint}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  }
  
  async create(data) {
    const response = await fetch(`/api/${this.endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to create')
    return response.json()
  }
  
  async update(id, data) {
    const response = await fetch(`/api/${this.endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [`${this.endpoint}Id`]: id, ...data })
    })
    if (!response.ok) throw new Error('Failed to update')
    return response.json()
  }
  
  async delete(id) {
    const response = await fetch(`/api/${this.endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [`${this.endpoint}Id`]: id })
    })
    if (!response.ok) throw new Error('Failed to delete')
    return response.json()
  }
}
