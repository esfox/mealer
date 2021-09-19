import { foodAPI } from './food';

export default (context, inject) =>
{
  const food = foodAPI(context);
  inject('api', { food });
};
