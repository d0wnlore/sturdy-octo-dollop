import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useEthersProvider } from '../ethers'
import React, { useState } from 'react';

export function Attester() {
  const EASContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A"; // Optimism Testnet (v0.27)

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  // Gets a default provider (in production use something else like infura/alchemy)
  const provider = useEthersProvider();

  // Connects an ethers style provider/signingProvider to perform read/write functions.
  // MUST be a signer to do write operations!
  eas.connect(provider);

  const uid = "0x8798c927242534d313710a09387b9093a6a627d7da30c8080b0b22857efab843";
  let attestation

  const [data, setData] = useState(null)

  const fetchData = async () => {
    attestation = await eas.getAttestation(uid);
    console.log('attestation', attestation)
    console.log('provider', provider)
  }

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>

      {/* {attestation && <div>Data: {JSON.stringify(attestation)}</div>} */}
    </div>
  )
}
