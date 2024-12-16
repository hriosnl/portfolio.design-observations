"use client";

import { createContext, useContext, ReactNode } from "react";

import { Observer, Event } from "@/app/(projects)/memory-movie/types";
import { useMemoryEvents } from "@/hooks/useMemoryEvents";

interface MemoryEventContextType {
  emitEvent: (event: Event) => void;
  subscribe: (observer: Observer) => () => void;
}

const MemoryEventContext = createContext<MemoryEventContextType | null>(null);

export const MemoryEventProvider = ({ children }: { children: ReactNode }) => {
  const { subscribe, emitEvent } = useMemoryEvents();

  const contextValue = {
    emitEvent,
    subscribe,
  };

  return (
    <MemoryEventContext.Provider value={contextValue}>
      {children}
    </MemoryEventContext.Provider>
  );
};

export const useMemoryEventContext = () => {
  const context = useContext(MemoryEventContext);

  if (!context) {
    throw new Error(
      "MemoryEventContext must be used within an MemoryEventProvider"
    );
  }
  return context;
};
