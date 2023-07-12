import React, { createContext, useContext } from "react";

type SdkContextType = {
  getPlatform: () => string;
};

const SdkContext = createContext<SdkContextType | undefined>(undefined);

export const SdkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SdkContext.Provider value={{ getPlatform: () => "Pandora" }}>
      {children}
    </SdkContext.Provider>
  );
};

export const useSdk = (): SdkContextType => {
  const context = useContext(SdkContext);

  if (!context) {
    throw new Error("useSdk must be used within a SdkProvider");
  }

  return context;
};
