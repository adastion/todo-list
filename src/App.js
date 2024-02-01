import "./App.css";
import S from "./App.module.scss";
// import { connect } from "react-redux";

function App() {
  return (
    <div className={S.App}>
      <header className={S.header}>
        <h1>List</h1>
      </header>
      <main>
        <label for={"enterNewTask"}></label>
        <input id={"enterNewTask"} type={"text"} placeholder="please enter task"/>
        <ol>
          <li>task</li>
        </ol>
      </main>
    </div>
  );
}

// export default connect()(App);
export default App;
