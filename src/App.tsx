import "./App.css";
import LineChart from "./components/LineChart";

const App: React.FC = () => {
  return (
    <>
      <div className="chart-container">
        <LineChart />
      </div>
    </>
  );
};

export default App;
