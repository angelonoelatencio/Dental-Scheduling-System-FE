const convertTime = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const readableHour = hour % 12 || 12;
  return `${readableHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export default convertTime;
