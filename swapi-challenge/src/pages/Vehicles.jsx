import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getAircraft } from "../utils";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const listVehicles = async () => {
      let vehicles = await getAircraft("/vehicles");
      setVehicles(vehicles);
    };
    listVehicles();
  }, []);

  return (
    <div className="h-5/6 overflow-y-scroll">
      <div className="max-h-max flex flex-col justify-center items-center">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id} aircraft={vehicle} />
          ))
        ) : (
          <h2>There are no vehicles at the moment</h2>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
