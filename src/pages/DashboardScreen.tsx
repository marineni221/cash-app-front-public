import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { CircleDashed, Copy, Edit, History, Repeat1 } from "lucide-react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import orangeBG from "assets/gradient4.jpg";
import blueBG from "assets/gradient5.jpg";
import avatar1 from "assets/avatars/300-1.jpg";
import avatar2 from "assets/avatars/300-10.jpg";
import avatar3 from "assets/avatars/300-11.jpg";
import avatar4 from "assets/avatars/300-12.jpg";
import avatar5 from "assets/avatars/300-13.jpg";
import avatar6 from "assets/avatars/300-14.jpg";
import avatar7 from "assets/avatars/300-15.jpg";
import avatar8 from "assets/avatars/300-16.jpg";
import avatar9 from "assets/avatars/300-17.jpg";
import avatar10 from "assets/avatars/300-18.jpg";

Chart.register(CategoryScale);

enum PaymentMethod {
  code = "code",
  wallet = "wallet",
  hybrid = "hybrid",
}

enum TransactionStatus {
  success = "success",
  failed = "failed",
  pending = "pending",
}

interface ITransaction {
  id: string;
  from: string;
  to: string;
  toImage: string;
  transactionStatus: TransactionStatus;
  amount: number;
  method: PaymentMethod;
  date: string;
}

const data = [
  {
    name: "CPMN001",
    comments: "This is a comment about a campaign.",
    state: "In progress",
    date: "2024-02-01",
    amount: 2500,
    color: "#ffb703",
    bgColor: "#FEF9E7",
  },
  {
    name: "CPMN002",
    comments: "This is a comment about a campaign.",
    state: "Rejected",
    date: "2023-12-29",
    amount: 165,
    color: "#E74C3C",
    bgColor: "#FDEDEC",
  },
  {
    name: "CPMN003",
    comments: "This is a comment about a campaign.",
    state: "Approved",
    date: "2023-11-27",
    amount: 654,
    color: "rgb(34 197 94)",
    bgColor: "rgb(240 253 244)",
  },
  {
    name: "CPMN004",
    comments: "This is a comment about a campaign.",
    state: "Success",
    date: "2023-11-27",
    amount: 654,
    color: "#1b85ff",
    bgColor: "#EBF5FB",
  },
];

const transactions: ITransaction[] = [
  {
    id: "D11 190939 94098 02900",
    from: "Axis Bank XXXX9893",
    to: "Leo Andropophe",
    toImage: avatar1,
    transactionStatus: TransactionStatus.success,
    amount: 1500,
    method: PaymentMethod.code,
    date: "1 Sep 2022, 9:35",
  },
  {
    id: "D11 902349 32085 72940",
    from: "ICICI Bank XXXX4431",
    to: "Emily Williams",
    toImage: avatar3,
    transactionStatus: TransactionStatus.success,
    amount: 2000,
    method: PaymentMethod.wallet,
    date: "2 Sep 2022, 10:20",
  },
  {
    id: "D11 758320 09103 50921",
    from: "HDFC Bank XXXX6782",
    to: "Michael Doe",
    toImage: avatar4,
    transactionStatus: TransactionStatus.failed,
    amount: 1800,
    method: PaymentMethod.hybrid,
    date: "3 Sep 2022, 11:45",
  },
  {
    id: "D11 093850 92380 45910",
    from: "State Bank of India XXXX2345",
    to: "Jane Johnson",
    toImage: avatar2,
    transactionStatus: TransactionStatus.pending,
    amount: 2200,
    method: PaymentMethod.code,
    date: "4 Sep 2022, 13:15",
  },
  {
    id: "D11 324095 80923 87431",
    from: "Axis Bank XXXX1221",
    to: "David Smith",
    toImage: avatar5,
    transactionStatus: TransactionStatus.success,
    amount: 1700,
    method: PaymentMethod.wallet,
    date: "5 Sep 2022, 14:30",
  },
  {
    id: "D11 920483 32102 09432",
    from: "ICICI Bank XXXX7598",
    to: "Olivia Brown",
    toImage: avatar6,
    transactionStatus: TransactionStatus.pending,
    amount: 2500,
    method: PaymentMethod.hybrid,
    date: "6 Sep 2022, 15:55",
  },
  {
    id: "D11 482019 82049 39485",
    from: "HDFC Bank XXXX9847",
    to: "John Doe",
    toImage: avatar7,
    transactionStatus: TransactionStatus.success,
    amount: 1900,
    method: PaymentMethod.code,
    date: "7 Sep 2022, 16:40",
  },
  {
    id: "D11 940582 30985 10385",
    from: "State Bank of India XXXX5623",
    to: "Emily Williams",
    toImage: avatar8,
    transactionStatus: TransactionStatus.failed,
    amount: 2300,
    method: PaymentMethod.wallet,
    date: "8 Sep 2022, 17:25",
  },
  {
    id: "D11 340928 83019 59283",
    from: "Axis Bank XXXX2349",
    to: "Michael Doe",
    toImage: avatar9,
    transactionStatus: TransactionStatus.success,
    amount: 2100,
    method: PaymentMethod.hybrid,
    date: "9 Sep 2022, 18:10",
  },
  {
    id: "D11 908429 23019 39281",
    from: "ICICI Bank XXXX7982",
    to: "Jane Johnson",
    toImage: avatar10,
    transactionStatus: TransactionStatus.failed,
    amount: 2000,
    method: PaymentMethod.code,
    date: "10 Sep 2022, 19:45",
  },
];

