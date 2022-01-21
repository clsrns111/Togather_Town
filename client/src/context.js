import React, { createContext, useState } from "react"; // createContext를 불러온다.

export const PositionContextStore = createContext();

export const PositionContext = ({ children }) => {
  const [objectPostion, setobjectPostion] = useState("123");

  return (
    <PositionContextStore.Provider value={[objectPostion, setobjectPostion]}>
      {children}
    </PositionContextStore.Provider>
  );
};
