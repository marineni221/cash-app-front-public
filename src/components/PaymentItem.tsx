import { Ellipsis } from "lucide-react";
import { Payment } from "models/Campaign";
// import { StatusColors } from "utils/ui";
import OMImage from "assets/wallet_providers/om.png";
import WVImage from "assets/wallet_providers/wave.png";

interface WalletProviderImage {
  om: string;
  wv: string;
}

const walletProviderImage: WalletProviderImage = {
  om: OMImage,
  wv: WVImage,
};

export const PaymentItem = ({ payment }: { payment: Payment }) => {
  // const status = payment.status as keyof StatusColors;
  const walletProviderCode = payment.walletProvider
    .code as keyof WalletProviderImage;

  return (
    <div className="mb-4 rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.1)] px-4 py-2 flex space-x-3 w-full">
      <div className="w-10 h-10">
        <img
          src={walletProviderImage[walletProviderCode]}
          className="w-full h-full object-cover"
          alt={payment.walletProvider.name}
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="font-medium text-sm">{`${
            payment.firstname.charAt(0).toUpperCase() +
            payment.firstname.slice(1).toLowerCase()
          } ${
            payment.lastname.charAt(0).toUpperCase() +
            payment.lastname.slice(1).toLowerCase()
          }`}</h2>
          <p className="text-xs text-muted-foreground">{payment.phone}</p>
        </div>

        <div>
          <h2 className="font-semibold text-end">{payment.amount} FCFA</h2>
          <p className="text-xs text-muted-foreground text-end">
            {payment.created_at}
          </p>
        </div>
      </div>

      <div className="grid place-items-center">
        <button className="bg-slate-50 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
          <Ellipsis className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
