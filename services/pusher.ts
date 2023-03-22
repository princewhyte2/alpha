import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import Cookies from "js-cookie"

declare global {
  interface Window {
      Echo: Echo;
      Pusher:unknown
  }
}




// window.Pusher = Pusher;



export function createSocketConnection (token: string) {
    if (!window.Echo) {
      const token = Cookies.get("access_token")
    window.Echo = new Echo({
        broadcaster: 'pusher',
    key: "66c92305717c79ada4a4",
        cluster: 'eu',
    host:'https://work-fynder-backend-production.up.railway.app',
    // forceTLS: true,
    auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  }
}