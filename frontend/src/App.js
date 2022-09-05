import logo from "./logo.svg";
import "./App.css";
import { Doughnut } from "react-chartjs-2";
import api from "./services/api";
import { useEffect, useState } from "react";
import { FlowerLoader } from "./loaders/flower_loader";
import SensorBar from "./components/sensor_bar";
// import Chart from "react-apexcharts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HistoricalData from "./components/historical_moisture";
import AirBar from "./components/air_bar";
import { client as wsClient } from "./services/api";

const minGoodMoisture = 300;
const maxGoodMoisture = 600;

function isGoodMoisture(moisture) {
  return moisture > minGoodMoisture && moisture < maxGoodMoisture;
}

function App() {
  // const [data, setData] = useState({});
  const [groupedBySensor, setGroupedBySensor] = useState({});
  const [lastPerSensor, setLastPerSensor] = useState({});
  const [lastAirData, setLastAirData] = useState({});
  const [allAirData, setAllAirData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    api.getMoistureDashboardData().then((res) => {
      // setData(res.data);
      setLastPerSensor(res.lastPerSensor);
      const reversedGroup = res.groupedBySensor;
      setGroupedBySensor(res.groupedBySensor);

      setLoading(false);
    });
    api.getAirDashboardData().then((res) => {
      setLastAirData(res.latest);
      setAllAirData(res.all);
    });
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
    // wsClient.onopen = () => {
    //   console.log("WebSocket Client Connected");
    // };
    // wsClient.onmessage = (message) => {
    //   console.log("Refresh data after websocket message");
    //   loadData();
    //   // const dataFromServer = JSON.parse(message.data);
    //   // console.log("got reply! ", dataFromServer);

    //   // console.log(message);
    // };
    // wsClient.send("Hello");
  }, []);

  console.log(lastPerSensor);
  if (loading) return <FlowerLoader />;

  return (
    <div className="App">
      <h1>Current Sensors</h1>
      {/* Div grid with max 3 columns */}
      <SensorBar sensorList={Object.values(lastPerSensor)} />
      <AirBar latest={lastAirData} all={allAirData} />
      {/* <Chart
        width={"700px"}
        height={"410px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={LineData}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      /> */}
      <HistoricalData groupedBySensor={groupedBySensor} key={"historical"} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(lastPerSensor).map((sensor_id) => {
          const sensor = lastPerSensor[sensor_id];
          return <SensorBar data={sensor} key={sensor_id} />;
          // return (
          //   <div key={sensor_id} className="bg-white rounded-lg shadow-lg">
          //     <h2>Sensor {sensor_id}</h2>
          //     {isGoodMoisture(sensor.moisture) ? (
          //       <h3 className="text-green-500">Good</h3>
          //     ) : (
          //       <h3 className="text-red-500">Bad</h3>
          //     )}
          //   </div>
          // );
        })}
      </div> */}
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
