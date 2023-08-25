import axiosClient from "../config/axiosClient";

export const getAircraft = async (path) => {
  let aircraft;

  try {
    const { data } = await axiosClient(path);
    if (data) {
      aircraft = data;
    } else {
      aircraft = [];
    }
  } catch (error) {
    console.log(error);
  }

  return aircraft;
};

export const setAircraftCount = async (path, counter) => {
  console.log(path);
  console.log(counter);
};
