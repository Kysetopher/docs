import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    PlaceAutocomplete,
    type PlaceAutocompleteProps,
} from "@/components/ui/place-autocomplete"
import { Icon } from "@iconify/react"
import type {
    CircleMarker,
    ErrorEvent,
    LatLngExpression,
    Map as LeafletMap,
    LocateOptions,
    LocationEvent,
    PointExpression,
    Popup,
    Tooltip,
    MarkerCluster,
    DivIcon,
} from "leaflet"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet/dist/leaflet.css"
import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type Ref,
} from "react"
import { renderToString } from "react-dom/server"
import {
    useMap,
    MapContainer,
    type CircleMarkerProps,
    type MapContainerProps,
    type MarkerProps,
    type PopupProps,
    type TooltipProps,
} from "react-leaflet"
import type { MarkerClusterGroupProps} from "react-leaflet-markercluster"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster"
import MarkerClusterGroup from "react-leaflet-markercluster"
import L from "leaflet"
import * as ReactLeaflet from "react-leaflet"

const LeafletMarker = ReactLeaflet.Marker
const LeafletPopup = ReactLeaflet.Popup
const LeafletTooltip = ReactLeaflet.Tooltip
const LeafletCircleMarker = ReactLeaflet.CircleMarker
function Map({
    zoom = 15,
    maxZoom = 18,
    className,
    ...props
}: Omit<MapContainerProps, "zoomControl"> & {
    center: LatLngExpression
    ref?: Ref<LeafletMap>
}) {
    return (
        <MapContainer
            zoom={zoom}
            maxZoom={maxZoom}
            attributionControl={false}
            zoomControl={false}
            className={cn(
                "z-50 size-full min-h-96 flex-1",
                className
            )}
            {...props}
        />
    )
}

function MapMarker({
  size = 24, // kept for API compatibility (default marker ignores this)
  iconAnchor,
  icon, // ✅ Leaflet icon override (not ReactNode)
  ...props
}: Omit<MarkerProps, "icon"> & {
  icon?: DivIcon
  size?: number
  iconAnchor?: PointExpression
}) {
  // default Leaflet blue marker
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: iconAnchor ?? [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
    <LeafletMarker
      {...props}
      riseOnHover
      icon={icon ?? defaultIcon}
    />
  )
}

function MapMarkerClusterGroup({
  polygonOptions = { className: "fill-foreground stroke-foreground stroke-2" },
  spiderLegPolylineOptions = { className: "fill-foreground stroke-foreground stroke-2" },
  icon,
  ...props
}: Omit<MarkerClusterGroupProps, "iconCreateFunction"> & {
  children: ReactNode
  icon?: (markerCount: number) => ReactNode
}) {


  const iconCreateFunction = icon
    ? (cluster: MarkerCluster) => {
        const markerCount = cluster.getChildCount()
        const iconNode = icon(markerCount)
        return L.divIcon({ html: renderToString(iconNode) })
      }
    : undefined

  return (
    <MarkerClusterGroup
      polygonOptions={polygonOptions}
      spiderLegPolylineOptions={spiderLegPolylineOptions}
      iconCreateFunction={iconCreateFunction}
      {...props}
    />
  )
}

function MapCircleMarker({
    className,
    ...props
}: CircleMarkerProps & { ref?: Ref<CircleMarker> }) {
    return (
        <LeafletCircleMarker
            className={cn(
                "fill-foreground stroke-foreground stroke-2",
                className
            )}
            {...props}
        />
    )
}

function MapPopup({
    className,
    ...props
}: Omit<PopupProps, "content"> & { ref?: Ref<Popup> }) {
    return (
        <LeafletPopup
            className={cn(
                "bg-popover text-popover-foreground animate-in fade-out-0 fade-in-0 zoom-out-95 zoom-in-95 slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 font-sans shadow-md outline-hidden",
                className
            )}
            {...props}
        />
    )
}

