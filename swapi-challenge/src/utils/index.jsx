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
  let info = {
    count: counter,
  };

  try {
    const { data } = await axiosClient.post(path, info);
    return data.count;
  } catch (error) {
    throw error.response;
  }
};

export const updateAircraftCount = async (path, counter) => {
  let info = {
    count: counter,
  };

  try {
    const { data } = await axiosClient.put(path, info);
    return data.count;
  } catch (error) {
    console.log(error);
  }
};
