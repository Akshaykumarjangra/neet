
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

type HindiToggleProps = {
  isHindi?: boolean;
  onToggle?: () => void;
};

export default function HindiToggle({ isHindi: controlledHindi, onToggle }: HindiToggleProps) {
  const [uncontrolledHindi, setUncontrolledHindi] = useState(false);
  const isHindi = controlledHindi ?? uncontrolledHindi;
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    } else {
      setUncontrolledHindi(!uncontrolledHindi);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      {isHindi ? "हिंदी" : "English"}
    </Button>
  );
}
