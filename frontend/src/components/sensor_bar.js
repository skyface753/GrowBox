const SensorBar = ({ sensorList }) => {
  return (
    <div className="sensor-bar">
      {sensorList.map((sensor) => (
        <SensorBarElement data={sensor} key={sensor.sensor_id} />
      ))}
    </div>
  );
};

const SensorBarElement = ({ data }) => {
  const minGoodMoisture = 300;
  const maxGoodMoisture = 600;
  const isGoodMoisture = (moisture) => {
    return moisture >= minGoodMoisture && moisture <= maxGoodMoisture;
  };
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <h2>Sensor {data.sensor_id}</h2>
      {isGoodMoisture(data.moisture) ? (
        <h3 className="text-green-500">{data.moisture}</h3>
      ) : (
        <h3 className="text-red-500">{data.moisture}</h3>
      )}
    </div>
  );
};

export default SensorBar;
