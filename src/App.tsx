import "./App.css";
import LineChart from "./components/LineChart";

const App: React.FC = () => {
  return (
    <>
      <div className="chart-container" data-testid="chart-container">
        <LineChart />
      </div>
    </>
  );
};

export default App;
