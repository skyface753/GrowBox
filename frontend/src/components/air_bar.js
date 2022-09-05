import Chart from "react-google-charts";

const humidityCharOptions = {
  title: "Humidity",
  hAxis: {
    title: "Time",
  },
  vAxis: {
    title: "Popularity",
  },
  series: {
    1: { curveType: "function" },
  },
};

const temperaturCharOptions = {
  title: "Temperatur",
  hAxis: {
    title: "Time",
  },
  vAxis: {
    title: "Popularity",
  },
  series: {
    1: { curveType: "function" },
  },
};

const AirBar = ({ latest, all }) => {
  var date = new Date(0);
  date.setUTCSeconds(latest.$createdAt);
  console.log(all);
  const humidityChartData = [
    ["x", "Humidity"],
    ...all.map((data) => {
      var date = new Date(0);
      date.setUTCSeconds(data.$createdAt);
      return [date, data.humidity];
    }),
  ];
  const temperaturChartData = [
    ["x", "Temperatur"],
    ...all.map((data) => {
      var date = new Date(0);
      date.setUTCSeconds(data.$createdAt);
      return [date, data.temperatur];
    }),
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2>Air</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="flex flex-row justify-between">
          <div>
            <h3>Temperatur: {latest.temperatur} °C</h3>
            <h3>Humidity: {latest.humidity} %</h3>
          </div>
          <div>
            <h3>Updated at: {date.toLocaleString()}</h3>
          </div>
        </div>

        <Chart
          //   width={"800px"}
          //   height={"500px"}

          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={humidityChartData}
          options={humidityCharOptions}
          rootProps={{ "data-testid": "2" }}
        />
        <Chart
          //   width={"800px"}
          //   height={"500px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={temperaturChartData}
          options={temperaturCharOptions}
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    </div>
  );
};

export default AirBar;
