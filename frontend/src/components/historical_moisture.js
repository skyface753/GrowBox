import Chart from "react-google-charts";

const LineChartOptions = {
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

const HistoricalData = ({ groupedBySensor }) => {
  return (
    <div className="historical-data" key={"historical-div"}>
      <h1>Historical Moisture</h1>
      <div className="historical-data-graphs">
        {groupedBySensor &&
          Object.keys(groupedBySensor).map((sensorId) => {
            const sensorData = groupedBySensor[sensorId];
            const chartData = [
              ["x", "Sensor " + sensorId],
              ...sensorData.map((data) => {
                var date = new Date(0);
                date.setUTCSeconds(data.$createdAt);
                return [date, data.moisture];
              }),
            ];
            return (
              <div className="chart-container" key={"historical" + sensorId}>
                <h2>Sensor {sensorId}</h2>
                <Chart
                  width={"800px"}
                  height={"300px"}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={chartData}
                  options={LineChartOptions}
                  rootProps={{ "data-testid": "2" }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HistoricalData;
