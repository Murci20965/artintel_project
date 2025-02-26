import { toast } from "sonner"

type WebSocketMessage = {
  type: string
  payload: any
}

type WebSocketCallback = (message: WebSocketMessage) => void

class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 1000
  private callbacks: Map<string, Set<WebSocketCallback>> = new Map()

  constructor(private url: string) {}

  connect() {
    try {
      this.ws = new WebSocket(this.url)
      this.ws.onopen = this.handleOpen.bind(this)
      this.ws.onclose = this.handleClose.bind(this)
      this.ws.onmessage = this.handleMessage.bind(this)
      this.ws.onerror = this.handleError.bind(this)
    } catch (error) {
      console.error("WebSocket connection error:", error)
      this.handleError(error)
    }
  }

  private handleOpen() {
    console.log("WebSocket connected")
    this.reconnectAttempts = 0
    toast.success("Real-time connection established")
  }

  private handleClose() {
    console.log("WebSocket closed")
    this.attemptReconnect()
  }

  private handleError(error: any) {
    console.error("WebSocket error:", error)
    toast.error("Real-time connection error")
  }

  private handleMessage(event: MessageEvent) {
    try {
      const message: WebSocketMessage = JSON.parse(event.data)
      const callbacks = this.callbacks.get(message.type)
      if (callbacks) {
        callbacks.forEach((callback) => callback(message))
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error)
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)
      setTimeout(() => this.connect(), this.reconnectTimeout * this.reconnectAttempts)
    } else {
      console.error("Max reconnection attempts reached")
      toast.error("Unable to establish real-time connection")
    }
  }

  subscribe(type: string, callback: WebSocketCallback) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set())
    }
    this.callbacks.get(type)!.add(callback)
  }

  unsubscribe(type: string, callback: WebSocketCallback) {
    const callbacks = this.callbacks.get(type)
    if (callbacks) {
      callbacks.delete(callback)
    }
  }

  send(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    } else {
      console.error("WebSocket is not connected")
      toast.error("Unable to send message: connection lost")
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const wsClient = new WebSocketClient(process.env.NEXT_PUBLIC_WS_URL || "wss://api.artintel.ai/ws")

