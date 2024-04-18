import { Binary, Filter, Wallet } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DashedCard } from "../../components/DashedCard";
import { DispatchTypes } from "models/Campaign";
import OMImage from "assets/wallet_providers/om.png";
import WVImage from "assets/wallet_providers/wave.png";

interface DispatchTypeProps {
  setValidDispatchType: Dispatch<SetStateAction<boolean>>;
  next: boolean;
  onNext: (dispatchType: DispatchTypes, walletProvider?: string) => void;
  createCampaignCompleted: boolean;
}

export const DispatchType = ({
  setValidDispatchType,
  next,
  onNext,
  createCampaignCompleted,
}: DispatchTypeProps) => {
  const [selectedDispatchTypes, setSelectedDispatchTypes] =
    useState<DispatchTypes>();
  const [walletProvider, setWalletProvider] = useState<string>("");

  useEffect(() => {
    if (
      selectedDispatchTypes === DispatchTypes.wallet &&
      !walletProvider.length
    ) {
      setValidDispatchType(false);
      return;
    }

    if (selectedDispatchTypes) {
      setValidDispatchType(true);
    }
  }, [selectedDispatchTypes]);

  useEffect(() => {
    if (
      selectedDispatchTypes === DispatchTypes.wallet &&
      walletProvider.length
    ) {
      setValidDispatchType(true);
    }
  }, [walletProvider]);

  React.useEffect(() => {
    if (!next) {
      return;
    }

    if (selectedDispatchTypes === DispatchTypes.wallet) {
      onNext(selectedDispatchTypes, walletProvider);
    } else {
      onNext(selectedDispatchTypes as DispatchTypes);
    }
  }, [next]);

  useEffect(() => {
    if (createCampaignCompleted) {
      setSelectedDispatchTypes(undefined);
      setWalletProvider("");
    }
  }, [createCampaignCompleted]);

  return (
    <div>
      <div className="flex items-center justify-center flex-wrap">
        <h1 className="text-center font-medium text-lg">
          Choose a dispatch type
        </h1>

        <DashedCard
          width={620}
          active={selectedDispatchTypes === DispatchTypes.wallet}
          icon={
            <Wallet
              className={`w-8 h-8 ${
                selectedDispatchTypes === DispatchTypes.wallet
                  ? "text-white"
                  : "text-muted-foreground"
              }`}
            />
          }
          title="Wallet"
          description="Allows you to make transactions using your Orange Money, Wave account. The user must have an active account on the specified e-wallet service to make and receive payments."
          onClick={() => setSelectedDispatchTypes(DispatchTypes.wallet)}
        />

        <div
          className={`flex items-center rounded-md justify-evenly w-[620px] transition-transform duration-400 ${
            selectedDispatchTypes === DispatchTypes.wallet
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-4 opacity-0 invisible"
          } ${
            selectedDispatchTypes !== DispatchTypes.wallet
              ? "h-0 overflow-hidden"
              : "h-[100px]"
          }`}
        >
          <button
            onClick={() => setWalletProvider("om")}
            className={`block w-[200px] cursor-pointer hover:bg-slate-100 transition-colors duration-150 ${
              walletProvider === "om" ? "bg-slate-200" : "bg-white"
            } shadow-md rounded-md px-4 py-2 flex items-center space-x-3 `}
          >
            <img
              className="w-[60px] h-[60px]"
              src={OMImage}
              alt="Orange Money"
            />
            <span>Orange Money</span>
          </button>
          <button
            onClick={() => setWalletProvider("wv")}
            className={`block w-[200px] cursor-pointer hover:bg-slate-100 transition-colors duration-150 ${
              walletProvider === "wv" ? "bg-slate-200" : "bg-white"
            } shadow-md rounded-md px-4 py-2 flex items-center space-x-3 `}
          >
            <img className="w-[60px] h-[60px]" src={WVImage} alt="Wave" />
            <span>Wave</span>
          </button>
        </div>

        <DashedCard
          width={620}
          active={selectedDispatchTypes === DispatchTypes.code}
          icon={
            <Binary
              className={`w-8 h-8 ${
                selectedDispatchTypes === DispatchTypes.code
                  ? "text-white"
                  : "text-muted-foreground"
              }`}
            />
          }
          title="By Code"
          description=" Sending by code allows the user to carry out transactions without the need for a specific account on an e-wallet service. Instead, the user receives a unique code that can be shared with the recipient. The recipient can then use this code to retrieve the funds from a specified point-of-service or payment provider."
          onClick={() => setSelectedDispatchTypes(DispatchTypes.code)}
        />

        <DashedCard
          width={620}
          active={selectedDispatchTypes === DispatchTypes.hybrid}
          icon={
            <Filter
              className={`w-8 h-8 ${
                selectedDispatchTypes === DispatchTypes.hybrid
                  ? "text-white"
                  : "text-muted-foreground"
              }`}
            />
          }
          title="Hybrid"
          description="Hybrid dispatch gives a smart system choose between e-wallet and code dispatch, depending on their if the contact has or not a wallet provider and the options available."
          onClick={() => setSelectedDispatchTypes(DispatchTypes.hybrid)}
        />
      </div>
    </div>
  );
};
