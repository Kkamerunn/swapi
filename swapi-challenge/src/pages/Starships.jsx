import { useState, useEffect } from "react";
import Card from "../components/Card";
import { getAircraft } from "../utils";
import Spinner from "../components/Spinner";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const listStarships = async () => {
      setLoading(true);
      try {
        let starships = await getAircraft("/starships");
        setStarships(starships);
      } catch (error) {
        setErrorMsg(error.data.message);
      }
      setLoading(false);
    };
    listStarships();
  }, []);

  return (
    <>
      <div className="h-5/6 overflow-y-scroll">
        <div className="max-h-max flex flex-col justify-center items-center">
          {starships.length > 0 ? (
            starships.map((starship) => (
              <Card key={starship.id} aircraft={starship} route={"starships"} />
            ))
          ) : (
            <h2>There are no starships at the moment</h2>
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

export default Starships;
