import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { SlideSelector } from "@/components/ui/slide-selector";

type DateTimeYearProps = {
  id?: string;
  value?: Date;
  onChange?: (nextDate: Date | undefined) => void;
  startYear?: number;
  endYear?: number;
};

export function DateTimeYear({
  id,
  value,
  onChange,
  startYear,
  endYear,
}: DateTimeYearProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const now = new Date();
  const resolvedStartYear = startYear ?? now.getFullYear() - 100;
  const resolvedEndYear = endYear ?? now.getFullYear() + 20;

  const yearItems = React.useMemo(() => {
    const years = Array.from(
      { length: resolvedEndYear - resolvedStartYear + 1 },
      (_, i) => resolvedEndYear - i,
    );
    return years.map((y) => ({ value: String(y), label: String(y) }));
  }, [resolvedEndYear, resolvedStartYear]);

  const hourItems = React.useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i).reverse();
    return hours.map((h) => ({
      value: String(h),
      label: h.toString().padStart(2, "0"),
    }));
  }, []);

  const minuteItems = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, m) => ({
      value: String(m).padStart(2, "0"),
      label: String(m).padStart(2, "0"),
    }));
  }, []);

  const commit = (next: Date) => {
    setDate(next);
    onChange?.(next);
  };

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) return;

    const base = date ?? now;
    const next = new Date(base);
    next.setMonth(selected.getMonth(), selected.getDate());
    commit(next);
  };

  const handleYearSelect = (yearValue: string) => {
    const nextYear = Number.parseInt(yearValue, 10);
    if (Number.isNaN(nextYear)) return;

    const base = date ?? now;
    const next = new Date(base);
    next.setFullYear(nextYear);
    commit(next);
  };

  const handleTimeChange = (type: "hour" | "minute", v: string) => {
    const base = date ?? now;
    const next = new Date(base);

    if (type === "hour") {
      next.setHours(Number.parseInt(v, 10));
    }

    if (type === "minute") {
      next.setMinutes(Number.parseInt(v, 10));
    }

    commit(next);
  };

  const selectedMinute = date
    ? String(date.getMinutes()).padStart(2, "0")
    : undefined;

  return (
    <div id={id}>
      <div className="flex  ">
        <SlideSelector
          items={yearItems}
          selectedValue={date ? String(date.getFullYear()) : undefined}
          onSelect={handleYearSelect}
          orientation="horizontal"
        />
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 min-w-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            // keep navigation constrained
            fromYear={resolvedStartYear}
            toYear={resolvedEndYear}
          />
        </div>

        <div className="flex overflow-hidden rounded-md  divide-x h-[300px]">
          <div className="flex-1 min-w-0">
            <SlideSelector
              items={hourItems}
              selectedValue={date ? String(date.getHours()) : undefined}
              onSelect={(hv) => handleTimeChange("hour", hv)}
              orientation="vertical"
            />
          </div>

          <div className="flex-1 min-w-0">
            <SlideSelector
              items={minuteItems}
              selectedValue={selectedMinute}
              onSelect={(mv) => handleTimeChange("minute", mv)}
              orientation="vertical"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
