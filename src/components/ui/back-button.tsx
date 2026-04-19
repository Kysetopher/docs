import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  children: string;
  to?: string;
  className?: string;
};

export function BackButton({ children, to, className }: BackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (to) {
      navigate(to);
      return;
    }

    navigate(-1);
  }

  return (
    <Button
      variant="ghost"
      className={className ?? "rounded-none rounded-r-md border-0 border-y border-r"}
      onClick={handleClick}
    >
      <Icon icon="mdi:arrow-back" className="mr-2 h-5 w-5" />
      {children}
    </Button>
  );
}
