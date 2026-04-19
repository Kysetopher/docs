import { usePlacesSearch } from "@/lib/api/places"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import type { PlaceSearchResult } from "@/types/places"
import type { BBox, Feature, Point } from "geojson"
import { Icon } from "@iconify/react"
import * as React from "react"

interface PlaceFeatureProperties {
    osm_id: number
    osm_type: "N" | "W" | "R"
    osm_key: string
    osm_value: string
    type: string
    name?: string
    housenumber?: string
    street?: string
    locality?: string
    district?: string
    postcode?: string
    city?: string
    county?: string
    state?: string
    country?: string
    countrycode?: string
    extent?: [number, number, number, number]
    extra?: Record<string, string>
}
type PlaceFeature = Feature<Point, PlaceFeatureProperties>

/**
 * Query parameters for Photon geocoding API
 * @see https://github.com/komoot/photon#photon-api
 */
interface PlaceSearchOptions {
    /** Search text (address, place name, or POI) */
    query: string
    /** Preferred language for results (e.g., "en", "de", "fr") */
    lang?: string
    /** Maximum number of results to return */
    limit?: number
    /**
     * Bounding box used to restrict results.
     * Format: [minLongitude, minLatitude, maxLongitude, maxLatitude]
     */
    bbox?: BBox
    /** Latitude used to bias results toward a specific location */
    lat?: number
    /** Longitude used to bias results toward a specific location */
    lon?: number
    /**
     * Zoom level used for location biasing.
     * Higher values increase locality.
     */
    zoom?: number
    /**
     * Strength of the location bias.
     */
    locationBiasScale?: number
}

interface PlaceAutocompleteProps
    extends Omit<PlaceSearchOptions, "query">,
        Omit<React.ComponentProps<"input">, "value" | "onChange"> {
    debounceMs?: number
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    onPlaceSelect?: (feature: PlaceFeature) => void
    onResultsChange?: (results: PlaceFeature[]) => void
}

function formatAddress(properties: PlaceFeatureProperties) {
    const parts = []

    if (properties.name) {
        parts.push(properties.name)
    }

    if (properties.housenumber && properties.street) {
        parts.push(`${properties.housenumber} ${properties.street}`)
    } else if (properties.street) {
        parts.push(properties.street)
    }

    if (properties.city) {
        parts.push(properties.city)
    } else if (properties.locality) {
        parts.push(properties.locality)
    }

    if (properties.state && properties.state !== properties.city) {
        parts.push(properties.state)
    }

    if (properties.country) {
        parts.push(properties.country)
    }

    return [...new Set(parts)].join(", ")
}



function toPlaceFeature(result: PlaceSearchResult): PlaceFeature {
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [result.longitude, result.latitude],
        },
        properties: {
            osm_id: result.geonameid ?? (Number(result.id) || 0),
            osm_type: "N",
            osm_key: "place",
            osm_value: "city",
            type: "Feature",
            name: result.name,
            city: result.name,
            state: result.admin1_code ?? undefined,
            country: result.country_code ?? undefined,
        },
    }
}

function PlaceAutocomplete({
    debounceMs = 300,
    lang,
    limit = 5,
    bbox,
    lat,
    lon,
    zoom,
    locationBiasScale,
    className,
    value: controlledValue,
    defaultValue = "",
    onChange: controlledOnChange,
    onPlaceSelect,
    onResultsChange,
    ...props
}: PlaceAutocompleteProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [searchQuery, setSearchQuery] = React.useState("")

    const isControlled = controlledValue !== undefined
    const displayValue = isControlled ? controlledValue : internalValue

    void lang
    void bbox
    void lat
    void lon
    void zoom
    void locationBiasScale

    const { results: placeResults, isLoading, error, hasSearched } = usePlacesSearch({
        query: searchQuery,
        debounceMs,
        limit,
    })

    const results = React.useMemo(
        () => placeResults.map((result) => toPlaceFeature(result)),
        [placeResults]
    )

    React.useEffect(() => {
        onResultsChange?.(results)
    }, [results, onResultsChange])

    const hasNoResults =
        hasSearched && !isLoading && !error && results.length === 0
    const showCommandList = error || hasNoResults || results.length > 0

    return (
        <Command
            className={cn("h-fit overflow-visible", className)}
            shouldFilter={false}
            loop>
            <div className="relative">
                <InputGroup
                    className={cn(
                        "!border-input !bg-popover",
                        // 🔥 kill any focus ring/outline/shadow on the group wrapper
                        "focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none focus-within:outline-none",
                        showCommandList && "rounded-b-none"
                    )}
                    >
                    <InputGroupAddon>
                        <Icon icon="lucide:search" />
                    </InputGroupAddon>

                    <InputGroupInput
                        placeholder="Search"
                        className={cn(
                        // 🔥 kill focus ring/outline on the input itself
                        "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:outline-none",
                        // (optional) sometimes base input has outline even w/o focus-visible
                        "outline-none"
                        )}
                        value={displayValue}
                        onChange={(event) => {
                            const newValue = event.target.value
                            if (!isControlled) {
                                setInternalValue(newValue)
                            }
                            setSearchQuery(newValue)
                            controlledOnChange?.(newValue)
                        }}
                         {...props}
  />
                    {isLoading && (
                        <InputGroupAddon align="inline-end">
                            <Icon
                            icon="lucide:loader-2"
                            role="status"
                            aria-label="Loading"
                            className={cn("size-4 animate-spin")}
                            />
                        </InputGroupAddon>
                    )}
                </InputGroup>
                {showCommandList && (
                    <div
  className={cn(
    "bg-popover border-input absolute top-full right-0 left-0 z-50 rounded-b-md border border-t-0 shadow-md"
  )}
>
  <CommandList
    data-state={showCommandList ? "open" : "closed"}
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2"
    )}
  >
                        {error && (
                            <CommandEmpty>Error: {error.message}</CommandEmpty>
                        )}
                        {hasNoResults && (
                            <CommandEmpty>
                                Can't find {displayValue}.
                            </CommandEmpty>
                        )}
                        {results.length > 0 && (
                            <CommandGroup>
                                {results.map((feature) => {
                                    const formattedAddress = formatAddress(
                                        feature.properties
                                    )
                                    return (
                                        <CommandItem
                                            key={feature.properties.osm_id}
                                            value={String(
                                                feature.properties.osm_id
                                            )}
                                            onSelect={() => {
                                                const formattedAddress =
                                                    formatAddress(
                                                        feature.properties
                                                    )

                                                if (!isControlled) {
                                                    setInternalValue(
                                                        formattedAddress
                                                    )
                                                }

                                                setSearchQuery("")
                                                controlledOnChange?.(
                                                    formattedAddress
                                                )
                                                onPlaceSelect?.(feature)
                                            }}>
                                            <Icon icon="lucide:map-pin" />
                                            <div className="flex flex-col items-start text-start">
                                                <span className="font-medium">
                                                    {feature.properties.name ||
                                                        feature.properties
                                                            .street ||
                                                        "Unknown"}
                                                </span>
                                                <span className="text-muted-foreground text-xs">
                                                    {formattedAddress}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )}
                     </CommandList>
</div>
                )}
            </div>
        </Command>
    )
}

export { PlaceAutocomplete, type PlaceAutocompleteProps, type PlaceFeature }
