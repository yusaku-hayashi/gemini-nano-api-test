export interface ChatComplentionsRequest {
  messages: ChatComplentionsMessage[]
}
export interface ChatComplentionsMessage {
  role: 'system' | 'user'
  content: string
}

export interface ChatCompletionsResponse {
  id: string
  object: string
  created: number
  model: string
  system_fingerprint: string
  choices: Choice[]
  usage: Usage
}

export interface Choice {
  index: number
  message: Message
  logprobs: any | null
  finish_reason: string
}

export interface Message {
  role: string
  content: string
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}
