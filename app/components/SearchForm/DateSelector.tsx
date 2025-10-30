"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { Calendar } from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
};

export default function DateSelector({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: checkInDate || new Date(),
      endDate: checkOutDate || new Date(),
      key: "selection",
    },
  ]);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRange([
      {
        startDate: checkInDate || new Date(),
        endDate: checkOutDate || new Date(),
        key: "selection",
      },
    ]);
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  const handleRangeChange = (item: any) => {
    const { startDate, endDate } = item.selection;
    setRange([item.selection]);
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full relative" ref={calendarRef}>
      <label className="block text-sm font-medium mb-1">Dates</label>
      <div
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex flex-row items-center gap-2 bg-gray-50 h-[41px] w-full border border-gray-300 text-gray-900 placeholder-gray-500 pl-4 pr-4 text-sm rounded-lg focus-within:ring-2 focus-within:ring-amber-400 cursor-pointer"
      >
        <Calendar size={16} />
        <input
          type="text"
          name="search[date_range]"
          id="date_range"
          readOnly
          value={
            checkInDate && checkOutDate
              ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
              : "Select dates"
          }
          className="focus:outline-none flex-1 bg-transparent cursor-pointer"
        />
      </div>

      {showCalendar && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg">
          <DateRange
            ranges={range}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            minDate={new Date()}
            months={2}
            direction="horizontal"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}