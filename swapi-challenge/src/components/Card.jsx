import { useState } from "react";
import { setAircraftCount, updateAircraftCount } from "../utils";

const Card = ({ aircraft }) => {
  const { id, name, model, count } = aircraft;
  const [counter, setCounter] = useState(0);
  const [inventory, setInventory] = useState(count);
  const [errorMsg, setErrorMsg] = useState("");
  let path = `/vehicles/${id}`;

  const handleSet = async () => {
    try {
      const newInventory = await setAircraftCount(path, Number(counter));
      setInventory(newInventory);
      setCounter(0);
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  };

  const handleUpdateCount = async () => {
    const newInventory = await updateAircraftCount(path, Number(counter));
    setInventory(newInventory);
    setCounter(0);
  };

  return (
    <>
      <div className="border-4 border-black rounded-2xl my-7 drop-shadow-lg flex flex-col justify-between items-center w-3/6 p-7 gap-5">
        <p className="w-11/12 text-xl font-semibold ">{`Vehicle ${name}, model ${model} has an inventory of ${
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
            className="rounded-md text-white font-semibold p-2 uppercase bg-cyan-300 w-5/6"
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
