import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";

const loginSessions = [
  {
    location: "Dakar, Sénégal",
    status: "ok",
    device: "Chrome - Windows 10",
    ipAddress: "248.125.10.22",
    time: "5h",
  },
  {
    location: "Nairobi, Kenya",
    status: "ok",
    device: "Firefox - macOS Big Sur",
    ipAddress: "156.78.23.45",
    time: "35 mins",
  },
  {
    location: "Cairo, Egypte",
    status: "ok",
    device: "Safari - iOS 15",
    ipAddress: "209.142.76.91",
    time: "26 mins",
  },
  {
    location: "Lagos, Nigeria",
    status: "err",
    device: "Edge - Windows 11",
    ipAddress: "182.95.104.67",
    time: "46 mins",
  },
  {
    location: "Casablanca, Maroc",
    status: "ok",
    device: "Opera - Linux Ubuntu",
    ipAddress: "67.231.45.89",
    time: "6h",
  },
  {
    location: "Abidjan, Côte d'Ivoire",
    status: "err",
    device: "Chrome - Windows 11",
    ipAddress: "112.36.78.102",
    time: "2h",
  },
  {
    location: "Johannesburg, Afrique du Sud",
    status: "err",
    device: "Firefox - Windows 10",
    ipAddress: "82.209.145.33",
    time: "51 mins",
  },
  {
    location: "Accra, Ghana",
    status: "ok",
    device: "Edge - macOS Catalina",
    ipAddress: "198.76.32.18",
    time: "18 mins",
  },
  {
    location: "Lubumbashi, République démocratique du Congo",
    status: "ok",
    device: "Safari - iOS 14",
    ipAddress: "121.54.89.207",
    time: "9h",
  },
  {
    location: "Addis-Abeba, Éthiopie",
    status: "err",
    device: "Chrome - Android 11",
    ipAddress: "173.98.55.124",
    time: "6 mins",
  },
];

export const LoginSessionSection = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row justify-between items-center font-semibold border-b border-gray-200">
        <span>Login Session</span>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">1 Hour</SelectItem>
              <SelectItem value="banana">1 Day</SelectItem>
              <SelectItem value="blueberry">1 Week</SelectItem>
              <SelectItem value="grapes">1 Month</SelectItem>
              <SelectItem value="pineapple">1 Year</SelectItem>
            </SelectContent>
          </Select>

          <Button>View all</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent logs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-slate-400">
                Location
              </TableHead>
              <TableHead className="font-semibold text-slate-400">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-400">
                Device
              </TableHead>
              <TableHead className="font-semibold text-left text-slate-400">
                IP Address
              </TableHead>
              <TableHead className="font-semibold text-slate-400">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loginSessions.map((session) => {
              return (
                <TableRow key={session.ipAddress}>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-[1px] rounded-lg ${
                        session.status === "ok"
                          ? "text-green-500 bg-green-50"
                          : "text-red-500 bg-red-50"
                      }`}
                    >
                      {session.status === "ok" ? "success" : "failed"}
                    </span>
                  </TableCell>
                  <TableCell>{session.device}</TableCell>
                  <TableCell className="text-left">
                    {session.ipAddress}
                  </TableCell>
                  <TableCell>{session.time} ago</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
