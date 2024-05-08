import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheck2 } from "react-icons/bs";
import { PiCaretUpDownLight } from "react-icons/pi";

interface TListDropdown {
  items: string[];
  handleList: (selected: string) => void;
  selected: string;
  title: string;
  zIndex?: number;
  border?: string;
  align?: string;
}

const ListDropdown = ({
  items,
  handleList,
  selected,
  title,
  zIndex = 1,
  border = "border rounded-lg",
  align = "text-left",
}: TListDropdown) => {
  return (
    <div
      className={`${border} border-secondary/30  py-1 cursor-pointer focus:border-white capitalize`}
      style={{ zIndex }}
    >
      <Listbox value={selected} onChange={handleList}>
        <div className="relative h-full z-40" style={{ zIndex: zIndex }}>
          <Listbox.Button
            className={`relative w-full ${align} py-2 pl-3 pr-10  sm:text-sm`}
          >
            <span className="block truncate text-black text-base capitalize">
              {selected ? (
                selected
              ) : (
                <span className="text-black/90 font-thin">Select {title}</span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <PiCaretUpDownLight
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-primaryBg border border-secondary/30 text-base shadow-lg sm:text-sm">
              {items.map((item, itemIndex) => (
                <Listbox.Option
                  key={itemIndex}
                  className={({ active }) =>
                    `relative cursor-pointer duration-200 select-none py-2 pl-10 pr-4 border-b border-secondary/30 ${
                      active
                        ? "bg-green-500 bg-opacity-20 text-black"
                        : "text-black"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListDropdown;
