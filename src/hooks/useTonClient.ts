import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useState } from "react";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      const endpoint = await getHttpEndpoint({
        network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
      });
      
      return new TonClient({
        endpoint,
      });
    }, [network]),
  };
}
