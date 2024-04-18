import React, { useEffect, useRef } from "react";
import { Clock4 } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [active, setActive] = React.useState(false);

  const inputValueParts = value.split(":");
  const hours = [];
  const minutes = [];
  const containerRef = useRef<HTMLDivElement>(null);

  for (let i = 0; i < 60; i++) {
    if (i <= 23) hours.push(i);
    minutes.push(i);
  }

  const onHourChange = (hour: string) => {
    const minute = inputValueParts[1];
    if (minute) {
        onChange(hour + ":" + minute.padStart(2, "0"));
    } else {
        onChange(hour + ":" + "00");
    }
  };

  const onMinuteChange = (minute: string) => {
    const hour = inputValueParts[0];
    if (hour) {
        onChange(hour.padStart(2, "0") + ":" + minute);
    } else {
        onChange("00" + ":" + minute);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setActive((prevState) => !prevState)}
        className="w-full px-4 py-2 hover:bg-slate-100 transition-colors duration-300 border border-input rounded-md flex items-center space-x-4"
      >
        <Clock4 className="w-4 h-4 opacity-50" />
        <div className="flex items-center space-x-1">
          <span className="text-muted-foreground text-sm">
            {inputValueParts.at(0) === "" || inputValueParts.at(0) === undefined ? "--" : inputValueParts.at(0)}
          </span>
          <span className="text-muted-foreground text-sm">:</span>
          <span className="text-muted-foreground text-sm">
            {inputValueParts.at(1) === "" || inputValueParts.at(1) === undefined ? "--" : inputValueParts.at(1)}
          </span>
        </div>
      </button>

      <div
        className={`flex items-center justify-between border border-input w-[150px] shadow-lg bg-white absolute top-12 rounded-md transition-all duration-200 ${
          active
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="overflow-scroll flex-1 no-scrollbar h-[200px]">
          {hours.map((hour) => {
            return (
              <button
                onClick={() => onHourChange(hour.toString().padStart(2, "0"))}
                key={hour}
                className={`w-full rounded-md px-4 py-2 flex items-center justify-center hover:bg-blue-50 ${
                  inputValueParts[0] === hour.toString().padStart(2, "0") &&
                  "bg-primary text-white hover:bg-primary"
                }`}
              >
                {hour.toString().padStart(2, "0")}
              </button>
            );
          })}
        </div>
        <div className="overflow-scroll no-scrollbar flex-1 h-[200px]">
          {minutes.map((minute) => {
            return (
              <button
                onClick={() =>
                  onMinuteChange(minute.toString().padStart(2, "0"))
                }
                key={minute}
                className={`w-full rounded-md px-4 py-2 flex items-center justify-center hover:bg-blue-50 ${
                  inputValueParts[1] === minute.toString().padStart(2, "0") &&
                  "bg-primary text-white hover:bg-primary"
                }`}
              >
                {minute.toString().padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
