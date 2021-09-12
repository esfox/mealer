import { Router } from 'express';
import { food } from '../db';

const foodRouter = Router();
export default Router().use('/food', foodRouter);

/* Get all food */
foodRouter.get('/', async (request, response) =>
{
  const foods = await food();
  response.json(foods);
});

/* Create food */
foodRouter.post('/', async (request, response) =>
{
  const { name } = request.body;
  if(!name)
    return response.sendStatus(400);

  const data = { name };
  try
  {
    await food().insert(data);
    response.json(data);
  }
  catch(error)
  {
    /* Duplicate error */
    if(error.code === '23505')
      response.sendStatus(409);
    else
      response.sendStatus(500);
  }
});

/* Delete food */
foodRouter.delete('/:name', async (request, response) =>
{
  const { name } = request.params;
  try
  {
    await food()
      .where('name', name)
      .del();
    response.sendStatus(200);
  }
  catch(error)
  {
    response.sendStatus(500);
  }
});
