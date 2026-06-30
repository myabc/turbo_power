import * as Turbo from "@hotwired/turbo"
import { TurboStreamAction, TurboStreamActions } from "@hotwired/turbo"
import { BrowserAdapter } from "@hotwired/turbo/dist/types/core/native/browser_adapter"

import * as TurboMorph from "turbo-morph"
import * as Actions from "./actions"
import * as Utils from "./utils"
import config from "./config"
import type { TurboPowerConfig } from "./config"

export * as Actions from "./actions"
export * as Utils from "./utils"
export { config }
export type { TurboPowerConfig }

declare global {
  interface Window {
    Turbo: typeof Turbo & {
      navigator: {
        adapter: BrowserAdapter
      }
    }
  }
}

export function initialize(streamActions: TurboStreamActions) {
  TurboMorph.initialize(streamActions)
  Actions.register(streamActions)
}

export function register(name: string, action: TurboStreamAction, streamActions: TurboStreamActions) {
  streamActions[name] = action
}

export default {
  initialize,
  register,
  config,
  Actions,
  Utils,
}
