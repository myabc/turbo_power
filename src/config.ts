export interface DispatchEventConfig {
  allowedEvents: string[] | null
  prefix: string | null
}

export interface TurboPowerConfig {
  dispatch_event: DispatchEventConfig
}

const config: TurboPowerConfig = {
  dispatch_event: {
    allowedEvents: null,
    prefix: null,
  },
}

export default config
