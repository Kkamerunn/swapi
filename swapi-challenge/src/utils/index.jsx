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
    throw error.response;
  }

  return aircraft;
};

export const updateAircraftCount = async (path, counter, method) => {
  let info = {
    count: counter,
  };

  try {
    const { data } = await axiosClient[method](path, info);
    return data.count;
  } catch (error) {
    throw error.response;
  }
};
