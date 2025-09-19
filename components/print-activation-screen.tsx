"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Printer,
  FileText,
  CheckCircle,
  X,
  Factory,
  QrCode,
} from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { useCurrentCard } from "@/contexts/card-context";

interface PrintActivationScreenProps {
  onBack: () => void;
}

export function PrintActivationScreen({ onBack }: PrintActivationScreenProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printComplete, setPrintComplete] = useState(false);
  const [paperPosition, setPaperPosition] = useState(0);
  const { isReady, getOTC } = useCurrentCard();

  const { massProductionMode } = useApp();

  useEffect(() => {
    if (massProductionMode) {
      startPrinting();
    }
  }, [massProductionMode]);

  useEffect(() => {
    if (isReady && !printComplete) {
      getOTC().then((otc) => {
        alert(JSON.stringify(otc.url));
      });
      startPrinting();
    }
  }, [isReady, printComplete]);

  const startPrinting = () => {
    setIsPrinting(true);
    setPrintComplete(false);
    setPaperPosition(0);

    const animationDuration = 5000; // 5 seconds
    const startTime = Date.now();

    const animatePaper = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Ease-out animation for smooth movement
      const easeOut = 1.5 - Math.pow(1 - progress, 3);
      setPaperPosition(easeOut * 100);

      if (progress < 1) {
        requestAnimationFrame(animatePaper);
      } else {
        setTimeout(() => {
          setIsPrinting(false);
          setPrintComplete(true);

          if (massProductionMode) {
            setTimeout(() => {
              onBack();
            }, 2000);
          }
        }, 500);
      }
    };

    // Start animation after a brief delay
    setTimeout(() => {
      requestAnimationFrame(animatePaper);
    }, 500);
  };

  if (!isReady) {
    return <div>Error: Not ready</div>;
  }

  return (
    <div className='min-h-screen p-6 pb-32 relative'>
      {/* Header */}
      <div className='mb-6 text-center'>
        <h1 className='text-2xl font-bold'>
          {massProductionMode ? "Mass Production Print" : "Print Activation"}
        </h1>
      </div>

      {massProductionMode && (
        <Card className='mb-6 border-secondary/20 bg-secondary/10'>
          <CardContent className='pt-6'>
            <div className='flex items-center space-x-2'>
              <Factory className='h-5 w-5 text-secondary' />
              <p className='text-sm font-medium'>Mass Production Mode Active</p>
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              Auto-printing enabled • Will close automatically when complete
            </p>
          </CardContent>
        </Card>
      )}

      {/* Print Status Card */}
      <Card className='mb-6 border-primary/20'>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Printer className='h-5 w-5 text-primary' />
            <span>Activation Receipt</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isPrinting && !printComplete && !massProductionMode && (
            <div className='text-center py-8'>
              <FileText className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
              <p className='text-muted-foreground mb-6'>
                Ready to print your card activation receipt
              </p>
              <Button
                onClick={startPrinting}
                className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8'
                size='lg'
              >
                <Printer className='mr-2 h-4 w-4' />
                Start Printing
              </Button>
            </div>
          )}

          {!isPrinting && !printComplete && massProductionMode && (
            <div className='text-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-primary font-medium'>Auto-starting print...</p>
            </div>
          )}

          {isPrinting && (
            <div className='py-4'>
              <div className='flex items-center justify-center mb-6'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                <span className='ml-3 text-primary font-medium'>
                  Printing...
                </span>
              </div>

              <div className='relative bg-muted/30 rounded-lg h-64 overflow-hidden border-2 border-dashed border-muted-foreground/20'>
                {/* Printer slot at bottom */}
                <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-muted-foreground/40 rounded-t-lg'></div>

                {/* Animated paper with QR code emerging from bottom */}
                <div
                  className='absolute left-1/2 transform -translate-x-1/2 w-40 bg-white rounded-lg shadow-lg border transition-all duration-100'
                  style={{
                    bottom: `${-100 + paperPosition * 1.2}%`,
                    height: "180px",
                  }}
                >
                  <div className='p-4 h-full flex flex-col items-center justify-center'>
                    <QrCode className='h-16 w-16 text-foreground mb-2' />
                    <div className='text-xs text-center space-y-1'>
                      <div className='font-bold'>ACTIVATION</div>
                      <div className='text-muted-foreground'>**** 8742</div>
                      <div className='text-muted-foreground'>
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {printComplete && (
            <div className='text-center py-8'>
              <CheckCircle className='h-16 w-16 text-primary mx-auto mb-4' />
              <p className='text-primary font-semibold text-lg mb-2'>
                Print Complete!
              </p>
              <p className='text-muted-foreground'>
                {massProductionMode
                  ? "Returning to main screen automatically..."
                  : "Your activation receipt has been printed successfully"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className='fixed bottom-6 left-6 right-6'>
        <Button
          onClick={onBack}
          variant='outline'
          className='w-full border-muted text-muted-foreground hover:bg-muted hover:text-foreground bg-background/80 backdrop-blur-sm'
          size='lg'
          disabled={isPrinting}
        >
          <X className='mr-2 h-4 w-4' />
          Close
        </Button>
      </div>
    </div>
  );
}
