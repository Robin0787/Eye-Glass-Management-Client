import { useState } from "react";
import toast from "react-hot-toast";
import ListDropdown from "../../../components/ui/ListDropdown/ListDropdown";
import SellProductCard from "../../../components/ui/SellProductCard";
import CircleLoader from "../../../components/ui/circleLoader/CircleLoader";
import { glassSearchableFields } from "../../../constant/sellProduct.constant";
import { useGetAllProductQuery } from "../../../redux/features/products/productAPIs";
import { TProduct } from "../../../types/dashboard.types";

export interface TSearchQuery {
  field?: string;
  value?: string;
}

const SellProduct = () => {
  const [searchField, setSearchField] = useState<string>(
    glassSearchableFields[0]
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<TSearchQuery>({
    field: "",
    value: "",
  });
  const { isLoading, data } = useGetAllProductQuery(searchQuery);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black">
        <CircleLoader loader={true} />
      </div>
    );
  }

  const products: TProduct[] = data?.data;

  function handleSearchList(selected: string) {
    setSearchField(selected);
  }

  function handleSearch() {
    if (!searchField) {
      toast.error(`Select a field to search`);
      return;
    } else if (!searchValue) {
      toast.error(`Write something to search`);
      return;
    }
    setSearchQuery({
      field: searchField,
      value: searchValue,
    });
  }

  return (
    <section className="w-full h-full text-black p-1 md:p-3 lg:p-5 space-y-8">
      <div className="w-full py-5">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto flex justify-center items-center gap-0">
          <div className="w-[30%]">
            <ListDropdown
              title="Field"
              items={glassSearchableFields}
              selected={searchField}
              handleList={handleSearchList}
              border="border border-r-0 rounded-l-full"
              align="text-center"
            />
          </div>
          <div className="w-[70%] flex flex-row justify-center items-center border border-secondary/30 rounded-r-full overflow-hidden">
            <input
              type="text"
              className="searchInput"
              placeholder={`Search Product by ${searchField?.toUpperCase()}`}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              value={searchValue}
            />
            <button
              onClick={handleSearch}
              className="rounded-r-full py-3 px-4 bg-transparent hover:bg-black/10  duration-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {products.length > 0 ? (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 overflow-y-scroll">
          {products?.map((product: TProduct) => (
            <SellProductCard productDetails={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-1/2 flex justify-center items-center">
          <h1 className="text-3xl tracking-wider">No products found!!</h1>
        </div>
      )}
    </section>
  );
};

export default SellProduct;
