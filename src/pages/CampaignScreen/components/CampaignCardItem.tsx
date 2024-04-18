import React from "react";
import { Campaign } from "models/Campaign";
import { StatusColors, statusColors } from "utils/ui";

interface CampaignCardItemProps {
  campaign: Campaign;
  onClick?: (campaign: Campaign) => void;
}

export const CampaignCardItem = ({
  campaign,
  onClick,
}: CampaignCardItemProps) => {
  const status = campaign.status as keyof StatusColors;

  return (
    <button
      onClick={() => onClick?.(campaign)}
      key={campaign.name}
      className="flex flex-col items-start p-4 shadow-md rounded-md w-[380px] hover:bg-slate-50 cursor-pointer"
    >
      <header className="flex items-start justify-between w-full">
        <h1 className="text-lg font-medium text-start">{campaign.name}</h1>
        <div className="flex flex-row items-center space-x-2">
          <h3 className="text-sm">Status</h3>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: statusColors[status].textColor }}
          ></div>
        </div>
      </header>

      <div className="w-full h-[0.5px] bg-muted-foreground opacity-30 mb-4 mt-2"></div>

      <div className="text-start">
        <h3 className="text-xs mb-1">Description: </h3>
        <p className="ml-4 text-muted-foreground text-xs text-start">
          {campaign.description}
        </p>
      </div>

      <div className="w-full h-[0.5px] bg-muted-foreground opacity-30 my-4"></div>

      <div className="flex flex-row items-end justify-between w-full">
        <span className="text-muted-foreground text-xs text-start">Date</span>
        <h3 className="text-xs text-muted-foreground">
          {new Date(campaign.dispatch_date).toUTCString()}
        </h3>
      </div>

      <div className="w-full h-[0.5px] bg-muted-foreground opacity-30 my-4"></div>

      <h2 className="flex items-center justify-between w-full">
        <span className="text-muted-foreground text-sm">Total Amount</span>
        <span className="text-2xl font-medium">
          {campaign.payments
            ?.map((payment) => payment.amount)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )}{" "}
          FCFA
        </span>
      </h2>
    </button>
  );
};
