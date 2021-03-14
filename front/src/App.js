import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

function App() {
	const [data, setData] = React.useState("");
	const fetchData = React.useCallback(async () => {
		axios.get("http://localhost:4000/").then((reponse) => setData(reponse.data));
		}, []);
	React.useEffect(() => {
		fetchData();
		}, [fetchData]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
			{data.exmapleMsg}
        </a>
      </header>
    </div>
  );
}

export default App;
