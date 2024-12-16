import { Subject } from "rxjs";
import { useMemo, useCallback } from "react";
import { Observer, Event } from "@/app/(projects)/memory-movie/types";

export function useMemoryEvents() {
  const eventSubject = useMemo(() => new Subject<Event>(), []);

  const subscribe = useCallback(
    (observer: Observer) => {
      const subscription = eventSubject.subscribe((event) => {
        if (observer.id === event.id) {
          observer.fn(event.description);
        }
      });

      return () => subscription.unsubscribe();
    },
    [eventSubject]
  );

  const emitEvent = useCallback(
    (event: Event) => {
      eventSubject.next(event);
    },
    [eventSubject]
  );

  return { subscribe, emitEvent };
}
