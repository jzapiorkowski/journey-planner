import React, { createContext, useState } from 'react';

export const allRoutesGeolocationsContext = createContext();
export const addNewRouteContext = createContext();

function AllRoutesContextProvider(props) {
  const [allRoutesGeolocations, setAllRoutesGeolocations] = useState([]);

  const addNewRoute = (newRoute) => {
    setAllRoutesGeolocations([...allRoutesGeolocations, newRoute]);
  };

  return (
    <allRoutesGeolocationsContext.Provider value={allRoutesGeolocations}>
      <addNewRouteContext.Provider value={addNewRoute}>
        {props.children}
      </addNewRouteContext.Provider>
    </allRoutesGeolocationsContext.Provider>
  );
}

export default AllRoutesContextProvider;
