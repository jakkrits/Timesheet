import { format } from 'date-fns';
import { th } from 'date-fns/locale/th';

const thDate = (date, formatString) =>
  format(date, formatString, {
    locale: th
  });

export default thDate;
