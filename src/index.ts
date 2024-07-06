import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { ChatComplentionsRequest, ChatCompletionsResponse } from './models'
import { AiService } from './ai-service'

const aiService = new AiService()

const app = new Elysia()
  .use(swagger())
  .post(
    '/chat/completions/',
    async ({
      body: ChatComplentionsRequest,
    }): Promise<Partial<ChatCompletionsResponse>> => {
      const result = await aiService.prompt(ChatComplentionsRequest.messages)
      return {
        choices: [
          {
            index: 0,
            message: {
              role: 'system',
              content: result,
            },
            logprobs: null,
            finish_reason: 'stop',
          },
        ],
      }
    },
    {
      body: t.Object(
        {
          messages: t.Array(
            t.Object({
              role: t.Union([t.Literal('system'), t.Literal('user')]),
              content: t.String(),
            })
          ),
        },
        { required: ['messages'] }
      ),
    }
  )
  .get('/', () => 'Hello Elysia')
  .listen(3000)

aiService.prepareAi()

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
