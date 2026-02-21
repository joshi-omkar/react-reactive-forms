import { Listener } from '../types'

export interface Subject<T = void> {
  subscribe(listener: Listener<T>): () => void
  next(value: T): void
  clear(): void
}

export function createSubject<T = void>(): Subject<T> {
  const listeners = new Set<Listener<T>>()

  function subscribe(listener: Listener<T>): () => void {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function next(value: T): void {
    for (const listener of listeners) {
      listener(value)
    }
  }

  function clear(): void {
    listeners.clear()
  }

  return {
    subscribe,
    next,
    clear,
  }
}
