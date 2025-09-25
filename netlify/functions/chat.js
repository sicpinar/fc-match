// Chat pro Match persistieren
import { getStore } from '@netlify/blobs'

export async function handler(event, context) {
  const store = getStore({ name: 'messages', consistency: 'strong' })
  
  if (event.httpMethod === 'GET') {
    try {
      const { matchId } = event.queryStringParameters || {}
      const messages = []
      const { blobs } = await store.list({ prefix: matchId })
      
      for (const blob of blobs) {
        const data = await store.get(blob.key)
        if (data) messages.push(JSON.parse(data))
      }
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
  }
  
  if (event.httpMethod === 'POST') {
    try {
      const { matchId, message, senderId } = JSON.parse(event.body)
      const messageId = `${matchId}_msg_${Date.now()}`
      
      const msg = {
        id: messageId,
        matchId,
        message,
        senderId,
        createdAt: new Date().toISOString()
      }
      
      await store.set(messageId, JSON.stringify(msg))
      
      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      }
    }
  }
  
  return { statusCode: 405, body: 'Method not allowed' }
}
