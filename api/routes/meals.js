import { Router } from 'express';
import { format } from 'date-fns';
import { meals } from '../db';

const mealsRouter = Router();
export default Router().use('/meals', mealsRouter);

/* Get meals */
mealsRouter.get('/', async (request, response) =>
{
  try
  {
    const data = await meals()
      .join('food', 'food.id', 'foodID')
      .join('mealTimes', 'mealTimes.id', 'mealTimeID')
      .select(
        'date',
        'food.id as foodID',
        'food.name as foodName',
        'mealTimes.id as mealTimeID',
        'mealTimes.name as mealTimeName',
      );

    const mealsData = {};
    for(const { date, foodID, foodName, mealTimeID, mealTimeName } of data)
    {
      const dateString = format(date, 'yyyy-MM-dd');
      if(!mealsData[dateString])
        mealsData[dateString] = [];

      mealsData[dateString].push({
        food:
        {
          id: foodID,
          name: foodName,
        },
        mealTime:
        {
          id: mealTimeID,
          name: mealTimeName
        },
      });
    }

    response.json(mealsData);
  }
  catch(error)
  {
    response.sendStatus(500);
  }
});

/* Add new meal/s */
mealsRouter.post('/', async (request, response) =>
{
  /**
   * @typedef Meal
   * @property {string} date
   * @property {number} foodID
   * @property {number} mealTimeID
   */
  /** @type {Meal[] */
  const data = request.body;
  if(!data
    || Object.keys(data).length === 0
    || data.some(({ foodID, date, mealTimeID }) => !foodID || !date || !mealTimeID)
  )
    return response.sendStatus(400);

  try
  {
    const foods = await meals()
      .returning('*')
      .insert(data);

    response.json(foods);
  }
  catch(error)
  {
    response.sendStatus(500);
  }
});
