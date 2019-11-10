const addZero = (n) => n < 10 ? `0${n}` : n;

export const toPrettyTime = (timestamp) => {
  const d = new Date(timestamp);
  return `${d.getHours()}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`;
};
