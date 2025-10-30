"use client";

import { useState, useEffect, useRef } from "react";
import { BedDouble } from "lucide-react";

type Room = { adults: number; children: number };

interface RoomSelectorProps {
  rooms?: Room[];
  onChange?: (rooms: Room[]) => void;
}

export default function RoomSelector({
  rooms: initialRooms,
  onChange
}: RoomSelectorProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms ?? [{ adults: 2, children: 0 }]);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialRooms) setRooms(initialRooms);
  }, [initialRooms]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoomChange = (index: number, key: keyof Room, value: number) => {
    const updated = rooms.map((room, i) =>
      i === index ? { ...room, [key]: value } : room
    );
    setRooms(updated);
    onChange?.(updated);
  };

  const totalGuests = rooms.reduce((sum, r) => sum + r.adults + r.children, 0);
  const summary = `${rooms.length} room, ${totalGuests} guest`;

  return (
    <div className="relative w-full" ref={modalRef}>
      <label htmlFor="rooms" className="block text-sm font-medium mb-1">
        Rooms
      </label>

      <div
        className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg h-10 px-3 stext-sm text-gray-900 cursor-pointer focus-within:ring-2 focus-within:ring-amber-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BedDouble size={16} className="text-gray-500" />
        <input
          id="rooms"
          type="text"
          value={summary}
          readOnly
          className="flex-1 bg-transparent focus:outline-none"
        />
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-[70px] w-full bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 z-10 animate-in fade-in slide-in-from-top-2"
          >
          {rooms.map((room, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <p className="font-medium mb-2">Room {i + 1}</p>
              <div className="flex gap-6">
                <div>
                  <label className="block text-sm mb-1">Adults</label>
                  <input
                    type="number"
                    min={1}
                    value={room.adults}
                    onChange={(e) => handleRoomChange(i, "adults", +e.target.value)}
                    className="w-16 border rounded p-1 text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Children</label>
                  <input
                    type="number"
                    min={0}
                    value={room.children}
                    onChange={(e) => handleRoomChange(i, "children", +e.target.value)}
                    className="w-16 border rounded p-1 text-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
