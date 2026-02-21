import { createSubject, Subject } from './createSubject'

export interface SubscriptionManager<T = any> {
  value$: Subject<T>
  status$: Subject<string>
  state$: Subject<void>

  subscribe(listener: () => void): () => void
  destroy(): void
}

export function createSubscriptionManager<T = any>(): SubscriptionManager<T> {
  const value$ = createSubject<T>()
  const status$ = createSubject<string>()
  const state$ = createSubject<void>()

  const rootSubject = createSubject<void>()

  function subscribe(listener: () => void): () => void {
    return rootSubject.subscribe(listener)
  }

  function destroy() {
    value$.clear()
    status$.clear()
    state$.clear()
    rootSubject.clear()
  }

  return {
    value$,
    status$,
    state$,
    subscribe,
    destroy,
  }
}
