import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const BlogDate: React.FC<{ date: Date }> = ({ date }) => (
  <time className="text-gray-500 text-sm" dateTime={format(date, 'yyyy-MM-dd')}>
    {format(date, 'd MMMM y', { locale: ru })}
  </time>
);
