const fs = require("fs");
const { REGULAR } = require("../../constants/roles");
const { addToAdmin } = require("../../controllers/admin");
const { addToCook } = require("../../controllers/cook");
const { addToOperatorRole } = require("../../controllers/operator");
const { addToRegularRole } = require("../../controllers/regular");
const { createNewUserManually } = require("../../controllers/user");
const { Meal } = require("../../models/meal");
const { Order } = require("../../models/order");
const {
  CookRoleUser,
  RegularRoleUser,
  BaseUser,
} = require("../../models/user");


const readJsonData = (filename) => {
  const jsonString = fs.readFileSync(filename);
  return JSON.parse(jsonString);
};


const seedUsers = async () => {
  if (await BaseUser.count()) return;

  const { admins, cooks, operators, regulars } = await readJsonData(
    "./helpers/seed/data.json"
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
  await addToCook(userId);
  console.log(`${cook.username} saved`);
};


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
  console.log(meals.length);
  writeMeals(meals);
};


const writeMeals = async (meals) => {
  await meals.forEach(async (mealJSON) => {
    const cooks = await CookRoleUser.find();
    const cookIds = cooks.map((cook) => cook.id);
    const cookId = cookIds[Math.floor(Math.random() * cookIds.length)];

    mealJSON.cook = cookId;

    const meal = new Meal(mealJSON);

    const cook = await CookRoleUser.findById(cookId);
    cook.cooks.push(meal.id);

    await meal.save();
    await cook.save();
    console.log(`˘${meal.name} saved`);
  });
};


const seedOrders = async () => {
  if (!(await RegularRoleUser.count())) return;
  if (!(await Meal.count())) return;
  if (await Order.count()) return;
  const { orders } = await readJsonData("./helpers/seed/data.json");
  console.log(orders.length);
  writeOrders(orders);
};


const writeOrders = async (orders) => {
  for (let i = 0; i <= 11; i++) {
    const order = new Order(orders[i]);
    order.orderer = await getRegular330Id();
    const orderer = await RegularRoleUser.findById(await getRegular330Id());
    orderer.orders.push(order.id);

    const randomMealIds = await getMealIdsFromSameCook(
      Math.floor(Math.random() * 8)
    );

    await randomMealIds.forEach(async (randomMealId) => {
      const meal = await Meal.findById(randomMealId);
      meal.orders.push(order.id);
      order.meals.push(randomMealId);

      await meal.save();
    });

    await orderer.save();
    await order.save();
    console.log(`${order.remark} saved`);
  }
  orders = orders.slice(12);
  await orders.forEach(async (orderJSON) => {
    const ordererId = await getOrdererId();

    orderJSON.orderer = ordererId;

    const randomMealIds = await getMealIdsFromSameCook(
      Math.floor(Math.random() * 8)
    );

    const order = new Order(orderJSON);
    const orderer = await RegularRoleUser.findById(ordererId);
    orderer.orders.push(order.id);

    await randomMealIds.forEach(async (randomMealId) => {
      const meal = await Meal.findById(randomMealId);
      meal.orders.push(order.id);
      order.meals.push(randomMealId);

      await meal.save();
    });

    await orderer.save();
    await order.save();
    console.log(`${order.remark} saved`);
  });
};


const getMealIdsFromSameCook = async (numberOfitems) => {
  const cookId = await getRandomCookId();
  const allMeals = await Meal.find({ cook: cookId });
  const allMealIds = allMeals?.map((meal) => meal.id);
  const maxMealsCount = allMealIds.length;
  if (numberOfitems >= maxMealsCount) {
    numberOfitems = Math.floor(maxMealsCount / 2);
  }
  if (maxMealsCount < numberOfitems) {
    if (maxMealsCount < 2) numberOfitems = 0;
    else numberOfitems = Math.floor(maxMealsCount / 3);
  }
  const shuffledMeals = allMealIds.sort(() => 0.5 - Math.random());
  return shuffledMeals.slice(0, numberOfitems);
};


const getOrdererId = async () => {
  const regulars = await RegularRoleUser.find();
  const regularIds = regulars.map((regular) => regular.id);
  return regularIds[Math.floor(Math.random() * regularIds.length)];
};


const getRegular330Id = async () => {
  const regular = await BaseUser.findOne({ username: "regularusername330" });
  return regular.roles.find((role) => role.name == REGULAR)?.id;
};


const getRandomCookId = async () => {
  const randomCook = await CookRoleUser.findOne().skip(
    Math.floor(Math.random() * (await CookRoleUser.count()))
  );
  const randomCookId = randomCook.id;
  return randomCookId;
};


const seedData = async () => {
  await seedUsers();
  await seedMeals();
  await seedOrders();
};


module.exports = { seedData };
