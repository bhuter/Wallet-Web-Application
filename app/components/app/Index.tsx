import Budget from "./budget";

interface HeaderProps {
  onAddTransactionClick: () => void;
}
const Header = ({ onAddTransactionClick }: HeaderProps) => {
  return (
    <>
      <div className="flex justify-between py-3">
       <h1 className=" text-slate-600">General Status</h1>
        <button className="bg-teal-500 py-1 px-6 text-white rounded-md mx-2" onClick={onAddTransactionClick}>
          <i className="bi bi-circle-arrow-up"></i> Set Budget
        </button>
      </div>
    </>
  );
};

const SalesDash = () => {
  return (
      <>
      <div className="flex justify-between">

      <div className="bg-white border px-4 py-3 w-[250px] rounded-md mb-5">
          <div className="flex justify-between items-center text-slate-400 text-base pb-1">
              <h4 className="text-base font-medium text-slate-400">Total Sales</h4>
              <i className="bi bi-cart-plus cart-plus text-xl mx-2 text-green-600 py-1 px-2 bg-green-50 rounded-full"></i>
          </div>
          <div className="text-xl font-bold text-slate-600 py-2">$34,500.80 <span className="text-xs font-medium text-slate-400">390</span></div>
         <div className="flex items-center"> 
          <div className="bg-green-50 bg-opacity-80 text-green-500 font-semibold p-1 mr-3 rounded-md  w-max text-xs"><i className="bi bi-graph-up-arrow mr-[1px]"></i> 14%</div>
          <div className="font-normal text-base ml-2 text-slate-400">in the last week</div>
         </div>
      </div>
      <div className="bg-white border px-4 py-3 gap-4 w-[250px] rounded-md mb-5">
          <div className="flex justify-between items-center text-slate-400 text-base pb-1">
              <h4 className="text-base font-medium text-slate-400">Total Orders</h4>
              <i className="bi bi-three-dots cart-plus text-xl mx-2 text-green-600 py-1 px-2 bg-green-50 rounded-full"></i>
          </div>
          <div className="text-xl font-bold text-slate-600 py-2">4,500 <span className="text-xs font-medium text-slate-400">390</span></div>
         <div className="flex items-center"> 
          <div className="bg-red-50 bg-opacity-80 text-red-500 font-semibold p-1 mr-3 rounded-md  w-max text-xs"><i className="bi bi-graph-down-arrow mr-[1px]"></i> 17%</div>
          <div className="font-normal text-base ml-2 text-slate-400">in the last week</div>
         </div>
      </div>
      <div className="bg-white border px-4 py-3 w-[250px] rounded-md mb-5">
          <div className="flex justify-between items-center text-slate-400 text-base pb-1">
              <h4 className="text-base font-medium text-slate-400">Total Revenue</h4>
              <i className="bi bi-three-dots cart-plus text-xl mx-2 text-green-600 py-1 px-2 bg-green-50 rounded-full"></i>
          </div>
          <div className="text-xl font-bold text-slate-600 py-2">$12,670 <span className="text-xs font-medium text-slate-400">390</span></div>
         <div className="flex items-center"> 
          <div className="bg-green-50 bg-opacity-80 text-green-500 font-semibold p-1 mr-3 rounded-md  w-max text-xs"><i className="bi bi-graph-up-arrow mr-[1px]"></i> 14%</div>
          <div className="font-normal text-base ml-2 text-slate-400">in the last week</div>
         </div>
      </div>
      <div className="bg-white border px-4 py-3 w-[250px] rounded-md mb-5">
          <div className="flex justify-between items-center text-slate-400 text-base pb-1">
              <h4 className="text-base font-medium text-slate-400">Total Customer</h4>
              <i className="bi bi-people text-xl mx-2 text-green-600 py-1 px-2 bg-green-50 rounded-full"></i>
          </div>
          <div className="text-xl font-bold text-slate-600 py-2">130 <span className="text-xs font-medium text-slate-400">90</span></div>
         <div className="flex items-center"> 
          <div className="bg-red-50 bg-opacity-80 text-red-500 font-semibold p-1 mr-3 rounded-md  w-max text-xs"><i className="bi bi-graph-down-arrow mr-[1px]"></i> 72%</div>
          <div className="font-normal text-base ml-2 text-slate-400">in the last week</div>
         </div>
      </div>
      </div>
      <Budget />
      </>
  );
};



// Default export for Header
export default Header;

// Named export for SalesDash
export { SalesDash };
