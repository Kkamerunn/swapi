import { useState } from "react";
import { setAircraftCount } from "../utils";

const Card = ({ aircraft }) => {
  const [counter, setCounter] = useState(0);
  const { id, name, model, count } = aircraft;

  const handleSet = () => {
    let path = `/vehicles/${id}`;
    setAircraftCount(path, counter);
  };

  return (
    <div className="border-4 border-black rounded-2xl my-7 drop-shadow-lg flex flex-col justify-between items-center w-3/6 p-7 gap-5">
      <p className="w-11/12 text-xl font-semibold ">{`Vehicle ${name} model ${model} inventory of ${
        count === null ? "0" : count
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
        <button className="rounded-md text-white font-semibold p-2 uppercase bg-cyan-300 w-5/6">
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
  );
};

export default Card;
