import { chromium, Page } from 'playwright-core'
import { ChatComplentionsMessage } from './models'
import * as path from 'path'
import * as os from 'os'
export class AiService {
  private page: Page | undefined

  public async prepareAi() {
    const userDataDir = path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'Google',
      'Chrome Dev'
    )

    const browser = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chrome-dev',
      args: ['--no-first-run', '--no-default-browser-check'],
      headless: true,
    })
    this.page = await browser.newPage()
    await this.page.goto('http://localhost:3000')
  }

  public async prompt(messages: ChatComplentionsMessage[]) {
    if (!this.page) {
      throw new Error('page is not initialized')
    }
    const prompt = this.generatePrompt(messages)
    const result = await this.page.evaluate(async (prompt) => {
      const session = await window.ai.createTextSession()
      return await session.prompt(prompt)
    }, prompt)
    return result
  }
  private generatePrompt(messages: ChatComplentionsMessage[]) {
    return `
      以下の会話を続けてください。
      ${messages
        .map(({ role, content }) =>
          role === 'system' ? `あなた: ${content}` : `相手: ${content}`
        )
        .join('\n')}
      `
  }
}
