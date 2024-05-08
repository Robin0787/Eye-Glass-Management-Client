/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdPricetag } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { TSellProductPayload } from "../../redux/Types/productAPIs.types";
import { useSellProductMutation } from "../../redux/features/products/productAPIs";
import { useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../types/dashboard.types";
import getErrorMessage from "../../utils/getErrorMessage";
import CustomModalWithChildren from "./CustomModalWithChildren";
import SaleInvoice from "./SaleInvoice";
import InputField from "./inputField/InputField";

interface TSellProductModalInfo {
  buyerName: string;
  quantity: number;
  date: string;
}

const SellProductCard = ({ productDetails }: { productDetails: TProduct }) => {
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

  const [openModal, setModal] = useState<boolean>(false);
  const [openInvoiceModal, setInvoiceModal] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<TSellProductPayload>({
    buyerName: "",
    quantity: 0,
    product: "",
    date: "",
  });

  const { role } = useAppSelector((state) => state.auth.user);
  const isManager = role === "manager";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSellProductModalInfo>({
    defaultValues: {
      date: moment().format("L"),
    },
  });
  const [sellProduct] = useSellProductMutation();

  const handleSellProduct = async (data: TSellProductModalInfo) => {
    const payload: TSellProductPayload = {
      ...data,
      quantity: Number(data.quantity),
      product: _id,
    };
    try {
      const res = await sellProduct(payload).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        setInvoiceData({
          product: productDetails.name,
          buyerName: data.buyerName,
          quantity: Number(data.quantity),
          date: data.date,
        });
      }
      setModal(false);
      setInvoiceModal(true);
    } catch (err: any) {
      console.log(err);
      const errorSources = err?.data?.errorSources;
      if (errorSources) {
        errorSources.map((issue: any) => {
          toast.error(issue?.message);
        });
      } else {
        toast.error(err?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="w-full h-min shadow-[1px_1px_5px_2px] shadow-black/10 p-3 rounded-lg text-black">
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
        </section>
        <div className="flex justify-center items-center pt-2">
          <button
            onClick={() => {
              setModal(true);
            }}
            className="w-full py-2 rounded-lg text-gray-200 bg-green-600 flex justify-center items-center gap-1 hover:text-white hover:bg-green-500 duration-500"
          >
            <IoMdPricetag size={20} />
            <span className="text-lg tracking-wider">Sell</span>
          </button>
        </div>
      </div>
      <CustomModalWithChildren openModal={openModal} setModal={setModal}>
        <section className="h-full w-[calc(100vw-20px)] md:w-[80vw] lg:w-[30vw] bg-primaryBg p-10 rounded-lg">
          <h1 className="text-center text-3xl xl:text-4xl pb-5 xl:pb-8 capitalize tracking-wider">
            Write Details
          </h1>
          <div className="w-full h-full">
            <form onSubmit={handleSubmit(handleSellProduct)}>
              <div className="flex flex-col gap-5 justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <div className="w-full">
                    <InputField
                      type="text"
                      id="buyerName"
                      label="Buyer Name"
                      register={register("buyerName", { required: true })}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      type="number"
                      label="Quantity"
                      id="quantity"
                      register={register("quantity", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      type="text"
                      label="Date"
                      id="date"
                      disabled={true}
                      register={register("date", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className=" w-full relative mt-4">
                  {Object.values(errors).length > 0 && (
                    <div className="absolute -top-7 left-0 flex justify-start items-center gap-1">
                      <LuAsterisk size={13} />
                      <span className="text-sm text-start tracking-wider">
                        {getErrorMessage(errors)}
                      </span>
                    </div>
                  )}
                  <button
                    className="btn flex justify-center items-center uppercase"
                    type="submit"
                  >
                    Sell Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </CustomModalWithChildren>
      <CustomModalWithChildren
        openModal={openInvoiceModal}
        setModal={setInvoiceModal}
      >
        <section className="h-full w-[calc(100vw-20px)] md:w-[80vw] lg:w-[40vw] bg-primaryBg p-10 rounded-lg">
          <h1 className="text-center text-3xl xl:text-4xl pt-5 capitalize font-bold tracking-wider">
            Product sold successfully
          </h1>
          <div className="w-full my-10 selection:text-gray-700">
            <SaleInvoice data={invoiceData} />
          </div>
          <div className="w-full h-full mx-auto">
            <div className="flex gap-5 justify-center items-center">
              <button
                onClick={() => {
                  setInvoiceModal(false);
                }}
                className="uppercase bg-red-600 w-[40%] py-3 text-lg rounded-md text-white hover:bg-red-700 duration-300"
                type="submit"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setInvoiceModal(false);
                }}
                className="w-[60%] uppercase bg-blue-600 py-3 text-lg rounded-md text-white hover:bg-blue-700 duration-300"
              >
                <PDFDownloadLink
                  document={<SaleInvoice data={invoiceData} />}
                  fileName="invoice.pdf"
                >
                  Download Invoice
                </PDFDownloadLink>
              </button>
            </div>
          </div>
        </section>
      </CustomModalWithChildren>
    </div>
  );
};

export default SellProductCard;
