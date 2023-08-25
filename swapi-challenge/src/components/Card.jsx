import { useState } from "react";
import { updateAircraftCount } from "../utils";

const Card = ({ aircraft, route }) => {
  const { id, name, model, count } = aircraft;
  const [counter, setCounter] = useState(0);
  const [inventory, setInventory] = useState(count);
  const [errorMsg, setErrorMsg] = useState("");
  let path = `/${route}/${id}`;

  const handleSet = async () => {
    try {
      const newInventory = await updateAircraftCount(
        path,
        Number(counter),
        "post"
      );
      setInventory(newInventory);
      setCounter(0);
    } catch (error) {
      setErrorMsg(error.data.message);
    }

    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  const handleUpdateCount = async () => {
    try {
      const newInventory = await updateAircraftCount(
        path,
        Number(counter),
        "put"
      );
      setInventory(newInventory);
      setCounter(0);
    } catch (error) {
      setErrorMsg(error.data.message);
    }

    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  return (
    <>
      <div className="border-4 border-black rounded-2xl my-7 drop-shadow-lg flex flex-col justify-between items-center w-3/6 p-7 gap-5">
        <p className="w-11/12 text-xl font-semibold ">{`${name}, model ${model} has an inventory of ${
          inventory === null ? counter : inventory
        }`}</p>
        <div className="w-11/12 flex items-center justify-center gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="counter" className="text-xs">
              Set the amount of aircrafts to set or increment/decrement
            </label>
            <input
              id="counter"
              name="counter"
              type="number"
              className="w-5/6 p-2"
              placeholder="set the amount of aircrafts"
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdateCount}
            disabled={inventory === null ? true : false}
            className={`${
              inventory === null ? "bg-cyan-200" : "bg-cyan-600"
            } rounded-md text-white font-semibold p-2 uppercase w-5/6`}
          >
            increment/decrement
          </button>
          <button
            onClick={handleSet}
            className="rounded-md text-white font-semibold p-2 uppercase bg-green-500 w-5/6"
          >
            set
          </button>
        </div>
      </div>
      {errorMsg && (
        <div className="bg-red-500 flex items-center p-3 rounded-md">
          <p className="text-white font-bold text-center">{errorMsg}</p>
        </div>
      )}
    </>
  );
};

export default Card;
