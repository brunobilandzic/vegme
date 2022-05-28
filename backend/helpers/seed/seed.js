const fs = require("fs");
const { addToAdmin } = require("../../controllers/admin");
const { addToCook, getAllCooks } = require("../../controllers/cook");
const { addToOperatorRole } = require("../../controllers/operator");
const { addToRegularRole } = require("../../controllers/regular");
const { createNewUserManually } = require("../../controllers/user");
const { Meal } = require("../../models/meal");
const { Order } = require("../../models/order");
const {
  AdminRoleUser,
  CookRoleUser,
  RegularRoleUser,
} = require("../../models/user");

const readJsonData = (filename) => {
  const jsonString = fs.readFileSync(filename);
  return JSON.parse(jsonString);
};

const writeRegulars = async (regulars) => {
  await regulars.forEach(async (regular) => {
    await addRegular(regular);
  });
};

const addRegular = async (regular) => {
  const userId = await createNewUserManually(regular);
  await addToRegularRole(userId);
};

const writeAdmins = async (admins) => {
  admins?.forEach(async (admin) => {
    await addAdmin(admin);
  });
};

const addAdmin = async (admin) => {
  const userId = await createNewUserManually(admin);
  await addToAdmin(userId);
};

const writeCooks = async (cooks) => {
  await cooks.forEach(async (cook) => {
    await addCook(cook);
  });
};

const addCook = async (cook) => {
  const userId = await createNewUserManually(cook);
  await addToCook(userId);
};

const writeOperators = async (operators) => {
  operators.forEach(async (operator) => {
    await addOperator(operator);
  });
};

const addOperator = async (operator) => {
  const userId = await createNewUserManually(operator);
  await addToOperatorRole(userId);
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
  });
};

const writeOrders = async (orders) => {
  await orders.forEach(async (orderJSON) => {
    const ordererId = await getOrdererId();

    orderJSON.orderer = ordererId;

    const randomMealIds = await getRandomMealIds();

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
  });
};

const getOrdererId = async () => {
  const regulars = await RegularRoleUser.find();
  const regularIds = regulars.map((regular) => regular.id);
  return regularIds[Math.floor(Math.random() * regularIds.length)];
};

const getRandomMealIds = async () => {
  const meals = await Meal.find();
  const mealIds = meals.map((meal) => meal.id);
  return mealIds.reduce((chosenMealIds, mealId) => {
    if (Math.random() > 0.8) chosenMealIds.push(mealId);
    return chosenMealIds;
  }, []);
};

const seedMeals = async () => {
  if (!(await CookRoleUser.count())) return;
  if (await Meal.count()) return;
  const { meals } = await readJsonData("./helpers/seed/data.json");
  writeMeals(meals);
};

const seedOrders = async () => {
  if (!(await RegularRoleUser.count())) return;
  if (await Order.count()) return;
  const { orders } = await readJsonData("./helpers/seed/data.json");
  writeOrders(orders);
};

const seedUsers = async () => {
  if (await AdminRoleUser.count()) return;

  const { admins, cooks, operators, regulars } = await readJsonData(
    "./helpers/seed/data.json"
  );

  await writeAdmins(admins);
  await writeCooks(cooks);
  await writeOperators(operators);
  await writeRegulars(regulars);
};

const seedData = async () => {
  await seedUsers();
  await seedMeals();
  await seedOrders();
};

module.exports = { seedData };
