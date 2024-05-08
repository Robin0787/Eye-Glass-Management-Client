import CircleLoader from "../../../components/ui/circleLoader/CircleLoader";
import { useSalesHistoryQuery } from "../../../redux/features/products/productAPIs";

const DashboardHome = () => {
  const { isLoading, data } = useSalesHistoryQuery(undefined);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black">
        <CircleLoader loader={true} />
      </div>
    );
  }

  const totalProductSold = data?.data?.totalProductSold || 0;
  const totalSaleAmount = data?.data?.totalSaleAmount || 0;

  return (
    <div className="w-full h-full flex justify-center items-center text-black">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 tracking-wider">
        <div className="bg-indigo-500 rounded-lg px-16 py-10 text-white text-center">
          <h1 className="text-5xl font-black mb-3">{totalProductSold}</h1>
          <h1 className="text-4xl">Products Sold</h1>
        </div>
        <div className="bg-red-500 rounded-lg px-12 py-10 text-white text-center">
          <h1 className="text-5xl font-black mb-3">{totalSaleAmount}</h1>
          <h1 className="text-4xl">Total Sales Amount</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
