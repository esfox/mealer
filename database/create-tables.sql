-- Food
create table if not exists "food" (
  "id" serial primary key,
  "name" varchar(255) unique not null
);

create unique index if not exists "food_name" on "food"("name");

-- Meal Times
create table if not exists "mealTimes" (
  "id" serial primary key,
  "name" varchar(255) unique not null
);

create unique index if not exists "meal_time_name"  on "mealTimes"("name");

insert into "mealTimes" ("name")
values
  ('Breakfast'),
  ('Lunch'),
  ('Dinner'),
  ('Snack');

-- Meals
create table if not exists "meals" (
  "id" serial primary key,
  "foodID" integer not null,
  "mealTimeID" integer not null,
  "userID" varchar(40) not null,
  "date" timestamp
);

create index if not exists "meal_id" on "meals"("id");
create index if not exists "meal_food_id" on "meals"("foodID");
create index if not exists "meal_meal_time_id" on "meals"("mealTimeID");
create index if not exists "meal_date" on "meals"("date");

-- User Food pivot table
create table if not exists "userFood" (
  "id" serial primary key,
  "foodID" integer not null,
  "userID" varchar(40) not null
);

create index if not exists "food_id" on "userFood"("foodID");
create index if not exists "user_id" on "userFood"("userID");
