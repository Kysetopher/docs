import * as React from "react";
import { Icon } from "@iconify/react";
import type { InputProps } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { PHONE_COUNTRIES, getDefaultPhoneCountry, type PhoneCountry } from "@/lib/services/phone-countries";
import * as Flags from "country-flag-icons/react/3x2";

type PhoneInputProps = Omit<InputProps, "value" | "onChange" | "type"> & {
  value?: string; // "+14155552671"
  onValueChange?: (next: string) => void;
  defaultCountryIso2?: string;
  countries?: PhoneCountry[];
};

function onlyDigits(s: string): string {
  return s.replace(/\D+/g, "");
}

function normalizeE164Like(input: string): { plus: boolean; digits: string } {
  const trimmed = input.trim();
  return { plus: trimmed.startsWith("+"), digits: onlyDigits(trimmed) };
}

function findCountryByDial(countries: PhoneCountry[], digits: string): PhoneCountry | null {
  let best: PhoneCountry | null = null;
  for (const c of countries) {
    if (digits.startsWith(c.dial)) {
      if (!best || c.dial.length > best.dial.length) best = c;
    }
  }
  return best;
}

function splitValue(countries: PhoneCountry[], value?: string): { country: PhoneCountry; national: string } {
  const fallback = getDefaultPhoneCountry();
  if (!value) return { country: fallback, national: "" };

  const { digits } = normalizeE164Like(value);
  if (!digits) return { country: fallback, national: "" };

  const matched = findCountryByDial(countries, digits);
  if (!matched) return { country: fallback, national: digits };

  return { country: matched, national: digits.slice(matched.dial.length) };
}

function buildValue(country: PhoneCountry, nationalDigits: string): string {
  const national = onlyDigits(nationalDigits);
  return national ? `+${country.dial}${national}` : `+${country.dial}`;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onValueChange,
      defaultCountryIso2,
      countries: countriesProp,
      className,
      disabled,
      placeholder = "Phone number",
      ...props
    },
    ref
  ) => {
    const countries = React.useMemo(() => countriesProp ?? PHONE_COUNTRIES, [countriesProp]);

    const defaultCountry = React.useMemo(() => {
      if (!defaultCountryIso2) return getDefaultPhoneCountry();
      return countries.find((c) => c.iso2 === defaultCountryIso2) ?? getDefaultPhoneCountry();
    }, [countries, defaultCountryIso2]);

    const derived = React.useMemo(() => splitValue(countries, value), [countries, value]);

    const [country, setCountry] = React.useState<PhoneCountry>(defaultCountry);
    const [open, setOpen] = React.useState(false);

    // sync selected country when value implies a different dial code
    React.useEffect(() => {
      if (derived.country.iso2 !== country.iso2) setCountry(derived.country);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [derived.country.iso2]);

    const Flag = (Flags as any)[country.iso2] as React.ComponentType<any> | undefined;

    const handleNationalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value ?? "";
      const trimmed = raw.trim();
      // Convert "00" prefix to "+" for matching logic.
      const normalizedForParse = trimmed.startsWith("00") ? `+${trimmed.slice(2)}` : trimmed;

      const { plus, digits } = normalizeE164Like(normalizedForParse);

      // If it is explicitly international OR it's long enough to plausibly include a country code,
      // try to detect a country by dial prefix and switch the dropdown.
      // (Length guard prevents false positives when someone types "1" as the first digit.)
      const shouldTryDetect = (plus && digits.length >= 7) || (!plus && digits.length >= 11);

      if (shouldTryDetect) {
        const matched = findCountryByDial(countries, digits);

        // Only switch if we found a real different country code
        if (matched && matched.dial !== country.dial) {
          setCountry(matched);
          const national = digits.slice(matched.dial.length);
          onValueChange?.(buildValue(matched, national));
          return;
        }

        // If it starts with our current dial code, strip it off.
        if (digits.startsWith(country.dial) && digits.length > country.dial.length) {
          const national = digits.slice(country.dial.length);
          onValueChange?.(buildValue(country, national));
          return;
        }
      }

      // Normal path: treat as national digits
      const nationalDigits = onlyDigits(raw);
      onValueChange?.(buildValue(country, nationalDigits));
    };

    const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
      const text = e.clipboardData.getData("text");
      if (!text) return;

      const { plus, digits } = normalizeE164Like(text);
      if (!plus || !digits) return;

      const matched = findCountryByDial(countries, digits);
      if (!matched) return;

      e.preventDefault();
      setCountry(matched);
      onValueChange?.(buildValue(matched, digits.slice(matched.dial.length)));
    };

    const prefix = (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            className={cn(
              "h-9 px-2 rounded-md",
              "hover:bg-accent/30",
              "focus-visible:ring-1 focus-visible:ring-ring"
            )}
            aria-label="Select country code"
          >
            <div className="flex items-center gap-2">
              {Flag ? (
                <Flag className="h-4 w-6 rounded-[2px] overflow-hidden" aria-hidden="true" />
              ) : (
                <div className="h-4 w-6 rounded-[2px] bg-muted" aria-hidden="true" />
              )}
              <span className="text-sm text-foreground/80">+{country.dial}</span>
              <Icon icon="lucide:chevron-down" className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup heading="Countries">
                {countries.map((c) => {
                  const CFlag = (Flags as any)[c.iso2] as React.ComponentType<any> | undefined;
                  const selected = c.iso2 === country.iso2;

                  return (
                    <CommandItem
                      key={c.iso2}
                      value={`${c.name} ${c.iso2} +${c.dial}`}
                      onSelect={() => {
                        setCountry(c);
                        setOpen(false);
                        onValueChange?.(buildValue(c, derived.national));
                      }}
                    >
                      <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {CFlag ? (
                            <CFlag className="h-4 w-6 rounded-[2px] overflow-hidden" />
                          ) : (
                            <div className="h-4 w-6 rounded-[2px] bg-muted" />
                          )}
                          <div className="flex flex-col leading-tight">
                            <span className="text-sm">{c.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {c.iso2} • +{c.dial}
                            </span>
                          </div>
                        </div>
                        {selected ? <Icon icon="lucide:check" className="h-4 w-4" /> : null}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );

    return (
      <div className={cn("flex items-center gap-2 max-w-[400px]", className)}>
        {prefix}
        <Input
          ref={ref}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          placeholder={placeholder}
          value={derived.national}
          onChange={handleNationalChange}
          onPaste={handlePaste}
          className="flex-1"
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";