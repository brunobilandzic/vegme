import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiPlus } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import heroImage from "./vegme-bowl.jpg";
import "./public-demo.css";

const storageKey = "vegme:public-demo";
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const demoCook = "Nina";
const exampleMeals = [
  { id: "quinoa", name: "Roasted chickpea bowl", cook: demoCook, ingredients: "Quinoa, cauliflower, avocado, pickled cabbage", available: true },
  { id: "miso", name: "Miso aubergine", cook: demoCook, ingredients: "Aubergine, brown rice, spring onion, sesame", available: true },
  { id: "lentil", name: "Lemon lentil salad", cook: demoCook, ingredients: "Green lentils, cucumber, tomatoes, fresh parsley", available: true },
  { id: "mushroom", name: "Wild mushroom barley", cook: "Marko", ingredients: "Pearl barley, oyster mushrooms, spinach, thyme", available: true },
  { id: "bean", name: "Smoky butter beans", cook: "Marko", ingredients: "Butter beans, roasted tomatoes, lemon, sourdough", available: true },
  { id: "soup", name: "Carrot and ginger soup", cook: "Marko", ingredients: "Roasted carrots, ginger, coconut milk, pumpkin seeds", available: true },
];
const emptyState = { meals: exampleMeals, selected: [], day: weekdays[0], savedPlan: null };

function readDemo() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey));
    if (Array.isArray(saved?.meals) && Array.isArray(saved.selected) && weekdays.includes(saved.day)) {
      return saved;
    }
  } catch {
    // The demo can still run if browser storage is unavailable.
  }
  return emptyState;
}

