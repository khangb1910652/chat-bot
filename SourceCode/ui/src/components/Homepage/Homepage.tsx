import ServiceIconDown from "assets/icons/down-icon.svg";
import LowMoneySvg from "assets/icons/low_money.svg";
import SupportEnFlag from "assets/images/en-flag.svg";
import BackgroundPurple from "assets/images/background_purple.svg";
import HighPerform from "assets/icons/high_perform.svg";
import Community from "assets/icons/community.svg";
import Realtime from "assets/icons/real_time.svg";
import Encryption from "assets/icons/encryption.svg";
import Blockchain from "assets/icons/blockchain.svg";
import { useNavigate } from "react-router-dom";
import { CustomBackground } from "./CustomBackground";
import { Button } from "@mui/material";
import { useContext } from "react";
import { TransactionContext } from "context/TransactionContext";
import { Loading } from "components/Loading/Loading";

export const HomePage = () => {
  const { connectWallet, currentAccount, sendTransaction, isLoading, handleLoading } =
    useContext(TransactionContext);

  const navigate = useNavigate();
  const handleGetStarted = async () => {
    await sendTransaction();
    navigate("/chatbot");
  };

  return (
    <>
      {isLoading && (
        <div className="opacity-90 bg-white z-50 flex items-center justify-center fixed text-center w-full h-screen">
          <Loading />
        </div>
      )}
      <div className="absolute-full">
        <CustomBackground />
        <div className="absolute left-0 top-[5rem] w-full h-full">
          <div className="overflow-x-hidden flex flex-col items-center space-y-24">
            <div className="flex flex-col items-center mb-20 w-[60%] bg-white">
              <img
                src="https://xrpl.org/assets/img/lightmode/home-hero.svg"
                width={"100%"}
              />
              <div className="font-bold text-[40px]">
                Like chat with others people
              </div>
            </div>
            <div className="w-full bg-white flex relative">
              <div className="absolute">
                <BackgroundPurple />
              </div>
              <div className="w-[40%] m-auto">
                <div className="text-center">
                  <div className="font-extrabold text-[52px]">
                    Assistant Bot
                  </div>
                  <div className="font-extrabold text-[52px]">
                    Powered Utility
                  </div>
                </div>
                <div className="flex justify-center mt-16">
                  {currentAccount ? (
                    <Button
                      variant="contained"
                      size="large"
                      className="bg-blue-600"
                      onClick={() => handleGetStarted()}
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      className="bg-blue-600"
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </div>
                <div className="pt-[8rem] font-bold text-[34px]">
                  The XRP Ledger: A Scalable, Sustainable Blockchain
                </div>
                <div className="mt-10 text-[18px]">
                  The XRP Ledger (XRPL) is a decentralized, public blockchain
                  led by a global developer community.
                </div>
                <div className="mt-10">
                  It’s fast, energy efficient, and reliable. With ease of
                  development, low transaction costs, and a knowledgeable
                  community, it provides developers with a strong open-source
                  foundation for executing on the most demanding
                  projects—without hurting the environment.
                </div>
              </div>
            </div>
            <div className="w-full bg-white">
              <div className="m-auto z-10 w-[80%]">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="font-semibold text-3xl mb-10">
                      Discover Benefits
                    </div>
                    <div className="grid grid-cols-3 bg-white rounded-lg gap-10">
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <LowMoneySvg />
                        <div className="font-semibold text-xl">Low Cost</div>
                        <div className="text-[16px]">
                          At fractions of a penny per transaction, costs are
                          inexpensive enough to enable a wide variety of use
                          cases
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <HighPerform />
                        <div className="font-semibold text-xl">
                          High Performance
                        </div>
                        <div className="text-[16px]">
                          Capable of settling thousands of transactions in
                          seconds
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <div className="w-[64px] h-[64px]">
                          <Community />
                        </div>
                        <div className="font-semibold text-xl">
                          Vibrant Community
                        </div>
                        <div className="text-[16px]">
                          Developers, validators, users, and businesses make the
                          XRP Ledger better every day
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <div className="w-[64px] h-[64px]">
                          <Realtime />
                        </div>
                        <div className="font-semibold text-xl">Realtime</div>
                        <div className="text-[16px]">
                          At fractions of a penny per transaction, costs are
                          inexpensive enough to enable a wide variety of use
                          cases
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <div className="w-[64px] h-[64px]">
                          <Encryption />
                        </div>
                        <div className="font-semibold text-xl">Encryption</div>
                        <div className="text-[16px]">
                          At fractions of a penny per transaction, costs are
                          inexpensive enough to enable a wide variety of use
                          cases
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3 max-w-[20rem]">
                        <div className="w-[64px] h-[64px]">
                          <Blockchain />
                        </div>
                        <div className="font-semibold text-xl">
                          Decentralized Structure
                        </div>
                        <div className="text-[16px]">
                          At fractions of a penny per transaction, costs are
                          inexpensive enough to enable a wide variety of use
                          cases
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="font-semibold text-3xl mb-10">
                    Preview New Features
                  </div>
                  <div className="flex space-x-10">
                    <div className="">
                      <Button variant="outlined" color="success">
                        In Development
                      </Button>
                      <div className="font-semibold text-xl mt-5 mb-3">
                        Smart Contracts
                      </div>
                      <div>
                        Hooks are small, efficient WebAssembly modules designed
                        specifically for the XRPL. Check out the hooks amendment
                        and public testnet that enable smart contract
                        functionality.
                      </div>
                    </div>
                    <div>
                      <Button variant="outlined" color="success">
                        In Development
                      </Button>
                      <div className="font-semibold text-xl mt-5 mb-3">
                        Smart Contracts
                      </div>
                      <div>
                        Hooks are small, efficient WebAssembly modules designed
                        specifically for the XRPL. Check out the hooks amendment
                        and public testnet that enable smart contract
                        functionality.
                      </div>
                    </div>
                    <div>
                      <Button variant="outlined" color="success">
                        In Development
                      </Button>
                      <div className="font-semibold text-xl mt-5 mb-3">
                        Smart Contracts
                      </div>
                      <div>
                        Hooks are small, efficient WebAssembly modules designed
                        specifically for the XRPL. Check out the hooks amendment
                        and public testnet that enable smart contract
                        functionality.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
