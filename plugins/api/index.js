import { foodAPI } from './food';
import { mealsAPI } from './meals';
import { mealTimesAPI } from './mealTimes';

export default (context, inject) =>
{
  const food = foodAPI(context);
  const meals = mealsAPI(context);
  const mealTimes = mealTimesAPI(context);
  inject('api', { food, meals, mealTimes });
};
