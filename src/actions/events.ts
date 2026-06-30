import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import config from "../config"

export function dispatch_event(this: StreamElement) {
  const name = this.getAttribute("name")
  let template = null

  try {
    template = this.templateContent.textContent
  } catch (e) {
    // default to empty object
  }

  try {
    const detail = template ? JSON.parse(template) : {}

    if (name) {
      const { allowedEvents, prefix } = config.dispatch_event

      if (allowedEvents !== null && !allowedEvents.includes(name)) {
        console.warn(
          `[TurboPower] event "${name}" is not allowed for Turbo Streams operation "dispatch_event"`,
        )
        return
      }

      const eventName = prefix ? `${prefix}${name}` : name
      const options = { bubbles: true, cancelable: true, detail }
      const event = new CustomEvent(eventName, options)

      this.targetElements.forEach((element: Element) => element.dispatchEvent(event))
    } else {
      console.warn(`[TurboPower] no "name" provided for Turbo Streams operation "dispatch_event"`)
    }
  } catch (error: any) {
    console.error(
      `[TurboPower] error proccessing provided "detail" in "<template>" ("${template}") for Turbo Streams operation "dispatch_event".`,
      `Error: "${error.message}"`,
    )
  }
}

export function registerEventsActions(streamActions: TurboStreamActions) {
  streamActions.dispatch_event = dispatch_event
}
