"use client"

import { useEffect, useCallback } from "react"
import { wsClient } from "@/lib/websocket"

export function useWebSocket(type: string, callback: (payload: any) => void) {
  const handleMessage = useCallback(
    (message: { type: string; payload: any }) => {
      callback(message.payload)
    },
    [callback],
  )

  useEffect(() => {
    wsClient.subscribe(type, handleMessage)
    return () => wsClient.unsubscribe(type, handleMessage)
  }, [type, handleMessage])

  return {
    send: (payload: any) => wsClient.send(type, payload),
  }
}

