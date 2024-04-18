import { Campaign, DispatchTypes } from "models/Campaign";
import React, { useState, useMemo, Dispatch, SetStateAction } from "react";

interface CampagneCreatedContextProps {
  createdCampagne: Campaign;
  setCreatedCampagne: Dispatch<SetStateAction<Campaign>>;
  resetCampaign: () => void;
}

export const CampagneCreatedContext =
  React.createContext<CampagneCreatedContextProps>({
    createdCampagne: {
      name: "",
      description: "",
      account_id: 3,
      dispatch_date: "",
      dispatch_type: DispatchTypes.wallet,
      filename: "",
      wallet_provider: "",
    },
    setCreatedCampagne: () => {},
    resetCampaign: () => {},
  });

/** ======================================================================================= */

interface CampagneCreatedProviderProps {
  children: React.ReactNode;
}

export const CampagneCreatedProvider: React.FC<
  CampagneCreatedProviderProps
> = ({ children }) => {
  const [createdCampagne, setCreatedCampagne] = useState<Campaign>({
    name: "",
    description: "",
    account_id: 3,
    dispatch_date: "",
    dispatch_type: DispatchTypes.wallet,
    filename: "",
    wallet_provider: "",
  });

  const resetCampaign = () => {
    setCreatedCampagne({
      name: "",
      description: "",
      account_id: 3,
      dispatch_date: "",
      dispatch_type: DispatchTypes.wallet,
      filename: "",
      wallet_provider: "",
    });
  };

  const memoizedCreatedCampaign = useMemo(
    () => ({
      createdCampagne,
      setCreatedCampagne,
      resetCampaign,
    }),
    [createdCampagne]
  );

  return (
    <CampagneCreatedContext.Provider value={memoizedCreatedCampaign}>
      {children}
    </CampagneCreatedContext.Provider>
  );
};
