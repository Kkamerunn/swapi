import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getAircraft } from "../utils";
import Spinner from "../components/Spinner";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const listVehicles = async () => {
      setLoading(true);
      try {
        let vehicles = await getAircraft("/vehicles");
        setVehicles(vehicles);
      } catch (error) {
        setErrorMsg(error.data.message);
      }
      setLoading(false);
    };
    listVehicles();
  }, []);

  return (
    <>
      <div className="h-5/6 overflow-y-scroll">
        <div className="max-h-max flex flex-col justify-center items-center">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Card key={vehicle.id} aircraft={vehicle} route={"vehicles"} />
            ))
          ) : (
            <h2>There are no vehicles at the moment</h2>
          )}
        </div>
      </div>
      {loading && (
        <div className="absolute inset-2/4">
          <Spinner />
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-500 flex items-center p-3 rounded-md">
          <p className="text-white font-bold text-center">{errorMsg}</p>
        </div>
      )}
    </>
  );
};

export default Vehicles;
