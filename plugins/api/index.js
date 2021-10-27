import { foodAPI } from './food';
import { mealsAPI } from './meals';
import { mealTimesAPI } from './mealTimes';

export default async (context, inject) =>
{
  const { auth } = context.$supabase;
  const session = await auth.session();
  if(session) context.$axios.setToken(session.access_token, 'Bearer');

  auth.onAuthStateChange((event, newSession) =>
  {
    if(event === 'SIGNED_IN' && newSession)
      context.$axios.setToken(newSession.access_token, 'Bearer');
  });

  const food = foodAPI(context);
  const meals = mealsAPI(context);
  const mealTimes = mealTimesAPI(context);
  inject('api', { food, meals, mealTimes });
};
