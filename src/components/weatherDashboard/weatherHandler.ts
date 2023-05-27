export function epochTimeToDateTime(epochTime: number): {
  date: string;
  time: string;
} {
  const dateObject: Date = new Date(0);
  dateObject.setUTCSeconds(epochTime);

  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();

  return {
    date: date,
    time: time,
  };
}
