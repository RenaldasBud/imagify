import { useEffect, useState, useCallback } from "react";

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url]);

  const sendMessage = useCallback(
    (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket is not open.");
      }
    },
    [socket]
  );

  return { socket, isConnected, sendMessage };
};

export default useWebSocket;
