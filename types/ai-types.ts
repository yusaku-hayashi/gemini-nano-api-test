export interface AITextSession {
  destroy: () => void
  execute: () => unknown
  executeStreaming: () => unknown
  prompt: (prompt: string) => Promise<string>
  promptStreaming: (prompt: string) => ReadableStream<string>
  constructor: new () => AITextSession
}
