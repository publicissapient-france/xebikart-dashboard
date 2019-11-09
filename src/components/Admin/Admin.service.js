import axios from 'axios';

export const voteUniverse = async (universe) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/universe`, universe);

export const stopPoll = async () =>
  await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/poll/stop`);

export const resetPoll = async () =>
  await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/api/poll/reset`);

export const getEventSourceUniverse = () =>
  new EventSource(`${process.env.REACT_APP_BACKEND_HOST}/universes`);
