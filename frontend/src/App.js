import logo from "./logo.svg";
import "./App.css";
import { Doughnut } from "react-chartjs-2";
import api from "./services/api";
import { useEffect, useState } from "react";
import { FlowerLoader } from "./loaders/flower_loader";

const minGoodMoisture = 300;
const maxGoodMoisture = 600;

function isGoodMoisture(moisture) {
  return moisture > minGoodMoisture && moisture < maxGoodMoisture;
}

function App() {
  const [data, setData] = useState({});
  const [lastPerSensor, setLastPerSensor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardData().then((res) => {
      setData(res.data);
      setLastPerSensor(res.data.lastPerSensor);
      setLoading(false);
    });
  }, []);

  console.log(lastPerSensor);
  if (loading) return <FlowerLoader />;

  return (
    <div className="App">
      <h1>Current Sensors</h1>
      {/* Div grid with max 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(lastPerSensor).map((sensor_id) => {
          const sensor = lastPerSensor[sensor_id];
          return (
            <div key={sensor_id} className="bg-white rounded-lg shadow-lg">
              <h2>Sensor {sensor_id}</h2>
              {isGoodMoisture(sensor.moisture) ? (
                <h3 className="text-green-500">Good</h3>
              ) : (
                <h3 className="text-red-500">Bad</h3>
              )}
            </div>
          );
        })}
      </div>
      {/* {lastPerSensor.map((sensor) => (
        <div key={sensor.sensor_id}>
          <h2>Sensor {sensor.sensor_id}</h2>
          <h3>Moisture: {sensor.moisture}</h3>
        </div>
      ))} */}
    </div>
  );
}

export default App;
