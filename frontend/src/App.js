import logo from "./logo.svg";
import "./App.css";
import { Doughnut } from "react-chartjs-2";
import api from "./services/api";
import { useEffect, useState } from "react";
import { FlowerLoader } from "./loaders/flower_loader";
import SensorBar from "./components/sensor_bar";
import Chart from "react-apexcharts";

const minGoodMoisture = 300;
const maxGoodMoisture = 600;

const testData = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

function isGoodMoisture(moisture) {
  return moisture > minGoodMoisture && moisture < maxGoodMoisture;
}

function App() {
  const [data, setData] = useState({});
  const [graphData, setGraphData] = useState(testData);
  const [lastPerSensor, setLastPerSensor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardData().then((res) => {
      setData(res.data);
      setLastPerSensor(res.data.lastPerSensor);
      const reversed = res.data.all.reverse();
      setGraphData({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            // TODO: Single xaxis for all sensors
            categories: reversed.map((item) => {
              var d = new Date(0);
              d.setUTCSeconds(item.$createdAt);
              return d.toLocaleString();
            }),
          },
        },
        series: [
          {
            name: "series-1",
            data: reversed.map((item) => item.moisture),
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  console.log(lastPerSensor);
  if (loading) return <FlowerLoader />;

  return (
    <div className="App">
      <h1>Current Sensors</h1>
      {/* Div grid with max 3 columns */}
      <SensorBar sensorList={Object.values(lastPerSensor)} />
      <Chart
        options={graphData.options}
        series={graphData.series}
        type="line"
        width="500"
        height="300"
      />
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
