"use client";

import { useState } from "react";
import { TapCardScreen } from "@/components/tap-card-screen";
import { CardDisplayScreen } from "@/components/card-display-screen";
import { PrintActivationScreen } from "@/components/print-activation-screen";
import { QRResetScreen } from "@/components/qr-reset-screen";
import { useApp } from "@/contexts/app-context";
import { useCurrentCard } from "@/contexts/card-context";

export type Screen = "tap" | "display" | "print" | "qr-reset";

export default function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("tap");
  const { massProductionMode } = useApp();

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBackToMain = () => {
    setCurrentScreen("tap");
  };

  const handleCardTap = () => {
    if (massProductionMode) {
      // In mass production mode, go directly to print activation
      navigateToScreen("print");
    } else {
      // Normal mode, go to card display
      navigateToScreen("display");
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='mx-auto max-w-md'>
        {currentScreen === "tap" && <TapCardScreen onCardTap={handleCardTap} />}
        {currentScreen === "display" && (
          <CardDisplayScreen
            onPrintActivation={() => navigateToScreen("print")}
            onReset={() => navigateToScreen("qr-reset")}
            onBack={goBackToMain}
          />
        )}
        {currentScreen === "print" && (
          <PrintActivationScreen onBack={goBackToMain} />
        )}
        {currentScreen === "qr-reset" && (
          <QRResetScreen onBack={goBackToMain} />
        )}
      </div>
    </div>
  );
}
