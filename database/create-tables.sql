-- Food
create table if not exists "food" (
  "id" serial primary key,
  "name" varchar(255) unique not null
);

create unique index if not exists "food_name" on "food"("name");

-- Meal Times
create table if not exists "mealTimes" (
  "id" integer primary key,
  "name" varchar(255) unique not null
);

create unique index if not exists "meal_time_name"  on "mealTimes"("name");

-- Meal
create table if not exists "meal" (
  "foodID" integer,
  "mealTimeID" integer,
  "date" timestamp
);

create index if not exists "meal_food_id" on "meal"("foodID");
create index if not exists "meal_meal_time_id" on "meal"("mealTimeID");
create index if not exists "meal_date" on "meal"("date");
