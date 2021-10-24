import { startOfWeek, format } from 'date-fns';

export function getWeekDates(date, count = 1)
{
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weeks = [];
  for(let i = 0; i < count; i++)
  {
    const dates = [];
    for(let day = 0; day < 7; day++)
    {
      dates.push({
        formatted: weekStart.toLocaleDateString('default', { month: 'long', day: 'numeric' }),
        date: format(weekStart, 'yyyy-MM-dd'),
      });
      weekStart.setTime(weekStart.getTime() + 1000 * 60 * 60 * 24);
    }
    weeks.push(dates);
  }

  return weeks;
}
