import { Icon } from "@iconify/react";
import type { WidgetDefinition } from "@/lib/records/widgetRegistry";
import {
  WidgetInstanceProvider,
  type WidgetInstanceOptions,
} from "@/context/WidgetInstanceContext";
import SimpleBar from "simplebar-react";

interface WidgetCardProps {
  widget?: WidgetDefinition;
  instanceId: string;
  onRemove: (id: string) => void;
  options: WidgetInstanceOptions;
  onOptionsChange: (instanceId: string, next: WidgetInstanceOptions) => void;
}

export default function WidgetCard({
  widget,
  instanceId,
  onRemove,
  options,
  onOptionsChange,
}: WidgetCardProps) {
  if (!widget) {
    return (
      <div className="relative flex h-full flex-col rounded-lg border border-red-100 bg-red-50 p-4 text-red-700">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(instanceId);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="absolute left-2 top-2 rounded p-1 hover:bg-red-100"
        >
          <Icon icon="mdi:trash-can-outline" className="h-5 w-5 text-red-600" />
        </button>
        <p className="font-semibold">Unknown widget</p>
        <p className="text-sm">The widget definition could not be found.</p>
      </div>
    );
  }

  const WidgetComponent = widget.component;
  const widgetOptions = widget.options ?? [];

  return (
    <WidgetInstanceProvider
      instanceId={instanceId}
      widgetId={widget.id}
      options={options}
      setOptions={(next) => onOptionsChange(instanceId, next)}
    >
<div className="relative flex h-full flex-col border border-border bg-card text-card-foreground overflow-hidden shadow-sm">
  <div className="widget-drag-handle flex items-center justify-between border-b border-border bg-card p-2">
    <div className="flex min-w-0 items-center gap-2">
      <h3 className="truncate text-base select-none font-semibold">
        {widget.title}
      </h3>
      {widgetOptions.map((OptionComponent, index) => (
        <OptionComponent key={`${widget.id}-option-${index}`} />
      ))}
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove(instanceId);
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      className="rounded p-1 text-muted-foreground hover:text-destructive"
    >
      <Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
    </button>
  </div>

  {/* Scrollable Content Area */}
  <div className="flex-1 min-h-0">
    <SimpleBar
      className="h-full w-full"
      autoHide={false}
    >
      <div className="min-w-full">
        <WidgetComponent />
      </div>
    </SimpleBar>
  </div>
</div>
    </WidgetInstanceProvider>
  );
}
