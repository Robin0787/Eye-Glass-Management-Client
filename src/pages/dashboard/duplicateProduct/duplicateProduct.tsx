/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuAsterisk } from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router-dom";
import ListDropdown from "../../../components/ui/ListDropdown/ListDropdown";
import UploadImage from "../../../components/ui/UploadImage";
import CircleLoader from "../../../components/ui/circleLoader/CircleLoader";
import InputField from "../../../components/ui/inputField/InputField";
import {
  glassFrameSize,
  glassGender,
} from "../../../constant/sellProduct.constant";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
} from "../../../redux/features/products/productAPIs";
import {
  TAddProduct,
  TFrameSize,
  TGender,
} from "../../../types/dashboard.types";
import UploadImageToImgBB from "../../../utils/UploadImageToImgBB";
import getErrorMessage from "../../../utils/getErrorMessage";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const DuplicateProduct = () => {
  const productId: string = useLoaderData() as string;
  const { isLoading, data } = useGetSingleProductQuery(productId);
  const navigate = useNavigate();
  const productData: TAddProduct = data?.data;
  const [selectedFrameSize, setSelectedFrameSize] = useState<string>(
    productData?.frameSize
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    productData?.gender
  );
  const [imageURL, setImageURL] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddProduct>({
    defaultValues: productData,
  });

  const [addProduct] = useAddProductMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black">
        <CircleLoader loader={true} />
      </div>
    );
  }

  async function handleDuplicateProduct(data: TAddProduct) {
    if (!imageURL) {
      toast.error("image is required");
      return;
    }
    data.price = Number(data.price);
    data.frameSize = selectedFrameSize as TFrameSize;
    data.gender = selectedGender as TGender;
    const payload: TAddProduct = {
      name: data.name,
      image: imageURL,
      frame: data.frame,
      shape: data.shape,
      lensType: data.lensType,
      frameSize: data.frameSize,
      brand: data.brand,
      price: Number(data.price),
      quantity: Number(data.quantity),
      gender: data.gender,
      color: data.color,
    };
    const toastId = toast.loading("Duplicating product...");

    handleAPIRequest(
      addProduct,
      payload,
      toastId,
      navigate,
      "/dashboard/all-product"
    );
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    setImageLoading(true);
    const file = e.target.files?.[0] as File;
    UploadImageToImgBB(file)
      .then((res) => {
        setImageLoading(false);
        setImageURL(res?.display_url);
      })
      .catch((err) => {
        setImageLoading(false);
        console.log(err);
        toast.error(err.message || "Failed to upload image.");
      });
  }

  return (
    <section className="w-full h-full flex justify-center items-center text-black overflow-scroll">
      <section className="w-full sm:w-[90%] lg:w-[60%] xl:w-[60%] 2xl:w-[55%] mx-auto bg-inherit">
        <section className="h-full shadow-[1px_1px_10px_2px] shadow-transparent sm:shadow-black/20 rounded-xl p-5 md:p-10 overflow-y-scroll scroll-m-2">
          <h1 className="text-center text-3xl xl:text-4xl font-bold pb-5 xl:pb-8 capitalize tracking-wider">
            Edit & Duplicate Product
          </h1>
          <div className="w-full h-full">
            <form onSubmit={handleSubmit(handleDuplicateProduct)}>
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="w-full">
                  <UploadImage
                    handleImageChange={handleImageUpload}
                    image={imageURL}
                    loading={imageLoading}
                  />
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-3">
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="name"
                      label="Name"
                      defaultValue={productData?.name}
                      register={register("name", { required: true })}
                    />
                  </div>
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="frame"
                      label="Frame"
                      defaultValue={productData?.frame}
                      register={register("frame", { required: true })}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-3">
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="shape"
                      label="Shape"
                      defaultValue={productData?.shape}
                      register={register("shape", { required: true })}
                    />
                  </div>
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="lensType"
                      label="Lens Type"
                      defaultValue={productData?.lensType}
                      register={register("lensType", { required: true })}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-3">
                  <div className="w-1/2">
                    <div className="w-full relative">
                      <ListDropdown
                        selected={selectedFrameSize || productData?.frameSize}
                        items={glassFrameSize}
                        handleList={setSelectedFrameSize}
                        title={"Frame Size"}
                        zIndex={15}
                        border="border border-secondary rounded"
                      />
                      <span
                        className={`text-[0.7em] tracking-[2px] absolute top-0 p-[0_18px_0_14px] z-60 translate-x-[10px] -translate-y-[7px] bg-primaryBg border-x border-secondary uppercase`}
                      >
                        Frame Size
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="brand"
                      label="Brand"
                      defaultValue={productData?.brand}
                      register={register("brand", { required: true })}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-3">
                  <div className="w-1/2">
                    <div className="w-full relative">
                      <ListDropdown
                        selected={selectedGender || productData?.gender}
                        items={glassGender}
                        handleList={setSelectedGender}
                        title={"Gender"}
                        zIndex={11}
                        border="border border-secondary rounded"
                      />
                      <span
                        className={`text-[0.7em] tracking-[2px] absolute top-0 p-[0_18px_0_14px] z-60 translate-x-[10px] -translate-y-[7px] bg-primaryBg border-x border-secondary uppercase`}
                      >
                        Gender
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <InputField
                      type="text"
                      id="color"
                      label="Color"
                      defaultValue={productData?.color}
                      register={register("color", { required: true })}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-3">
                  <div className="w-1/2">
                    <InputField
                      type="number"
                      id="quantity"
                      label="Quantity"
                      defaultValue={productData?.quantity}
                      register={register("quantity", { required: true })}
                    />
                  </div>
                  <div className="w-1/2">
                    <InputField
                      type="number"
                      id="price"
                      label="Price"
                      defaultValue={productData?.price}
                      register={register("price", { required: true })}
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
                    Create Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </section>
    </section>
  );
};

export default DuplicateProduct;
