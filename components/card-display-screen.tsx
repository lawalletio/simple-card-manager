"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, RotateCcw, Ship as Chip, Wifi, X } from "lucide-react"

interface CardDisplayScreenProps {
  onPrintActivation: () => void
  onReset: () => void
  onBack: () => void
}

export function CardDisplayScreen({ onPrintActivation, onReset, onBack }: CardDisplayScreenProps) {
  return (
    <div className="min-h-screen p-6 pb-24 relative">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Your Card</h1>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="relative">
          {/* Debit card with proper aspect ratio (85.60 × 53.98 mm, roughly 1.6:1) */}
          <Card className="w-80 h-50 relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/90 to-primary shadow-2xl rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

            <CardContent className="relative h-full p-6 flex flex-col justify-between text-white">
              {/* Top section with chip and contactless */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-9 bg-secondary rounded-md flex items-center justify-center">
                    <Chip className="h-6 w-6 text-black" />
                  </div>
                </div>
                <Wifi className="h-6 w-6 text-white/80" />
              </div>

              {/* Card number */}
              <div className="space-y-4"></div>
            </CardContent>

            {/* Card accent stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary to-secondary/80" />
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 max-w-sm mx-auto">
        <Button
          onClick={onPrintActivation}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          size="lg"
        >
          <Printer className="mr-3 h-5 w-5" />
          Print Activation
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold py-6 text-lg bg-transparent"
          size="lg"
        >
          <RotateCcw className="mr-3 h-5 w-5" />
          Reset Card
        </Button>
      </div>

      <div className="fixed bottom-6 left-6 right-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-muted text-muted-foreground hover:bg-muted hover:text-foreground bg-background/80 backdrop-blur-sm"
          size="lg"
        >
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
      </div>
    </div>
  )
}
