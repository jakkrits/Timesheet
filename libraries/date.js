import { addDays, differenceInDays } from 'date-fns';

const daysInAMonth = (startDate, endDate) => {
  const days = differenceInDays(endDate, startDate);
  return [...Array(days + 1).keys()].map(i => addDays(startDate, i));
};

export default daysInAMonth;
