/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoDuplicate } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/features/products/productAPIs";
import {
  setSelected,
  setUnSelected,
} from "../../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../types/dashboard.types";
import ConfirmModal from "./ConfirmModal";

const ProductCard = ({ productDetails }: { productDetails: TProduct }) => {
  const {
    _id,
    name,
    image,
    brand,
    frame,
    shape,
    lensType,
    color,
    frameSize,
    gender,
    quantity,
    price,
    addedBy,
  } = productDetails;

  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [deleteProduct] = useDeleteProductMutation();
  const { role } = useAppSelector((state) => state.auth.user);
  const isManager = role === "manager";

  async function handleDelete(payload: string) {
    try {
      const res = await deleteProduct(payload).unwrap();
      toast.success(res?.data?.message || "Product deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
    setConfirmModal(false);
  }

  function handleSelectProduct(e: ChangeEvent<HTMLInputElement>) {
    setIsSelected(e.target.checked);
    if (e.target.checked) {
      dispatch(setSelected(_id));
    } else {
      dispatch(setUnSelected(_id));
    }
  }

  return (
    <div className="w-full h-min shadow-[1px_1px_5px_2px] shadow-black/10  p-3 rounded-lg text-black relative group overflow-hidden">
      <div
        className={`absolute  ${
          isSelected
            ? "top-1 left-1"
            : "-top-8 -left-8 group-hover:left-1 group-hover:top-1"
        }  duration-300`}
      >
        <input
          className="size-6 rounded-lg cursor-pointer border-none checked:text-primaryBg"
          type="checkbox"
          onChange={handleSelectProduct}
        />
      </div>
      <div className="w-full h-full tracking-wider">
        <section className="flex flex-col gap-2">
          <div className="w-full">
            <img
              src={image}
              alt="lens photo"
              className="w-full h-full min-h-[200px] rounded-lg mx-auto"
            />
          </div>
          <section>
            <div className="my-3">
              <h2 className="text-2xl font-black text-center">{name}</h2>
            </div>
            <div className="w-full">
              <div className="text-base lg:text-lg text-gray-800 space-y-1 capitalize">
                <div className="flex justify-between items-center">
                  <p>
                    Brand:{" "}
                    <span className="font-black text-gray-800">{brand}</span>
                  </p>
                  <p>
                    Frame:{" "}
                    <span className="font-black text-gray-800">{frame}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Lens Type:{" "}
                    <span className="font-black text-gray-800">{lensType}</span>
                  </p>
                  <p>
                    Color:{" "}
                    <span className="font-black text-gray-800">{color}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Shape:{" "}
                    <span className="font-black text-gray-800">{shape}</span>
                  </p>
                  <p>
                    Size:{" "}
                    <span className="font-black text-gray-800">
                      {frameSize}
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-between items-center text-base lg:text-lg">
                  <p>
                    Quantity: <span className="font-black">{quantity}</span>
                  </p>
                  <p>
                    Gender:{" "}
                    <span className="font-black text-gray-800">{gender}</span>
                  </p>
                </div>
                <p>
                  Price: <span className="font-black">{price}</span>
                </p>
                {isManager && (
                  <p>
                    Added By:{" "}
                    <span className="font-black lowercase">{addedBy}</span>
                  </p>
                )}
              </div>
            </div>
          </section>
          <div className="w-full pt-1">
            <div className="w-full flex justify-center items-center gap-3 mb-2">
              <button
                onClick={() => {
                  setConfirmModal(true);
                }}
                className="w-1/2 py-3 rounded-lg text-gray-200 bg-red-600 flex justify-center items-center hover:text-white hover:bg-red-700 duration-300"
              >
                <FaTrashCan size={15} />
              </button>
              <Link
                to={`/dashboard/products/edit-product/${_id}`}
                className="w-1/2 py-3 rounded-lg text-gray-200 bg-green-600 flex justify-center items-center hover:text-white hover:bg-green-700 duration-300"
              >
                <FaEdit size={15} />
              </Link>
            </div>
            <div className="w-full">
              <Link
                to={`/dashboard/products/duplicate-product/${_id}`}
                className="px-4 py-[10px] rounded-lg text-gray-200 bg-blue-600 flex justify-center items-center gap-2 hover:text-white hover:bg-blue-700 tracking-wider duration-300"
              >
                <IoDuplicate size={20} />
                <span className="text-lg tracking-wider">Edit & Duplicate</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <ConfirmModal
        payload={_id}
        openModal={confirmModal}
        setOpenModal={setConfirmModal}
        modalHandler={handleDelete}
      />
    </div>
  );
};

export default ProductCard;
