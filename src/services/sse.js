export default class SSEService {
  constructor({url, onMessage}) {
    this.eventSource = new EventSource(url, { withCredentials: true } );
    this.eventSource.onmessage = onMessage
  }

  unsubscribe = () => {
    this.eventSource.close();
  }
}

