"use client";

import { useState } from "react";
import RegionInput from "./RegionInput";
import DateSelector from "./DateSelector";
import RoomSelector from "./RoomSelector";
import { useTranslation } from 'next-i18next';

export default function SearchForm() {
  const { t } = useTranslation('common');
  const [region, setRegion] = useState("");
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [rooms, setRooms] = useState([{ adults: 2, children: 0 }]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (region) params.set("region", region);
    if (lat !== undefined) params.set("lat", String(lat));
    if (lng !== undefined) params.set("lng", String(lng));
    if (checkIn) params.set("checkin", formatDate(checkIn));
    if (checkOut) params.set("checkout", formatDate(checkOut));
    params.set("rooms", JSON.stringify(rooms));

    const searchUrl = `https://www.laterooms.com/searches/?${params.toString()}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-lg"
    >
      <div className="flex-1">
        <RegionInput
          value={region}
          onChange={(value) => setRegion(value)}
          onSelect={(r) => {
            setRegion(r.name);
            setLat(r.lat);
            setLng(r.lng);
          }}
        />
      </div>

      <div className="flex-1">
        <DateSelector
          checkInDate={checkIn}
          checkOutDate={checkOut}
          setCheckInDate={setCheckIn}
          setCheckOutDate={setCheckOut}
        />
      </div>

      <div className="flex-1">
        <RoomSelector rooms={rooms} onChange={setRooms}  />
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="bg-amber-500 text-white px-6 py-2 h-[41px] rounded-md border border-gray-300 hover:bg-amber-600 transition-colors"
        >
          {t('Search')}
        </button>
      </div>
    </form>
  );
}