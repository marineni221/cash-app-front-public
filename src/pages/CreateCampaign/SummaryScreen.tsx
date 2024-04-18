import React from "react";
import { Campaign, DispatchTypes } from "models/Campaign";
import ExcelLogo from "assets/microsoft-excel-logo.svg";
import { bytesToKilobytes, bytesToMegabytes } from "helpers/helpers";
import OMImage from "assets/wallet_providers/om.png";
import WVImage from "assets/wallet_providers/wave1.webp";

interface SummaryScreenProps {
  campaign: Campaign;
}

const SummaryScreen = ({ campaign }: SummaryScreenProps) => {
  return (
    <div className="font-poppins">
      <h1 className="font-medium text-center mb-10 text-xl underline underline-offset-8">
        Campaign Details
      </h1>

      <div className="grid grid-cols-3">
        <span className="text-muted-foreground text-sm">Campaign name</span>
        <span className="col-span-2 text-sm">{campaign.name}</span>
      </div>

      <div className="h-[0.5px] my-8 w-full bg-muted-foreground opacity-40"></div>

      <div className="grid grid-cols-3">
        <span className="text-muted-foreground text-sm">Description</span>
        <span className="col-span-2 text-sm">{campaign.description}</span>
      </div>

      <div className="h-[0.5px] my-8 w-full bg-muted-foreground opacity-40"></div>

      <div className="grid grid-cols-3">
        <span className="text-muted-foreground text-sm">Date and hour</span>
        <span className="col-span-2 text-sm">
          {campaign.dispatch_date === "now"
            ? "Now"
            : new Date(campaign.dispatch_date.toString()).toUTCString()}
        </span>
      </div>

      <div className="h-[0.5px] my-8 w-full bg-muted-foreground opacity-40"></div>

      <div className="grid grid-cols-3">
        <span className="text-muted-foreground text-sm">Contact File</span>
        <div className="flex items-center justify-between col-span-2">
          <div className="flex items-center space-x-2">
            <img className="w-4 h-4" src={ExcelLogo} alt="Logo Excel" />
            <span className="text-sm">{campaign.contacts_file?.name}</span>
          </div>

          <span className="text-sm">
            {bytesToMegabytes(campaign.contacts_file?.size as number) < 1
              ? bytesToKilobytes(campaign.contacts_file?.size as number)
                  .toFixed(2)
                  .toString() + " KB"
              : bytesToMegabytes(campaign.contacts_file?.size as number)
                  .toFixed(2)
                  .toString() + " MB"}{" "}
          </span>
        </div>
      </div>

      <div className="h-[0.5px] my-8 w-full bg-muted-foreground opacity-40"></div>

      <div className="grid grid-cols-3">
        <span className="text-muted-foreground text-sm">Dispatch Type</span>
        <span className="col-span-2 text-sm">{campaign.dispatch_type}</span>
      </div>

      <div className="h-[0.5px] my-8 w-full bg-muted-foreground opacity-40"></div>

      {campaign.dispatch_type === DispatchTypes.wallet && (
        <div className="grid grid-cols-3">
          <span className="text-muted-foreground text-sm">Wallet Provider</span>
          <div className="flex items-center space-x-3">
            <img
              className="w-8 h-8 shadow-md rounded-full"
              src={campaign.wallet_provider === "om" ? OMImage : WVImage}
              alt={campaign.wallet_provider === "om" ? "Orange Money" : "Wave"}
            />
            <span className="col-span-2 text-sm font-medium">
              {campaign.wallet_provider === "om" ? "Orange Money" : "Wave"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryScreen;
