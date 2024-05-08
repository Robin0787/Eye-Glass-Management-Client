import { ChangeEvent } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import CircleLoader from "./circleLoader/CircleLoader";

interface TUploadImage {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  image: string | undefined;
  loading: boolean;
}

const UploadImage = ({ handleImageChange, image, loading }: TUploadImage) => {
  return (
    <div className="flex items-center justify-center w-full relative">
      <label
        htmlFor="dropzone-file"
        className="relative flex flex-col items-center justify-center w-full h-[120px] lg:h-[150px] 2xl:h-[170px] border-2 border-[#808080] border-dashed hover:border-gray-300 rounded-lg cursor-pointer bg-[#ffffff20] hover:bg-[#ffffff40] duration-500 group"
      >
        {loading ? (
          <CircleLoader loader={true} height="50px" width="50px" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="mb-2">
              <IoCloudUploadOutline size={40} />
            </div>
            {image ? (
              <p className="mb-2 text-sm">
                <span className="font-semibold ">{image}</span>
              </p>
            ) : (
              <>
                <p className="mb-2 text-sm">
                  <span className="font-semibold ">
                    Upload your product image here.
                  </span>
                </p>
                <p className="text-xs">PNG</p>
              </>
            )}
          </div>
        )}

        <input
          id="dropzone-file"
          type="file"
          accept={"png"}
          className="hidden"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
      </label>
    </div>
  );
};

export default UploadImage;
