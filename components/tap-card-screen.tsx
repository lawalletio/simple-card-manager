"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Nfc, Factory, Loader2 } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { useEffect, useState } from "react";
import { useCard } from "@/hooks/use-card";
import { useCurrentCard } from "@/contexts/card-context";

interface TapCardScreenProps {
  onCardTap: () => void;
}

export function TapCardScreen({ onCardTap }: TapCardScreenProps) {
  const { massProductionMode, setMassProductionMode } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const { scan, isAvailable } = useCard();
  const { setCardResponse } = useCurrentCard();

  useEffect(() => {
    if (!isAvailable) {
      return;
    }
    (async () => {
      const result = await scan();
      setCardResponse(result.lnurlResponse);
      setIsLoading(true);
      onCardTap();
    })();
  }, [isAvailable]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-foreground'>
          Card Manager
        </h1>
        <p className='text-muted-foreground'>
          {massProductionMode
            ? "Mass production mode - tap to print directly"
            : "Tap your card to get started"}
        </p>
      </div>

      {/* Main Card Tap Area */}
      <div className='mb-8 flex flex-col items-center'>
        <div
          className={`relative mb-6 flex h-64 w-64 cursor-pointer items-center justify-center rounded-full border-8 border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-300 ${
            isLoading
              ? "scale-110 bg-primary/30"
              : "active:scale-90 active:bg-primary/20"
          }`}
        >
          {isLoading ? (
            <Loader2 className='h-24 w-24 text-primary animate-spin' />
          ) : (
            <Nfc className='h-24 w-24 text-primary' />
          )}
        </div>

        <p className='max-w-xs text-center text-sm text-muted-foreground'>
          {massProductionMode
            ? "Place your card near the device to start printing immediately"
            : "Place your card near the device or tap the area above to begin the activation process"}
        </p>
      </div>

      {/* Status indicator */}
      <div className='flex items-center space-x-2 rounded-full bg-card px-4 py-2 mb-8'>
        <div className='h-2 w-2 rounded-full bg-primary animate-pulse' />
        <span className='text-sm text-muted-foreground'>
          {massProductionMode ? "Production mode ready" : "Ready to scan"}
        </span>
      </div>

      <Card className='w-full max-w-sm border-secondary/20 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Factory className='h-5 w-5 text-secondary' />
            <div>
              <p className='font-medium text-foreground'>
                Mass Production Mode
              </p>
              <p className='text-sm text-muted-foreground'>
                Skip card display, go directly to print
              </p>
            </div>
          </div>
          <Switch
            checked={massProductionMode}
            onCheckedChange={setMassProductionMode}
          />
        </div>
      </Card>
    </div>
  );
}
