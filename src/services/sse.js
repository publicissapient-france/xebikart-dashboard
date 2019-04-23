export default class SSEService {
  constructor({url, onMessage}) {
    this.eventSource = new EventSource(url);
    this.eventSource.onmessage = onMessage
  }

  unsubscribe = () => {
    this.eventSource.close();
  }
}

