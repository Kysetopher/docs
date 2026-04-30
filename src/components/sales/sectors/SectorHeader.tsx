import React from "react";
import { Icon } from "@iconify/react";

type SectorHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function SectorHeader({
  title,
  subtitle,
  icon,
  gradientFrom = "from-indigo-950/20",
  gradientTo = "to-cyan-950/20",
  children,
  isOpen,
  onToggle
}: SectorHeaderProps) {
  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-xl mb-4 group cursor-pointer transition-all hover:bg-white/5`}
      onClick={onToggle}
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch min-h-[100px]">
        <div className="space-y-2 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            {onToggle && (
              <Icon 
                icon="mdi:chevron-right" 
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              />
            )}
            {icon && <Icon icon={icon} className="text-primary h-5 w-5" />}
            <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl pl-8">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex justify-end items-center p-4">
          {children}
        </div>
      </div>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
    </div>
  );
}

export default SectorHeader;
