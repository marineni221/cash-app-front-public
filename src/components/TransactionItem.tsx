import { Card, CardContent, CardHeader } from "./ui/card";
import { Copy } from "lucide-react";
import { Payment } from "models/Campaign";
import { StatusColors, statusColors } from "utils/ui";
import BlankImage from "assets/avatars/blank.png";

export const TransactionItem = ({ transaction }: { transaction: Payment }) => {
  const status = transaction.status as keyof StatusColors;

  return (
    <Card
      className="shadow-sm rounded-l-none m-6 border-t-0 border-b-0 border-r-0"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: statusColors[status].textColor,
      }}
    >
      <CardHeader
        className={`py-3`}
        style={{ backgroundColor: statusColors[status].bgColor }}
      >
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full">
              <img
                src={BlankImage}
                className="rounded-full w-full h-full object-cover"
                alt="Receiver Profile"
              />
            </div>
            <span className="">{`${transaction.firstname} ${transaction.lastname}`}</span>
          </div>
          <span>
            Amount:{" "}
            <strong className="font-semibold text-xl">
              {transaction.amount} XOF
            </strong>
          </span>
        </div>
      </CardHeader>
      <CardContent className="mt-4 flex justify-between items-center pb-2">
        <div className="mt-2">
          <div>
            <div className="text-muted-foreground text-sm mb-1">Phone</div>
            <div className="text-sm">{transaction.phone}</div>
          </div>

          <div className="mt-4">
            <div className="text-muted-foreground text-xs mb-1">
              Transaction ID
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm">{transaction.reference}</span>
              <Copy className="w-4 h-4 text-secondary hover:text-muted-foreground cursor-pointer" />
            </div>
          </div>

          <div className="mt-4 flex space-x-2 items-center">
            <div className="text-muted-foreground text-sm mb-1">Status: </div>
            <div
              className="px-[8px] py-[1px] rounded-3xl text-xs flex items-center justify-center font-medium"
              style={{
                color: statusColors[status].textColor,
                backgroundColor: statusColors[status].bgColor,
              }}
            >
              {transaction.status}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div>
            <div className="text-muted-foreground text-xs mb-1">Date</div>
            <div className="text-sm">{transaction.created_at}</div>
          </div>

          <div className="mt-4">
            <div className="text-muted-foreground text-xs mb-1">Method</div>
            <div className="text-sm">By {transaction.walletProvider.name}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
