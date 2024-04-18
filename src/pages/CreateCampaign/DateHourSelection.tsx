import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DashedCard } from "../../components/DashedCard";
import { CalendarIcon, TimerReset } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { addDays, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { TimePicker } from "./TimePicker";
import { cn } from "../../components/lib/utils";

interface DateHourSelectionProps {
  setValidDateHourSelection: Dispatch<SetStateAction<boolean>>;
  next: boolean;
  onNext: (date: string) => void;
  createCampaignCompleted: boolean;
}

export const DateHourSelection = ({
  setValidDateHourSelection,
  next,
  onNext,
  createCampaignCompleted,
}: DateHourSelectionProps) => {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = useState("");
  const [typeDate, setTypeDate] = useState("");

  useEffect(() => {
    if (typeDate === "immediately") {
      setValidDateHourSelection(true);
    } else if (typeDate === "scheduled") {
      if (!date || time.length === 0) {
        setValidDateHourSelection(false);
      } else {
        setValidDateHourSelection(true);
      }
    } else {
      setValidDateHourSelection(false);
    }
  }, [typeDate]);

  useEffect(() => {
    if (date && time.length) {
      setValidDateHourSelection(true);
    }
  }, [date, time]);

  useEffect(() => {
    if (!next) {
      return;
    }

    if (typeDate === "immediately") {
      onNext("now");
    } else {
      date?.setHours(+time.split(":")[0]);
      date?.setMinutes(+time.split(":")[1]);
      onNext(date?.toISOString() as string);
    }
  }, [next]);

  useEffect(() => {
    if (createCampaignCompleted) {
      setDate(undefined);
      setTime("");
      setTypeDate("");
    }
  }, [createCampaignCompleted]);

  return (
    <div>
      <h1 className="text-center font-medium text-lg">
        When do you want to start the campaign?
      </h1>

      <div className="flex items-center justify-center space-x-4 mt-4">
        <DashedCard
          active={typeDate === "immediately"}
          icon={
            <TimerReset
              className={`w-8 h-8 ${
                typeDate === "immediately" && "text-white"
              }`}
            />
          }
          title="Immediately"
          description="The campaign will be started right now"
          onClick={() => setTypeDate("immediately")}
        />

        <DashedCard
          active={typeDate === "scheduled"}
          icon={
            <CalendarIcon
              className={`w-8 h-8 ${typeDate === "scheduled" && "text-white"}`}
            />
          }
          title="Scheduled"
          description="The campaign will start at a later date set by you."
          onClick={() => setTypeDate("scheduled")}
        />
      </div>

      <div
        className={`flex justify-center items-center mt-8 space-x-6 transition-transform duration-400 ${
          typeDate === "scheduled"
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="grid grid-cols-2 w-[620px]">
          <div>
            <label htmlFor="date" className="block mb-2">
              <span>Select a Date</span>
              <span className="text-red-500"> *</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Predefined date" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label htmlFor="time" className="block mb-2">
              Time
            </label>
            <TimePicker value={time} onChange={(_time) => setTime(_time)} />
          </div>
        </div>
      </div>
    </div>
  );
};
