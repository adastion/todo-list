import { Counter } from "./componenets/Counter/Counter";


function App() {
  return (
    <div>
      <header>
        <h1>List</h1>
      </header>
      <main>
        <label for={"enterNewTask"}></label>
        <input
          id={"enterNewTask"}
          type={"text"}
          placeholder="please enter task"
        />
        <button>add task</button>
        <ol>
          <li>task</li>
        </ol>
      </main>
      <Counter />
    </div>
  );
}

export default App;
