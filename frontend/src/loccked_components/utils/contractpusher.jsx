 

import React, { useEffect } from "react";
import { RoomProvider, useMutation, useStorage } from "../../../liveblocks.config";

const AddContractRoom = ({ contract, onComplete }) => {
  const storage = useStorage(); // returns null until storage is ready
  const addContract = useMutation(({ storage }, newContract) => {
    const contracts = storage.get("contracts");

    if (contracts) {
      contracts.push(newContract);
    } else {
      storage.set("contracts", [newContract]);
    }
  }, []);

  useEffect(() => {
    if (storage && contract) {
      addContract(contract).then(() => {
        onComplete?.();
      });
    }
  }, [storage, contract, addContract, onComplete]);

  return null;
};

export const ContractSender = ({ orgId, contractData, onComplete }) => (
  <RoomProvider id={`org_${orgId}`} initialStorage={{ contracts: [] }}>
    <AddContractRoom contract={contractData} onComplete={onComplete} />
  </RoomProvider>
);
