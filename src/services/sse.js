export default class SSEService {
  constructor({
    url,
    onMessage
  }) {
    this.eventSource = new EventSource(url);
    this.eventSource.onmessage = e => {
      console.log('message', e);
    }
    console.log(this.eventSource)
  }

  unsubscribe = () => {
    this.eventSource.close();
  }
}