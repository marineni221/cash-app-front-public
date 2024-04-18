import React, { createContext, useState, ReactNode, useMemo } from "react";

interface EventListeners {
  [eventName: string]: (eventData: any) => void;
}

export interface EventContextType {
  addEventListener: (
    eventName: string,
    callback: (eventData: any) => void
  ) => void;
  removeEventListener: (eventName: string) => void;
  emitEvent: (eventName: string, eventData: any) => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [eventListeners, setEventListeners] = useState<EventListeners>({});

  const addEventListener = (
    eventName: string,
    callback: (eventData: any) => void
  ) => {
    setEventListeners((prevListeners) => ({
      ...prevListeners,
      [eventName]: callback,
    }));
  };

  const removeEventListener = (eventName: string) => {
    setEventListeners((prevListeners) => {
      const updatedListeners = { ...prevListeners };
      delete updatedListeners[eventName];
      return updatedListeners;
    });
  };

  const emitEvent = (eventName: string, eventData: any) => {
    const listener = eventListeners[eventName];
    if (listener) {
      listener(eventData);
    }
  };

  const memoizedEvent = useMemo(
    () => ({ addEventListener, removeEventListener, emitEvent }),
    [],
  );

  return (
    <EventContext.Provider
      value={memoizedEvent}
    >
      {children}
    </EventContext.Provider>
  );
};
