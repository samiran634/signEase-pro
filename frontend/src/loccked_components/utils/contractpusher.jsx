import React, { useEffect, useState } from "react";
import { RoomProvider, useMutation, useStorageRoot } from "../../../liveblocks.config";

const AddContractRoom = ({ contract, onComplete }) => {
  const root = useStorageRoot();
  const [ready, setReady] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);

  const addContract = useMutation(({ storage }, newContract) => {
    console.log("💡 Mutation triggered with:", newContract);
    const contracts = storage.get("contracts");
    if (contracts) {
      contracts.push(newContract);
    } else {
      storage.set("contracts", [newContract]);
    }
  }, []);

  // Wait until Liveblocks storage is fully loaded
  useEffect(() => {
    if (root) {
      setReady(true);
    }
  }, [root]);

  useEffect(() => {
    if (ready && contract && !hasAdded) {
      setHasAdded(true); // prevent double-send
      addContract(contract)
        .then(() => {
          console.log("✅ Contract added!");
          onComplete?.();
        })
        .catch((err) => {
          console.error("❌ Error adding contract:", err);
        });
    }
  }, [ready, contract, hasAdded, addContract, onComplete]);

  return null;
};

export const ContractSender = ({ orgId, contractData, onComplete }) => (
  <RoomProvider id={`org_${orgId}`} initialStorage={{ contracts: [] }}>
    <AddContractRoom contract={contractData} onComplete={onComplete} />
  </RoomProvider>
);
