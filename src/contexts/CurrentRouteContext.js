import React, { createContext, useState } from 'react';

export const currentRouteContext = createContext();
export const setCurrentRouteContext = createContext();

function CurrentRouteContextProvider(props) {
  const [currentRouteGeolocation, setCurrentRouteGeolocation] = useState([]);

  return (
    <currentRouteContext.Provider value={currentRouteGeolocation}>
      <setCurrentRouteContext.Provider value={setCurrentRouteGeolocation}>
        {props.children}
      </setCurrentRouteContext.Provider>
    </currentRouteContext.Provider>
  );
}

export default CurrentRouteContextProvider;
