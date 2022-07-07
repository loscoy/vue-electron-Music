export const dateFormat = (date: number) => {
  const initDate = new Date(date);
  const y = initDate.getFullYear();
  const m: string = (initDate.getMonth() + 1).toString().padStart(2, "0");
  const d: string = initDate.getDate().toString().padStart(2, "0");
  const h: string = initDate.getHours().toString().padStart(2, "0");
  const min: string = initDate.getMinutes().toString().padStart(2, "0");
  const s: string = initDate.getSeconds().toString().padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};
export default dateFormat;
