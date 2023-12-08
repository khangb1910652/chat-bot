import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import {
  contractABI,
  contractAddress,
  feeValue,
  gasValue,
} from "constants/constants";
import { CustomToast } from "components/Customtoast/Customtoast";
import { customToast } from "utils/toast";
import { sleep } from "utils/utils";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const { ethereum } = window;

interface TransactionContextType {
  connectWallet: () => Promise<void>;
  currentAccount: string;
  sendTransaction: () => Promise<void>;
  isTokenValid: (address?: string) => Promise<boolean>;
  isLoading: boolean;
  handleLoading: (isLoading?: boolean) => any;
}

export const TransactionContext = createContext<TransactionContextType>({
  connectWallet: async () => {},
  currentAccount: "",
  sendTransaction: async () => {},
  isTokenValid: async () => false,
  isLoading: false,
  handleLoading: () => {},
});

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [isLoading, toggleLoading] = useState(false);

  const transactionContract = getEthereumContract();

  const handleLoading = (isLoading?: boolean) => {
    toggleLoading(isLoading ?? false);
  };

  const isTokenValid = async (address?: string) => {
    try {
      toggleLoading(true);
      const thisTransaction = await transactionContract.getTransaction(
        address ?? currentAccount
      );

      const hexTimestamp = thisTransaction.timestamp._hex;
      const timestamp = parseInt(hexTimestamp, 16);

      const now = Math.floor(Date.now() / 1000);
      const diff = now - timestamp;
      if (diff < 3600) return true;
      return false;

      // console.log(thisTransaction.timestamp)
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      toggleLoading(false);
    }
  };

  const checkConnected = async () => {
    if (!ethereum) {
      customToast.error("Please install Metamask");
      return false;
    }
    try {
      toggleLoading(true);

      // fake sleep
      await sleep(2500);

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        // setCurrentAccount(accounts[0]);
        const isValid = await isTokenValid(accounts[0]);
        if (!isValid) {
          setCurrentAccount("");
          return;
        }
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };

  const connectWallet = async () => {
    if (!ethereum) {
      customToast.error("Please install MetaMask");
      return;
    }
    try {
      toggleLoading(true);

      // fake sleep
      await sleep(2500);

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        customToast.error("Please install MetaMask");
        return;
      }
      const isValid = await isTokenValid(currentAccount);
      
      toggleLoading(true);
      // send fee
      if (!isValid) {
        const transactionHash = await transactionContract.createNewTransaction(
          "test",
          "a@gmail.com",
          true,
          2000
        );

        await transactionHash.wait();
      }
    } catch (error) {
      if (error) {
        customToast.error("Payment failed! Try again later");
      }
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    checkConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        isTokenValid,
        isLoading,
        handleLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
