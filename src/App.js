import { useState } from "react";
import "./App.css";

import Select from "./components/Select";

const COLORS = ["red", "yellow", "green", "blue"];

const COMPONENTS = [
  { title: "Button", path: "demo-button" },
  { title: "Selection Control", path: "demo-selection-control" },
  { title: "Input", path: "demo-input" },
  { title: "Snackbar", path: "demo-snack-bar" },
  { title: "Chips", path: "demo-chips" },
  { title: "Progress Tabs", path: "demo-progress-tabs" },
  { title: "Typography", path: "demo-typography" },
  { title: "Card", path: "demo-card" },
  { title: "Pagination", path: "demo-wip" },
  { title: "Progress Tabs 2", path: "demo-wip" },
];

function App() {
  const [result1, setResult1] = useState("");

  const [result2, setResult2] = useState("");

  console.log(result1, result2);

  const str = result1 + (result1 && result2 ? " - " : " ") + result2;

  return (
    <div className="App">
      <div className="App_Header">Dropdown with search</div>
      <div className="App_SUbtitle">Default</div>
      <div className="App_Gap">
        <Select
          searchable={false}
          options={COLORS}
          title="Colours"
          output={(value) => setResult1(value)}
        />
      </div>

      <div className="App_SUbtitle">DropDown</div>
      <div className="App_Gap">
        <Select
          options={COMPONENTS}
          multiselect={true}
          output={(value) => setResult2(value)}
        />
      </div>

      <div className="App_SUbtitle">Result</div>
      <div>
        <Select title={str} multiselect={true} searchable={false} />
      </div>
    </div>
  );
}

export default App;
