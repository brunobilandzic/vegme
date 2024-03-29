const fs = require("fs");
const { REGULAR, COOK } = require("../../constants/roles");
const { addToAdmin } = require("../../controllers/admin");
const { addToCook } = require("../../controllers/cook");
const { addToOperatorRole } = require("../../controllers/operator");
const { addToRegularRole } = require("../../controllers/regular");
const { createNewUserManually } = require("../../controllers/user");
const { Alert } = require("../../models/alert");
const { Meal, mealTypes } = require("../../models/meal");
const { Order } = require("../../models/order");
const {
  CookRoleUser,
  RegularRoleUser,
  BaseUser,
} = require("../../models/user");
const { pickRandomElement } = require("../numbers");

const readJsonData = (filename) => {
  const jsonString = fs.readFileSync(filename);
  return JSON.parse(jsonString);
};

const seedUsers = async () => {
  if (await BaseUser.count()) return;

  const { admins, cooks, operators, regulars } = await readJsonData(
    "./helpers/seed/data.json"
  );

  console.log(
    `${admins.length + cooks.length + operators.length + regulars.length} users`
  );

  await writeAdmins(admins);
  await writeCooks(cooks);
  await writeOperators(operators);
  await writeRegulars(regulars);
};

const writeRegulars = async (regulars) => {
  await regulars.forEach(async (regular) => {
    await addRegular(regular);
  });
};

const addRegular = async (regular) => {
  const userId = await createNewUserManually(regular);
  await addToRegularRole(userId);
  console.log(`${regular.username} saved`);
};

const writeAdmins = async (admins) => {
  admins?.forEach(async (admin) => {
    await addAdmin(admin);
  });
};

const addAdmin = async (admin) => {
  const userId = await createNewUserManually(admin);
  await addToAdmin(userId);
  console.log(`${admin.username} saved`);
};

const writeCooks = async (cooks) => {
  await cooks.forEach(async (cook) => {
    await addCook(cook);
  });
};

const addCook = async (cook) => {
  const userId = await createNewUserManually(cook);
  cook.allowed_order_times = [...new Set(cook.allowed_order_times)];
  await addToCook(userId, cook);
  console.log(`${cook.username} saved`);
};

const addCookToRegular = async (userId) => {

}

const writeOperators = async (operators) => {
  operators.forEach(async (operator) => {
    await addOperator(operator);
  });
};

const addOperator = async (operator) => {
  const userId = await createNewUserManually(operator);
  await addToOperatorRole(userId);
  console.log(`${operator.username} saved`);
};

const seedMeals = async () => {
  if (!(await CookRoleUser.count())) return;
  if (await Meal.count()) return;
  const { meals } = await readJsonData("./helpers/seed/data.json");
  console.log(`${meals.length} meals`);
  writeMeals(meals);
};

const writeMeals = async (meals) => {
  await meals.forEach(async (mealJSON, i) => {
    const cooks = await CookRoleUser.find();
    const cookIds = cooks.map((cook) => cook.id);
    const cookId = cookIds[Math.floor(Math.random() * cookIds.length)];

    mealJSON.cook = cookId;

    if (mealJSON.type == mealTypes.SPECIAL) {
      const offered_date =
        mealJSON.offered_dates -
        Math.floor(1000 * 60 * 60 * 24 * 14 * Math.random());
      mealJSON.is_offered =
        mealJSON.offered_dates - offered_date <= 1000 * 60 * 60 * 24 * 7
          ? true
          : false;
      mealJSON.offered_dates = [offered_date];
    }

    const meal = new Meal(mealJSON);

    if (i <= 20) {
      const regularId = await getRegularId();
      const regular = await RegularRoleUser.findById(regularId);

      meal.favourited_by.push(regularId);
      regular.favourite_meals.push(meal.id);
      await regular.save();
    } else {
      while (Math.random() < 0.8) {
        const regular = await RegularRoleUser.findOne().skip(
          Math.floor(Math.random() * (await RegularRoleUser.count()))
        );
        const regularId = regular.id;
        regular.favourite_meals.push(meal.id);
        meal.favourited_by.push(regularId);
        await regular.save();
      }
    }

    const cook = await CookRoleUser.findById(cookId);
    cook.cooks.push(meal.id);

    await meal.save();
    await cook.save();
    console.log(`${meal.name} saved`);
  });
};

const seedOrders = async () => {
  if (!(await RegularRoleUser.count())) return;
  if (!(await Meal.count())) return;
  if (await Order.count()) return;
  const { orders } = await readJsonData("./helpers/seed/data.json");
  console.log(`${orders.length} orders`);
  writeOrders(orders);
};

