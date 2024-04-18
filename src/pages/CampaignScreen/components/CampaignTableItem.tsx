import React from "react";
import { TableCell, TableRow } from "components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Campaign, Payment } from "models/Campaign";
import { StatusColors, statusColors } from "utils/ui";
import { formatAmount, statusTexts } from "helpers/helpers";

interface CampaignTableItemProps {
  campaign: Campaign;
  onClick?: () => void;
}

export const CampaignTableItem = ({ campaign, onClick }: CampaignTableItemProps) => {
  const status = campaign.status as keyof StatusColors;

  const payments = campaign.payments as Payment[];
  const totalAmount = payments
    .map((payment) => payment.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const formattedAmount = formatAmount(totalAmount.toString());

  return (
    <TableRow className="cursor-pointer" key={campaign.name} onClick={onClick}>
      <TableCell className="font-medium">{campaign.name}</TableCell>
      <TableCell>{new Date(campaign.dispatch_date).toUTCString()}</TableCell>
      <TableCell>
        <span
          className="px-[6px] py-[1.5px] rounded-3xl text-xs font-medium"
          style={{
            color: statusColors[status].textColor,
            backgroundColor: statusColors[status].bgColor,
          }}
        >
          {statusTexts[status]}
        </span>
      </TableCell>
      <TableCell className="text-right">{formattedAmount} XOF</TableCell>
      <TableCell className="flex space-x-1 justify-end">
        <div className="group w-8 h-8 bg-gray-100 grid place-items-center rounded-md cursor-pointer">
          <Edit className="text-gray-400 w-5 h-5 group-hover:text-yellow-500 duration-200" />
        </div>
        <div className="group w-8 h-8 bg-gray-100 grid place-items-center rounded-md cursor-pointer">
          <Trash2 className="text-gray-400 w-5 h-5 group-hover:text-primary duration-200" />
        </div>
      </TableCell>
    </TableRow>
  );
};
