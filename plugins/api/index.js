import { foodAPI } from './food';
import { mealsAPI } from './meals';

export default (context, inject) =>
{
  const food = foodAPI(context);
  const meals = mealsAPI(context);
  inject('api', { food, meals });
};