function MapTooltip({
    className,
    children,
    side = "top",
    sideOffset = 15,
    ...props
}: Omit<TooltipProps, "offset"> & {
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
    ref?: Ref<Tooltip>
}) {
    const ARROW_POSITION_CLASSES = {
        top: "bottom-0.5 left-1/2 -translate-x-1/2 translate-y-1/2",
        bottom: "top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2",
        left: "right-0.5 top-1/2 translate-x-1/2 -translate-y-1/2",
        right: "left-0.5 top-1/2 -translate-x-1/2 -translate-y-1/2",
    }
    const DEFAULT_OFFSET = {
        top: [0, -sideOffset] satisfies PointExpression,
        bottom: [0, sideOffset] satisfies PointExpression,
        left: [-sideOffset, 0] satisfies PointExpression,
        right: [sideOffset, 0] satisfies PointExpression,
    }

    return (
        <LeafletTooltip
            className={cn(
                "animate-in fade-in-0 zoom-in-95 fade-out-0 zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 w-fit text-xs text-balance transition-opacity",
                className
            )}
            data-side={side}
            direction={side}
            offset={DEFAULT_OFFSET[side]}
            opacity={1}
            {...props}>
            {children}
            <div
                className={cn(
                    "bg-foreground fill-foreground absolute z-50 size-2.5 rotate-45 rounded-[2px]",
                    ARROW_POSITION_CLASSES[side]
                )}
            />
        </LeafletTooltip>
    )
}



function MapLocateControl({
    className,
    watch = false,
    onLocationFound,
    onLocationError,
    ...props
}: React.ComponentProps<"button"> &
    Pick<LocateOptions, "watch"> & {
        onLocationFound?: (location: LocationEvent) => void
        onLocationError?: (error: ErrorEvent) => void
    }) {
    const map = useMap()
    const [isLocating, setIsLocating] = useDebounceLoadingState(200)
    const [position, setPosition] = useState<LatLngExpression | null>(null)

    function startLocating() {
        setIsLocating(true)
        map.locate({ setView: true, maxZoom: map.getMaxZoom(), watch })
        map.on("locationfound", (location: LocationEvent) => {
            setPosition(location.latlng)
            setIsLocating(false)
            onLocationFound?.(location)
        })
        map.on("locationerror", (error: ErrorEvent) => {
            setPosition(null)
            setIsLocating(false)
            onLocationError?.(error)
        })
    }

    function stopLocating() {
        map.stopLocate()
        map.off("locationfound")
        map.off("locationerror")
        setPosition(null)
        setIsLocating(false)
    }

    useEffect(() => () => stopLocating(), [])

    return (
        <MapControlContainer className={cn("right-1 bottom-1", className)}>
            <Button
                type="button"
                onClick={position ? stopLocating : startLocating}
                disabled={isLocating}
                title={
                    isLocating
                        ? "Locating..."
                        : position
                          ? "Stop tracking"
                          : "Track location"
                }
                aria-label={
                    isLocating
                        ? "Locating..."
                        : position
                          ? "Stop location tracking"
                          : "Start location tracking"
                }
                className="border"
                {...props}>
                {isLocating ? (
                    <Icon icon="lucide:loader-circle" className="animate-spin" />
                ) : (
                    <Icon icon="lucide:navigation" />
                )}
            </Button>
            {position && (
                <MapMarker position={position}  />
            )}
        </MapControlContainer>
    )
}

function MapSearchControl({ className, ...props }: PlaceAutocompleteProps) {
    return (
        <MapControlContainer
            className={cn("top-1 left-1 z-[1001] w-60", className)}>
            <PlaceAutocomplete {...props} />
        </MapControlContainer>
    )
}





function MapControlContainer({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!L) return
        const element = containerRef.current
        if (!element) return
        L.DomEvent.disableClickPropagation(element)
        L.DomEvent.disableScrollPropagation(element)
    }, [L])

    return (
        <div
            ref={containerRef}
            className={cn("absolute z-[1000] size-fit cursor-default", className)}
            {...props}
        />
    )
}


function useDebounceLoadingState(delay = 200) {
    const [isLoading, setIsLoading] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
   const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        if (isLoading) {
            timeoutRef.current = window.setTimeout(() => {
            setShowLoading(true)
            }, delay)

        } else {
            if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            }
            setShowLoading(false)
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [isLoading, delay])

    return [showLoading, setIsLoading] as const
}

export {
    Map,
    MapCircleMarker,
    MapControlContainer,
    MapLocateControl,
    MapMarker,
    MapMarkerClusterGroup,
    MapPopup,
    MapSearchControl,
    MapTooltip,
}
