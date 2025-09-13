"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Trash2, CheckCircle } from "lucide-react"

interface QRResetScreenProps {
  onBack: () => void
}

export function QRResetScreen({ onBack }: QRResetScreenProps) {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [printLines, setPrintLines] = useState<string[]>([])

  useEffect(() => {
    if (isProcessing) {
      const lines = [
        "CARD RESET REQUEST",
        "==================",
        "Card ID: ****-****-1234",
        "Status: ACTIVE → INACTIVE",
        "Database: UPDATING...",
        "Removing card data...",
        "Clearing permissions...",
        "Reset timestamp: " + new Date().toLocaleString(),
        "==================",
        "RESET COMPLETED",
      ]

      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < lines.length) {
          setPrintLines((prev) => [...prev, lines[currentIndex]])
          currentIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              onBack()
            }, 2000)
          }, 1000)
        }
      }, 400)

      return () => clearInterval(interval)
    }
  }, [isProcessing, onBack])

  const handleConfirmReset = () => {
    setShowConfirmation(false)
    setIsProcessing(true)
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen p-6 pb-24 relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Reset Card</h1>
          <div className="w-16" />
        </div>

        {/* Warning Disclaimer */}
        <Card className="mb-6 border-destructive/30 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-destructive mb-2 text-lg">⚠️ PERMANENT ACTION</p>
                <p className="text-sm text-foreground mb-3">
                  This action will <strong>permanently remove</strong> your card from the database and cannot be undone.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Card will be completely deactivated</p>
                  <p>• All card data will be deleted from our servers</p>
                  <p>• You will need to request a new card to continue using our services</p>
                  <p>• This process cannot be reversed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Question */}
        <Card className="mb-6">
          <CardContent className="pt-6 text-center">
            <Trash2 className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Are you absolutely sure?</h2>
            <p className="text-muted-foreground mb-6">
              This will permanently delete your card and remove all associated data from our database.
            </p>
            <p className="text-sm font-medium text-foreground">
              Touch the button below to confirm this permanent action.
            </p>
          </CardContent>
        </Card>

        {/* Confirmation Buttons */}
        <div className="space-y-3">
          <Button onClick={handleConfirmReset} variant="destructive" className="w-full" size="lg">
            <Trash2 className="mr-2 h-4 w-4" />
            Yes, Permanently Delete My Card
          </Button>

          <Button onClick={onBack} variant="outline" className="w-full bg-transparent" size="lg">
            Cancel - Keep My Card
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 pb-24 relative">
      {/* Header */}
      <div className="mb-6 flex items-center justify-center">
        <h1 className="text-2xl font-bold">{isComplete ? "Reset Complete" : "Processing Reset..."}</h1>
      </div>

      {/* Processing Animation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            {isComplete ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Card Successfully Removed</span>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span>Removing Card from Database</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Print Receipt Animation */}
          <div className="bg-white rounded-lg p-4 shadow-inner border-2 border-gray-200 min-h-[300px] font-mono text-xs">
            <div className="space-y-1">
              {printLines.map((line, index) => (
                <div
                  key={index}
                  className="animate-fade-in text-black whitespace-pre-wrap"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {line}
                </div>
              ))}
              {isProcessing && !isComplete && <div className="animate-pulse">|</div>}
            </div>
          </div>
        </CardContent>
      </Card>

      {isComplete && (
        <div className="text-center text-muted-foreground">
          <p>Returning to main screen...</p>
        </div>
      )}
    </div>
  )
}
