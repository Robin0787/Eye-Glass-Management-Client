import toast from "react-hot-toast";
import ProductCard from "../../../components/ui/ProductCard";
import CircleLoader from "../../../components/ui/circleLoader/CircleLoader";
import {
  useDeleteMultipleProductMutation,
  useGetAllProductQuery,
} from "../../../redux/features/products/productAPIs";
import { clearSelectedProducts } from "../../../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TProduct } from "../../../types/dashboard.types";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const AllProduct = () => {
  const { isLoading, data } = useGetAllProductQuery(undefined);
  const dispatch = useAppDispatch();
  const [deleteMultipleProduct] = useDeleteMultipleProductMutation();
  const selectedProducts = useAppSelector(
    (state) => state.product.selectedProduct
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black">
        <CircleLoader loader={true} />
      </div>
    );
  }

  const products: TProduct[] = data?.data;

  async function handleBulkDelete() {
    const toastId = toast.loading("Deleting products...");
    const payload = {
      products: selectedProducts,
    };
    const res = await handleAPIRequest(deleteMultipleProduct, payload, toastId);
    if (res) {
      dispatch(clearSelectedProducts());
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center text-black relative">
      {products?.length > 0 ? (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 overflow-y-scroll p-1 md:p-3 lg:p-5">
          {products?.map((product: TProduct) => (
            <ProductCard productDetails={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-1/2 flex justify-center items-center">
          <h1 className="text-3xl tracking-wider">No products found!!</h1>
        </div>
      )}

      {selectedProducts.length > 0 && (
        <div className="absolute top-3 right-2 flex justify-center items-end">
          <button
            onClick={handleBulkDelete}
            className="px-5 py-2 rounded-md text-lg bg-red-600 text-white tracking-wider hover:bg-red-700 duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