const writeOrders = async (orders) => {
  for (let i = 0; i <= 11; i++) {
    const order = new Order(orders[i]);

    const regularId = await getRegularId();
    order.orderer = regularId;

    const orderer = await RegularRoleUser.findById(regularId).populate({
      path: "user",
    });
    orderer.orders.push(order.id);

    const [randomMealIds, cookId] = await getMealIdsFromSameCook(
      Math.floor(Math.random() * 10)
    );

    order.cook = cookId;
    const cook = await CookRoleUser.findById(cookId);
    cook.orders.push(order.id);
    const cookBaseUser = await BaseUser.findById(cook.user);
    const newAlert = new Alert({
      user: cookBaseUser.id,
      text: `${orderer.user.username} made an order ${order.remark}.`,
    });
    cookBaseUser.alerts.push(newAlert.id);
    order.order_time = pickRandomElement(cook.allowed_order_times);

    await randomMealIds.forEach(async (randomMealId) => {
      const meal = await Meal.findById(randomMealId);
      meal.orders.push(order.id);
      order.meals.push(randomMealId);

      await meal.save();
    });

    await orderer.save();
    await order.save();
    await cook.save();
    await newAlert.save();
    await cookBaseUser.save();
    console.log(`${order.remark} saved`);
  }

  orders = orders.slice(12);

  for (let i = 0; i <= 15; i++) {
    const order = new Order(orders[i]);

    const ordererId = await getOrdererId();

    order.orderer = ordererId;
    const orderer = await RegularRoleUser.findById(ordererId).populate({
      path: "user",
    });
    orderer.orders.push(order.id);

    const cookId = await getCookId();
    const cook = await CookRoleUser.findById(cookId).populate({
      path: "cooks",
    });

    order.cook = cookId;
    cook.orders.push(order.id);

    const cookBaseUser = await BaseUser.findById(cook.user);
    const newAlert = new Alert({
      user: cookBaseUser.id,
      text: `${orderer.user.username} made an order ${order.remark}.`,
    });
    cookBaseUser.alerts.push(newAlert.id);
    order.order_time = pickRandomElement(cook.allowed_order_times);

    await cook.cooks.forEach(async (meal) => {
      if (Math.random() > 0.5 || !meal.is_offered) return;
      meal.orders.push(order.id);
      order.meals.push(meal.id);

      await meal.save();
    });

    await orderer.save();
    await order.save();
    await cook.save();
    await newAlert.save();
    await cookBaseUser.save();

    console.log(`${order.remark} saved`);
  }

  orders = orders.slice(16);

  await orders.forEach(async (orderJSON) => {
    const ordererId = await getOrdererId();

    orderJSON.orderer = ordererId;

    const [randomMealIds, cookId] = await getMealIdsFromSameCook(
      Math.floor(Math.random() * 10)
    );

    if (typeof cookId == "undefined" || !cookId) return;

    orderJSON.cook = cookId;
    const cook = await CookRoleUser.findById(cookId);

    const order = new Order(orderJSON);
    const orderer = await RegularRoleUser.findById(ordererId).populate({
      path: "user",
    });
    orderer.orders.push(order.id);
    cook.orders.push(order.id);
    order.order_time = pickRandomElement(cook.allowed_order_times);

    await randomMealIds.forEach(async (randomMealId) => {
      const meal = await Meal.findById(randomMealId);
      meal.orders.push(order.id);
      order.meals.push(randomMealId);

      await meal.save();
    });

    const cookBaseUser = await BaseUser.findById(cook.user);
    const newAlert = new Alert({
      user: cookBaseUser.id,
      text: `${orderer.user.username} made an order ${order.remark}.`,
    });

    cookBaseUser.alerts.push(newAlert.id);

    await newAlert.save();
    await cookBaseUser.save();

    await orderer.save();
    await order.save();
    await cook.save();
    console.log(`${order.remark} saved`);
  });
};

const getMealIdsFromSameCook = async (numberOfitems) => {
  const cookId = await getRandomCookId();
  const allMeals = await Meal.find({
    $and: [{ cook: cookId }, { is_offered: true }],
  });
  const allMealIds = allMeals?.map((meal) => meal.id);
  const maxMealsCount = allMealIds.length;
  if (numberOfitems >= maxMealsCount / 2) {
    numberOfitems = Math.floor(maxMealsCount / 3);
  }
  const shuffledMeals = allMealIds.sort(() => 0.5 - Math.random());
  return [shuffledMeals.slice(0, numberOfitems), cookId];
};

const getOrdererId = async () => {
  const regulars = await RegularRoleUser.find();
  const regularIds = regulars.map((regular) => regular.id);
  return regularIds[Math.floor(Math.random() * regularIds.length)];
};

const getRegularId = async () => {
  const regular = await BaseUser.findOne({ username: "regular441" });
  return regular.roles.find((role) => role.name == REGULAR)?.id;
};

const getCookId = async () => {
  const cook = await BaseUser.findOne({ username: "cook361" });
  return cook.roles.find((role) => role.name == COOK)?.id;
};

const getRandomCookId = async () => {
  const randomCook = await CookRoleUser.findOne().skip(
    Math.floor(Math.random() * (await CookRoleUser.count()))
  );
  const randomCookId = randomCook.id;
  return randomCookId;
};

const cookUsernameMostOrders = async () => {
  if (!(await Meal.count()) || !(await Order.count())) return;
  const meals = await Meal.find().populate({
    path: "cook",
    populate: { path: "user" },
  });
  let mostOrders = 0;
  let mealWithMostOrders;
  meals.forEach((meal) => {
    if (meal.orders.length > mostOrders) {
      mostOrders = meal.orders.length;
      mealWithMostOrders = meal;
    }
  });
  console.log(
    `${mealWithMostOrders.cook.user.username} has meal with most orders`
  );
};

const seedData = async () => {
  await seedUsers();
  await seedMeals();
  await seedOrders();
};

module.exports = { seedData };
