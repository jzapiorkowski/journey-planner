import React, { createContext, useState } from 'react';

export const currentRouteContext = createContext();
export const setCurrentRouteContext = createContext();

function CurrentRouteContextProvider(props) {
  const [currentRoute, setCurrentRoute] = useState([]);

  return (
    <currentRouteContext.Provider value={currentRoute}>
      <setCurrentRouteContext.Provider value={setCurrentRoute}>
        {props.children}
      </setCurrentRouteContext.Provider>
    </currentRouteContext.Provider>
  );
}

export default CurrentRouteContextProvider;
