"use client";
import { useState } from "react";
import Header, { TransactionList } from "@/app/components/transactions/indexPage";
import AddTransaction from "@/app/components/toggles/AddTransaction";

const Transaction = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [setupTransactionId, setSetupTransactionId] = useState<number | null>(null);

  const toggleAddTransaction = () => {
    setShowAddTransaction(true);
  };

  const closeAddTransaction = () => {
    setShowAddTransaction(false);
  };

  const handleSetupTransactionClick = (TransactionId: number) => {
    setSetupTransactionId(TransactionId); // Set the ID for the setup form
  };

  const closeSetupTransaction = () => {
    setSetupTransactionId(null); // Close the setup Transaction form
  };

  return (
    <>
      <header>
        <title>Transactions</title>
      </header>
      <div>
        <Header onAddTransactionClick={toggleAddTransaction} onSetupTransactionClick={handleSetupTransactionClick} />
      </div>
      {showAddTransaction && (
        <div className="block">
          <AddTransaction onClose={closeAddTransaction} />
        </div>
      )}
      
      <div className="bg-white h-[73vh] w-full rounded-lg border">
        <TransactionList onSetupTransactionClick={handleSetupTransactionClick} />
      </div>
    </>
  );
};

export default Transaction;