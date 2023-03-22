import { useEffect } from "react"
import Cookies from "js-cookie"
import { createSocketConnection } from "../services/pusher"

function listen(callBack: (payload: any) => void, channel: string, event: string) {
  window.Echo.private(channel).listen(event, (payload: any) => {
    callBack(payload)
  })

  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`)
  }
}

type Options = {
  type: "message_sent_event"
  callBack: (payload: any) => void
  channelName: string
}

export const useSocket = ({ type, callBack, channelName }: Options) => {
  useEffect(() => {
    const token = Cookies.get("access_token")
    createSocketConnection(token)
    switch (type) {
      case "message_sent_event": {
        return listen(callBack, channelName, "message_sent_event")
      }
      //   case "ORDER_UPDATED": {
      //     return listen(callBack, `customer.${appState.user.id}.orders`, ".order_updated")
      //   }
      //   case "ORDER_UPDATED_NOTICE": {
      //     return listen(callBack, `customer.${appState.user.id}.notice`, ".order_update_notice")
      //   }
    }
  })
}
