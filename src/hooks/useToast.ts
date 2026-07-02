"use client";

import { useState, useCallback, useRef } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

let globalAddToast: ((message: string, type?: Toast["type"]) => void) | null = null;

export function showToast(message: string, type: Toast["type"] = "info") {
  globalAddToast?.(message, type);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);

      const timer = setTimeout(() => {
        removeToast(id);
      }, 3000);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  globalAddToast = addToast;

  return { toasts, addToast, removeToast };
}
