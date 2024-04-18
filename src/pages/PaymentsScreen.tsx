import { formatAmount } from "helpers/helpers";
import { X } from "lucide-react";
import { Campaign } from "models/Campaign";
import { PaymentItem } from "components/PaymentItem";

interface PaymentsScreenProps {
  campaign: Campaign;
  onClose: () => void;
}

export const PaymentsScreen = ({ campaign, onClose }: PaymentsScreenProps) => {
  const totalAmount = campaign.payments
    ?.map((payment) => payment.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  const formattedAmount = formatAmount(totalAmount?.toString() as string);

  return (
    <div className="font-poppins relative w-[768px] bg-white rounded-lg p-6 max-h-[95vh]">
      <button
        onClick={onClose}
        className="absolute right-3 top-4 p-1 bg-slate-100 hover:bg-slate-200 transition-colors duration-150 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>
      <h1 className="text-xl font-medium">{campaign.name}</h1>
      <p className="my-4 text-muted-foreground text-sm">
        {campaign.description}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">Date: </span>
          <span className="text-sm">
            {new Date(campaign.dispatch_date).toUTCString()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm">Total Amount: </span>
          <span className="text-xl font-medium">{formattedAmount} XOF</span>
        </div>
      </div>

      <h1 className="text-2xl font-medium mt-6">Recipients</h1>
      <div className="max-h-[70vh] p-2 overflow-y-scroll">
        {campaign?.payments?.map((payment) => (
          <PaymentItem key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
};
