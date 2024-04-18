import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "components/ui/card";
import {
  Calendar,
  ChevronDown,
  Diamond,
  Search,
  Table2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Button } from "components/ui/button";
import axios from "api/axios";
import { GET_CAMPAIGN_PATH, SEARCH_CAMPAIGN_LIKE_PATH } from "api/endpoints";
import { ApiResponse } from "models/ApiResponse";
import { Campaign } from "models/Campaign";
import { CampaignTableList } from "./components/CampaignTableList";
import { CampaignCardList } from "./components/CampaignCardList";
import { useCreatedCampaign } from "hooks/useCreateCampaign";

/*const data = [
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
*/
enum TransactionStatus {
  success = "success",
  failed = "failed",
  pending = "pending",
}

const statusColors = {
  success: "#22c55e",
  pending: "#fbbf24",
  inprogress: "#fbbf24",
  failed: "#ef4444",
};

enum ListStyle {
  table = "table",
  card = "card",
}

export const CampaignsScreen = () => {
  const [listStyle, setListStyle] = React.useState(ListStyle.table);
  const [open1, setOpen1] = React.useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  const {createdCampagne, resetCampaign} = useCreatedCampaign();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const axiosResponse = await axios.get<ApiResponse<Campaign[]>>(
          GET_CAMPAIGN_PATH
        );
        const response = axiosResponse.data;
        console.log("response", response);
        setCampaigns(response.data);
        setFilteredCampaigns(response.data);
      } catch (error) {
        console.log("Un error occured while retrieveing campaigns => ", error);
      }
    };

    getCampaigns();
  }, []);

  useEffect(() => {
    console.log('createCampaign => ', createdCampagne);
    
    if (createdCampagne.name.length) {
      campaigns.push(createdCampagne);
      setTimeout(() => {
        resetCampaign();
      }, 2000);
    }
  }, [createdCampagne]);

  useEffect(() => {
    const searchCampaign = async () => {
      try {
        const axiosResponse = await axios.get<ApiResponse<Campaign[]>>(SEARCH_CAMPAIGN_LIKE_PATH.replace(':name', search));
        console.log('axiosResponse', axiosResponse);
        
        setFilteredCampaigns(axiosResponse.data.data);
      } catch (error) {
        console.log("Un error occured while searching campaigns => ", error);
      }
    };

    if (search.length) {
      searchCampaign();
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSearch = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setSearch(target.value);
  }

  return (
    <div className="h-[calc(100vh-80px)]  overflow-y-scroll">
      <Card className="shadow-md m-6 pb-6 border-none">
        <CardHeader className="pt-6 pb-1 flex flex-row items-center justify-between">
          <h1 className="text-xl font-medium">Campaign List</h1>
          <Popover open={open1}>
            <PopoverTrigger asChild>
              {listStyle === ListStyle.card ? (
                <button
                  onClick={() => setOpen1((prevState) => !prevState)}
                  className="w-[100px] flex flex-row items-center border border-input  px-2 py-2 rounded-md space-x-2 mb-1 cursor-pointer hover:bg-slate-100"
                >
                  <Diamond className="w-4 h-4 text-muted-foreground" />
                  <span className="block text-sm">Card</span>
                </button>
              ) : (
                <button
                  onClick={() => setOpen1((prevState) => !prevState)}
                  className="w-[100px] flex flex-row items-center border border-input  px-2 py-2 rounded-md space-x-2 mb-1 cursor-pointer hover:bg-slate-100"
                >
                  <Table2 className="w-4 h-4 text-muted-foreground" />
                  <span className="block text-sm">Table</span>
                </button>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[100px] p-1">
              <button
                onClick={() => {
                  setListStyle(ListStyle.table);
                  setOpen1(false);
                }}
                className="flex flex-row w-full items-center px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100"
              >
                <Table2 className="w-4 h-4 text-muted-foreground" />
                <span className="block text-sm">Table</span>
              </button>

              <button
                onClick={() => {
                  setListStyle(ListStyle.card);
                  setOpen1(false);
                }}
                className="flex flex-row w-full items-center px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100"
              >
                <Diamond className="w-4 h-4 text-muted-foreground" />
                <span className="block text-sm">Card</span>
              </button>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent className="mt-4">
          <div className="mb-6">
            <div className="flex space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between w-[120px]"
                  >
                    <span className="text-sm">Status</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[120px] p-1">
                  <div className="flex flex-row items-center justify-center border-b px-2 py-1 space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm font-medium">Show All</span>
                  </div>
                  {Object.values(TransactionStatus).map((status) => {
                    return (
                      <div
                        key={status}
                        className="flex flex-row items-center px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100"
                      >
                        <div
                          className={`w-3 h-3 rounded-full`}
                          style={{ backgroundColor: statusColors[status] }}
                        ></div>
                        <span className="block text-sm">{status}</span>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex flex-row items-center justify-start space-x-2 w-[120px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[120px] p-1">
                  <div className="px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm">today</span>
                  </div>

                  <div className="px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm">yesterday</span>
                  </div>

                  <div className="px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm">last week</span>
                  </div>

                  <div className="px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm">last month</span>
                  </div>

                  <div className="px-2 py-1 rounded-md space-x-3 mb-1 cursor-pointer hover:bg-slate-100">
                    <span className="block text-sm">last year</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative mt-4 w-[70%]">
              <Search className="absolute w-4 h-4 top-3 left-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="search"
                className="flex h-10 w-full rounded-full focus:shadow-md shadow-sm border border-input bg-background pr-3 pl-12 py-2 text-sm focus:outline-none placeholder:text-muted-foreground"
                  value={search}
                  onInput={onSearch}
              />
            </div>
          </div>

          {listStyle === ListStyle.table && (
            <CampaignTableList campaigns={filteredCampaigns} />
          )}

          {listStyle === ListStyle.card && (
            <CampaignCardList campaigns={filteredCampaigns} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
