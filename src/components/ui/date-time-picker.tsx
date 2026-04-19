import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SlideSelector } from "@/components/ui/slide-selector";

type DateTimePickerProps = {
  id?: string;
  value?: Date;
  onChange?: (nextDate: Date | undefined) => void;
  placeholder?: string;
};

export function DateTimePicker({
  id,
  value,
  onChange,
  placeholder = "MM/DD/YYYY hh:mm aa",
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1).reverse();
  const hourItems = hours.map((hour) => ({
    value: hour.toString(),
    label: hour.toString(),
  }));
  const minuteItems = Array.from({ length: 60 }, (_, minute) => ({
    value: minute.toString().padStart(2, "0"),
    label: minute.toString().padStart(2, "0"),
  }));
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string,
  ) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        const nextHours =
          value === "PM"
            ? currentHours >= 12
              ? currentHours
              : currentHours + 12
            : currentHours >= 12
              ? currentHours - 12
              : currentHours;
        newDate.setHours(nextHours);
      }
      setDate(newDate);
      onChange?.(newDate);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? (
            format(date, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto max-w-[min(90vw,60rem)] gap-0 p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <SlideSelector
              items={hourItems}
              selectedValue={
                date ? (date.getHours() % 12 || 12).toString() : undefined
              }
              onSelect={(hourValue) => handleTimeChange("hour", hourValue)}
            />
            <SlideSelector
              items={minuteItems}
              selectedValue={
                date ? date.getMinutes().toString().padStart(2, "0") : undefined
              }
              onSelect={(minuteValue) =>
                handleTimeChange("minute", minuteValue)
              }
            />
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date &&
                      ((ampm === "AM" && date.getHours() < 12) ||
                        (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