export const DashboardScreen = () => {

  return (
    <div className="pt-6 h-[calc(100vh-80px)] font-poppins overflow-y-scroll">
      <div className="h-[100px] flex justify-between px-6">
        <div
          className="w-[30%] rounded-md h-full bg-white shadow-md flex flex-col justify-evenly"
        >
          <h3 className="text-base font-normal p-3 text-center">
            Balance For Deposit Account
          </h3>
          <div className="text-3xl text-green-500 font-semibold flex items-center justify-center">
            $25.000
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${blueBG})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-[30%] rounded-md h-full bg-white shadow-md flex flex-col justify-evenly"
        >
          <h3 className="text-base font-normal p-3 text-center text-[#f1f1f1]">
            Transaction volume per day
          </h3>
          <div className="text-3xl text-white font-semibold flex items-center justify-center">
            156
          </div>
        </div>

        <div
          className="w-[30%] rounded-md h-full shadow-md flex flex-col justify-evenly"
          style={{
            backgroundImage: `url(${orangeBG})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h3 className="text-base font-normal p-3 text-center text-[#f1f1f1]">
            Failure rate
          </h3>
          <div className="text-3xl text-white font-semibold flex items-center justify-center">
            36%
          </div>
        </div>
      </div>

      <Card className="mx-6 px-6 h-[400px] mt-14 mb-20">
        <Line
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Transactions",
                data: [
                  25378, 6000250, 8520200, 2587455, 1021500, 520000, 9850005,
                  1000000, 458000, 6524111, 14586000, 5895200,
                ],
                backgroundColor: ["#D6EAF8"],
                borderColor: "#1b85ff",
                borderWidth: 1,
              },
            ],
          }}
        />
      </Card>

      <Card className="shadow-md m-6 pb-6 border-none">
        <CardHeader className="pt-6 pb-1 text-xl font-medium">
          Latest Campaigns
        </CardHeader>
        <CardDescription className="ml-6 text-[11px]">
          More than 50 new campaigns
        </CardDescription>
        <CardContent className="mt-4">
          <Table>
            <TableCaption>A list of your recent campaigns.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Campaigns name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((campaign) => {
                return (
                  <TableRow key={campaign.name}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>{campaign.date}</TableCell>
                    <TableCell>
                      <span
                        className="px-[6px] py-[1.5px] rounded-3xl text-xs font-medium"
                        style={{
                          color: campaign.color,
                          backgroundColor: campaign.bgColor,
                        }}
                      >
                        {campaign.state}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${campaign.amount}
                    </TableCell>
                    <TableCell className="flex space-x-1 justify-end">
                      <div className="group w-8 h-8 bg-gray-100 grid place-items-center rounded-md cursor-pointer">
                        <Repeat1 className="text-gray-400 w-5 h-5 group-hover:text-primary duration-200" />
                      </div>
                      <div className="group w-8 h-8 bg-gray-100 grid place-items-center rounded-md cursor-pointer">
                        <Edit className="text-gray-400 w-5 h-5 group-hover:text-yellow-500 duration-200" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-4 text-2xl mt-10 mb-4 ml-6">
        <CircleDashed />
        <span className="font-medium">Deposit In Progress</span>
      </div>

      {transactions
        .filter(
          (transaction) =>
            transaction.transactionStatus === TransactionStatus.pending
        )
        .map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}

      <div className="flex items-center space-x-4 text-2xl mt-10 mb-4 ml-6">
        <History />
        <span className="font-medium">Deposit history</span>
      </div>

      {transactions
        .filter(
          (transaction) =>
            transaction.transactionStatus !== TransactionStatus.pending
        )
        .map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
    </div>
  );
};

const TransactionItem = ({ transaction }: { transaction: ITransaction }) => {
  let statusBgColor = "rgb(240, 253, 244)";
  let statusTextColor = "rgb(34 197 94)";

  if (transaction.transactionStatus === TransactionStatus.pending) {
    statusBgColor = "#FEF9E7";
    statusTextColor = "#ffb703";
  } else if (transaction.transactionStatus === TransactionStatus.failed) {
    statusBgColor = "#FDEDEC";
    statusTextColor = "#E74C3C";
  }

  return (
    <Card className="shadow-md m-6 pb-6 border-none">
      <CardHeader className={`py-3`} style={{ backgroundColor: statusBgColor }}>
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full">
              <img
                src={transaction.toImage}
                className="rounded-full w-full h-full object-cover"
                alt="Receiver Profile"
              />
            </div>
            <span className="">{transaction.to}</span>
          </div>
          <span>
            Amount:{" "}
            <strong className="font-semibold text-xl">
              ${transaction.amount}
            </strong>
          </span>
        </div>
      </CardHeader>
      <CardContent className="mt-4 flex justify-between items-center">
        <div className="mt-2">
          <div>
            <div className="text-muted-foreground text-sm mb-1">From</div>
            <div className="text-sm">{transaction.from}</div>
          </div>

          <div className="mt-4">
            <div className="text-muted-foreground text-xs mb-1">
              Transaction ID
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm">{transaction.id}</span>
              <Copy className="w-4 h-4 text-secondary hover:text-muted-foreground cursor-pointer" />
            </div>
          </div>

          <div className="mt-4 flex space-x-2 items-center">
            <div className="text-muted-foreground text-sm mb-1">Status: </div>
            <div
              className="px-[8px] py-[1px] rounded-3xl text-xs flex items-center justify-center font-medium"
              style={{
                color: statusTextColor,
                backgroundColor: statusBgColor,
              }}
            >
              {transaction.transactionStatus}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div>
            <div className="text-muted-foreground text-xs mb-1">Date</div>
            <div className="text-sm">{transaction.date}</div>
          </div>

          <div className="mt-4">
            <div className="text-muted-foreground text-xs mb-1">Method</div>
            <div className="text-sm">By {transaction.method}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