export default function PublicDemo() {
  const [demo, setDemo] = useState(readDemo);
  const [view, setView] = useState("menu");
  const [filter, setFilter] = useState("");
  const [notice, setNotice] = useState("");
  const [storageFailed, setStorageFailed] = useState(false);
  const selected = demo.selected.map((id) => demo.meals.find((meal) => meal.id === id)).filter(Boolean);
  const selectedCook = selected[0]?.cook;
  const offered = demo.meals.filter((meal) => meal.available && (!filter || meal.cook === filter));

  useEffect(() => {
    document.title = "Vegme | Weekly meal subscription demo";
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(demo));
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
  }, [demo]);

  function switchView(next) {
    setView(next);
    setNotice("");
  }

  function toggleMeal(meal) {
    setNotice("");
    setDemo((current) => ({
      ...current,
      selected: current.selected.includes(meal.id)
        ? current.selected.filter((id) => id !== meal.id)
        : [...current.selected, meal.id],
    }));
  }

  function savePlan(event) {
    event.preventDefault();
    if (!selected.length) return;
    setDemo((current) => ({
      ...current,
      savedPlan: { day: current.day, meals: selected.map(({ name }) => name) },
    }));
    setNotice("Practice plan saved.");
  }

  function addMeal(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = values.get("name").trim();
    const ingredients = values.get("ingredients").trim();
    if (!name || !ingredients) {
      setNotice("Enter a meal name and its ingredients.");
      return;
    }
    const meal = { id: uuid(), name, ingredients, cook: demoCook, available: true };
    setDemo((current) => ({ ...current, meals: [...current.meals, meal] }));
    form.reset();
    setNotice(`${name} is now on the demo menu.`);
  }

  function toggleAvailability(meal) {
    setDemo((current) => ({
      ...current,
      meals: current.meals.map((item) => item.id === meal.id ? { ...item, available: !item.available } : item),
      selected: meal.available ? current.selected.filter((id) => id !== meal.id) : current.selected,
    }));
    setNotice(meal.available ? `${meal.name} was removed from the menu.` : `${meal.name} is back on the menu.`);
  }

  return (
    <div className="vegme-demo">
      <header className="vegme-header">
        <a className="vegme-brand" href="./">vegme<span>.</span></a>
        <nav className="vegme-views" aria-label="Demo views">
          <button type="button" aria-pressed={view === "menu"} onClick={() => switchView("menu")}>Meal planner</button>
          <button type="button" aria-pressed={view === "cook"} onClick={() => switchView("cook")}>Cook workspace</button>
        </nav>
      </header>

      <main className="vegme-main">
        <section className="vegme-hero" aria-labelledby="vegme-title">
          <div>
            <h1 id="vegme-title">A week of meals from local cooks.</h1>
            <p>Build a sample weekly subscription or switch to the cook workspace and put a meal on the menu.</p>
          </div>
          <img src={heroImage} width="768" height="512" alt="A bowl of roasted vegetables, chickpeas and quinoa" />
        </section>

        {storageFailed && <p className="vegme-status" role="alert">Browser storage is unavailable. Changes last until you close or reload this page.</p>}
        {notice && <p className="vegme-status" role="status">{notice}</p>}

        {view === "menu" ? (
          <div className="vegme-workspace">
            <section aria-labelledby="menu-title">
              <div className="vegme-section-head">
                <h2 id="menu-title">Browse meals</h2>
                <label>Cook <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                  <option value="">All cooks</option>
                  <option>{demoCook}</option>
                  <option>Marko</option>
                </select></label>
              </div>
              <div className="vegme-meals">
                {offered.map((meal) => {
                  const isSelected = demo.selected.includes(meal.id);
                  const differentCook = Boolean(selectedCook && selectedCook !== meal.cook);
                  return (
                    <article className="vegme-card" key={meal.id}>
                      <p className="vegme-cook">By {meal.cook}</p>
                      <h3>{meal.name}</h3>
                      <p>{meal.ingredients}</p>
                      <button type="button" className="vegme-button secondary" disabled={differentCook} aria-label={`${isSelected ? "Remove" : "Add"} ${meal.name}`} onClick={() => toggleMeal(meal)}>
                        {isSelected ? <FiCheck aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                        {isSelected ? "Added" : "Add to plan"}
                      </button>
                    </article>
                  );
                })}
                {!offered.length && <p>No meals are offered by this cook.</p>}
              </div>
            </section>

            <aside className="vegme-panel" aria-labelledby="plan-title">
              <h2 id="plan-title">Your weekly plan</h2>
              <p>Choose meals from one cook per subscription.</p>
              {selected.length ? (
                <ul className="vegme-selection">
                  {selected.map((meal) => <li key={meal.id}>
                    {meal.name}
                    <button type="button" onClick={() => toggleMeal(meal)} aria-label={`Remove ${meal.name} from plan`}>Remove</button>
                  </li>)}
                </ul>
              ) : <p className="vegme-empty">Add a meal to get started.</p>}
              <form onSubmit={savePlan} className="vegme-form">
                <label>Delivery day
                  <select value={demo.day} onChange={(event) => {
                    const day = event.target.value;
                    setDemo((current) => ({ ...current, day }));
                    setNotice("");
                  }}>
                    {weekdays.map((day) => <option key={day}>{day}</option>)}
                  </select>
                </label>
                <button className="vegme-button" type="submit" disabled={!selected.length}>Save practice plan <FiArrowRight aria-hidden="true" /></button>
              </form>
              {demo.savedPlan && <p className="vegme-saved"><strong>Saved plan</strong><br />{demo.savedPlan.day} · {demo.savedPlan.meals.join(", ")}</p>}
            </aside>
          </div>
        ) : (
          <div className="vegme-workspace">
            <section aria-labelledby="cook-title">
              <h2 id="cook-title">{demoCook}’s menu</h2>
              <div className="vegme-meals">
                {demo.meals.filter((meal) => meal.cook === demoCook).map((meal) => (
                  <article className="vegme-card" key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>{meal.ingredients}</p>
                    <button type="button" className="vegme-button secondary" onClick={() => toggleAvailability(meal)}>
                      {meal.available ? "Remove from menu" : "Offer meal"}
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <aside className="vegme-panel" aria-labelledby="add-meal-title">
              <h2 id="add-meal-title">Add a meal</h2>
              <form onSubmit={addMeal} className="vegme-form">
                <label>Meal name <input name="name" required maxLength={60} /></label>
                <label>Ingredients <textarea name="ingredients" required maxLength={180} rows={3} /></label>
                <button type="submit" className="vegme-button"><FiPlus aria-hidden="true" /> Add to menu</button>
              </form>
            </aside>
          </div>
        )}

        <section className="vegme-about" aria-labelledby="vegme-about-title">
          <h2 id="vegme-about-title">About this demo</h2>
          <p>Vegme is a peer-to-peer meal subscription app. The full version uses React, Express and MongoDB and includes account access, cook and customer workflows, and role-based administration.</p>
          <p>This public preview uses fictional meals and cooks. Practice changes stay in this browser. OpenAI Codex assisted with the demo and its meal illustration.</p>
        </section>
      </main>
    </div>
  );
}
