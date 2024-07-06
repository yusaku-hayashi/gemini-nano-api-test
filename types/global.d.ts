import { AITextSession } from './ai-types'

declare global {
  interface Window {
    ai: {
      canCreateGenericSession: () => unknown
      canCreateTextSession: () => unknown
      createGenericSession: () => unknown
      createTextSession: () => Promise<AITextSession>
      defaultGenericSessionOptions: () => unknown
      defaultTextSessionOptions: () => unknown
    }
  }
}
export {}
