"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LNURLResponse } from "@/types/lnurl";

interface OTCResponse {
  url: string;
  otc: string;
}

interface CardContextType {
  cardResponse: LNURLResponse | null;
  isReady: boolean;
  setCardResponse: (response: LNURLResponse) => void;
  getOTC: () => Promise<OTCResponse>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cardResponse, setCardResponseState] = useState<LNURLResponse | null>(
    null
  );
  const [isReady, setIsReady] = useState(false);

  const setCardResponse = (response: LNURLResponse) => {
    setCardResponseState(response);
    setIsReady(true);
  };

  const getOTC = async (): Promise<OTCResponse> => {
    if (!isReady || !cardResponse) {
      throw new Error("Card is not ready. Please set card response first.");
    }

    try {
      const response = await fetch(cardResponse.callback, {
        method: "GET",
        headers: {
          LAWALLET_ACTION: "new-otc",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        url: data.url,
        otc: data.otc,
      };
    } catch (error) {
      throw new Error(
        `Failed to get OTC: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <CardContext.Provider
      value={{
        cardResponse,
        isReady,
        setCardResponse,
        getOTC,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCurrentCard() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}
