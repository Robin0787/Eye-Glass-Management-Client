import lense from "../../../assets/banner/lens.png";
import Wave from "../../../components/ui/Wave";

const Banner = () => {
  return (
    <div className="h-[calc(100vh-76px)]  max-h-[1000px] w-full bg-primaryBg text-primaryText flex justify-center items-center text-4xl relative">
      <div className="z-10 -mt-32 flex flex-col md:flex-row justify-between items-center gap-5  w-4/5 mx-auto">
        <div className="w-full md:w-1/2">
          <img
            src={lense}
            alt="lense"
            className="w-[80%] md:w-full rounded-md mx-auto rotate-0"
          />
        </div>
        <div className="w-full md:w-1/2 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl text-gray-900 font-black  uppercase tracking-wider">
            Get Lens For Your Eyes
          </h1>
          <p className="text-base leading-relaxed text-gray-950 tracking-wide">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
            commodi labore sequi facere excepturi quos omnis ea voluptatum
            repudiandae expedita tenetur ipsum corrupti magnam facilis nobis
            dolore, eum ratione non!
          </p>
          <button className="text-xl font-black bg-gray-900 text-white rounded-full text-center py-4 px-12 tracking-widest uppercase hover:px-10 duration-300">
            Explore
          </button>
        </div>
      </div>
      <Wave className="absolute left-0 bottom-0 z-0" />
    </div>
  );
};

export default Banner;
