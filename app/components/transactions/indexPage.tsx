"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Transaction {
    t_id: number;
    tr_type: string;
    details: string;
    account: string;
    amount: string;
    tr_category: string; 
    created_at: string; 
    status: string;
  }


  interface HeaderProps {
    onAddTransactionClick: () => void;
    onSetupTransactionClick: (TransactionId: number) => void; // Prop for setup Transaction
  }
 
  const Header = ({ onAddTransactionClick, onSetupTransactionClick }: HeaderProps) => {
    return (
        <>
        <div className="flex justify-between py-2 items-center flex-wrap">
            <form method="get" className="flex bg-slate-100 py-1 px-2 justify-around">
                <div className="text-slate-600 text-sm flex items-center px-4">
                  <h4>From: </h4>
                  <input type="date" name="date-from" id="date-from" className=" py-1 px-2 rounded-md text-xs ml-3 outline-none border"/>
                </div>
                <div className="text-slate-600 text-sm flex items-center px-4">
                  <h4>To: </h4>
                  <input type="date" name="date-to" id="date-to" className=" py-1 px-2 rounded-md text-xs ml-3 outline-none border"/>
                </div>
                <select className="outline-none text-sm text-slate-500 border rounded-md bg-white" name="sort">
                        <option value="">Sort by</option>
                        <option value="cash-in">Cash In</option>
                        <option value="cash-out">Cash Out</option>
                        <option value="bank">Bank</option>
                        <option value="momo">Mobile Money</option>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                </select> 
                <button type="submit"  className="text-sm py-1 rounded-md px-4 hover:bg-white mx-[1px] text-slate-600">Show</button>
                
            </form>
            <div className="flex justify-between items-center">
                <form method="get" className="flex py-1 px-4 text-sm text-slate-500 border rounded-md bg-white mx-3">
                    <input type="search" name="search" placeholder="Search Transaction " className="outline-none" />
                    <button type="submit" className="bi bi-search text-base mr-1"></button>
                </form>
                
                {/* Button to show AddTransaction form */}
                <button
                    onClick={onAddTransactionClick}
                    className="bg-black rounded-md py-[6px] px-4 text-white text-sm"
                >
                    <i className="bi bi-plus-circle mr-1"></i>
                    <span>Add Transaction</span>
                </button>
            </div>
        </div>
        </>
    );
};
const TransactionList = ({ onSetupTransactionClick }: { onSetupTransactionClick: (TransactionId: number) => void }) => {
  const [Transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const searchParams = useSearchParams(); // Hook to access URL search parameters

  // Function to fetch Transactions
  const fetchTransactions = (url: string) => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Transactions");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Construct the API URL with search parameters
    const baseUrl = "/api/transactions";
    const queryString = searchParams.toString();
    const apiUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    // Fetch Transactions based on the URL search parameters
    fetchTransactions(apiUrl);
  }, [searchParams]); // Re-fetch when searchParams change


  const toggleDropdown = (TransactionId: number) => {
      setDropdownOpen(dropdownOpen === TransactionId ? null : TransactionId);
  };

  const handleArchive = async (TransactionId: number) => {
      const response = await fetch(`/api/Transaction/deleteItem/archive/${TransactionId}`, {
          method: 'GET',
      });

      if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json(); // Try to parse JSON
        } catch (err) {
            // If parsing fails, handle it here
            setError("Failed to archive Transaction: Server returned an error without JSON.");
            return;
        }
        
        setError(errorData.message || "Failed to archive Transaction");
        return;
    }

      // Update the Transactions list to remove the archived Transaction or update its status
      setTransactions((prevTransactions) => 
          prevTransactions.map(Transaction => 
              Transaction.t_id === TransactionId ? { ...Transaction, status: 'Archived' } : Transaction
          )
      );
  };
  const handleUpdate = async (TransactionId: number) => {
    const response = await fetch(`/api/Transaction/update/${TransactionId}`, {
        method: 'PUT',
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (err) {
            setError("Failed to approve Transaction: Server returned an error without JSON.");
            return;
        }
        
        setError(errorData.message || "Failed to approve Transaction");
        return;
    }

    // Update the Transactions list to set the approved status
    setTransactions((prevTransactions) => 
        prevTransactions.map(Transaction => 
            Transaction.t_id === TransactionId ? { ...Transaction, status: 'Inactive' } : Transaction
        )
    );
};

const handleDelete = async (TransactionId: number) => {
    const response = await fetch(`/api/Transaction/delete/${TransactionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (err) {
            setError("Failed to delete Transaction: Server returned an error without JSON.");
            return;
        }
        
        setError(errorData.message || "Failed to delete Transaction");
        return;
    }

    // Update the Transactions list to remove the deleted Transaction
    setTransactions((prevTransactions) => 
        prevTransactions.filter(Transaction => Transaction.t_id !== TransactionId)
    );
};

  if (loading) {
      return <div className="text-center py-6">Loading Transactions...</div>;
  }

  if (error) {
      return <div className="text-center text-red-500 py-6"> {error}</div>;
  }
  let id = 0;
  return (
      <>
          <h4 className="text-lg font-semibold text-slate-700 border-b p-4">Transactions List ({Transactions.length})</h4>
          <div className="overflow-x-auto overflow-y-visible">
          {Transactions.length <= 0 ? (
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                   <div className="flex flex-col justify-center items-center opacity-65">
                     <div className="img w-[200px] h-[200px]">
                        <img src="/icons/delete.png" alt="" className="w-full h-full object-contain"/>
                     </div>
                     <i>No Transaction found.</i>
                   </div>
                </div>
            ) : (
                <>
              <table className="min-w-full table-auto bg-white">
                  <thead className="border-b px-4">
                      <tr className="text-sm leading-tight text-gray-400 font-light">
                          <th className="py-3 px-6 text-left">Id</th>
                          <th className="py-3 px-6 text-left">Type</th>
                          <th className="py-3 px-6 text-left">Category</th>
                          <th className="py-3 px-6 text-left">Account</th>
                          <th className="py-3 px-6 text-left">Amount</th>
                          <th className="py-3 px-6 text-left">Details</th>
                          <th className="py-3 px-6 text-left">Created_at</th>
                          <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                      {Transactions.map((Transaction) => (
                         
                          <tr
                              key={Transaction.t_id}
                              className="border-b border-gray-200 hover:bg-gray-50"
                          >
                              <td className="py-2 px-6 text-left flex items-center space-x-2">
                                  <span>{id +=1 }</span>
                              </td>
                              <td className="py-2 px-6">{Transaction.tr_type}</td>
                              <td className="py-2 px-6">{Transaction.tr_category}</td>
                              <td className="py-2 px-6 capitalize">{Transaction.account}</td>
                              <td className="py-2 px-6">{Transaction.amount}</td>
                              <td className="py-2 px-6">{Transaction.details}</td>
                              <td className="py-2 px-6">{Transaction.created_at}</td>
                              
                              <td className="py-2 px-6 text-center relative">
                                  <i
                                      className="bi bi-three-dots cursor-pointer text-xl"
                                      onClick={() => toggleDropdown(Transaction.t_id)}
                                  ></i>
                                  {dropdownOpen === Transaction.t_id && (
                                      <div className="absolute right-0 mt-1 mr-1 w-36 bg-white border rounded-md shadow-lg z-10">
                                          <ul className="py-1 text-gray-700">
                                              
                                              <li
                                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                                  onClick={() => {
                                                      handleDelete(Transaction.t_id); // Delete the Transaction
                                                      toggleDropdown(Transaction.t_id); // Close the dropdown
                                                  }}
                                              >
                                                  <i className="bi bi-trash mr-2 text-red-500 hover:bg-slate-100"></i> Delete
                                              </li>
                                          </ul>
                                      </div>
                                  )}
                              </td>
                          </tr>
                          
                      ))}
                  </tbody>
              </table>
              </>
            )}
          </div>
      </>
  );
};

export default Header;
export {TransactionList};