"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect, useRef } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { IconFilterX } from "@tabler/icons-react";

const filters = [
  {
    id: "capacity",
    label: "Capacity",
    options: [
      {
        value: "1",
        label: "1",
        checked: false,
      },
      {
        value: "2",
        label: "2",
        checked: false,
      },
      {
        value: "4",
        label: "4",
        checked: false,
      },
    ],
  },
  {
    id: "transmission",
    label: "Transmission",
    options: [
      { value: "Manual", label: "Manual", checked: false },
      { value: "Automatic", label: "Automatic", checked: false },
    ],
  },
  {
    id: "passengers",
    label: "Passengers",
    options: [
      { value: "2", label: "2", checked: false },
      { value: "4", label: "4", checked: false },
      { value: "5", label: "5", checked: false },
    ],
  },
];

export const Filter = () => {
  const searchParams = useSearchParams();

  const startPriceRef = useRef<HTMLInputElement>(null!);
  const endPriceRef = useRef<HTMLInputElement>(null!);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const { replace } = useRouter();
  const pathname = usePathname();

  const [, startTransition] = useTransition();

  const handleFilterChange = (
    term: string,
    label: string,
    isChecked?: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (isChecked) {
      const param = params.get(label) ? params.get(label)?.split(",") : [];
      if (param) {
        param.push(term);
        params.set(label, param.join(","));
      } else {
        params.set(label, term);
      }
    } else {
      const param = params.get(label)?.split(",");
      const newParam = param?.filter((p) => p !== term);
      if (newParam && newParam.length > 0) {
        params.set(label, newParam.join(","));
      } else {
        params.delete(label);
      }
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    console.log(startPriceRef.current.value, endPriceRef.current.value);

    if (startPriceRef.current.value) {
      params.set("startPrice", startPriceRef.current.value);
    }

    if (startPriceRef.current.value === "") params.delete("startPrice");

    if (endPriceRef.current.value) {
      params.set("endPrice", endPriceRef.current.value);
    }

    if (endPriceRef.current.value === "") params.delete("endPrice");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const capacity = params.get("capacity")?.split(",").map(Number) ?? [];
    const transmission = params.get("transmission")?.split(",") ?? [];
    const passengers = params.get("passengers")?.split(",").map(Number) ?? [];

    filters[0].options.forEach((option) => {
      if (capacity.includes(Number(option.value))) {
        option.checked = true;
      } else {
        option.checked = false;
      }
    });

    filters[1].options.forEach((option) => {
      if (transmission.includes(option.value)) {
        option.checked = true;
      } else {
        option.checked = false;
      }
    });

    filters[2].options.forEach((option) => {
      if (passengers.includes(Number(option.value))) {
        option.checked = true;
      } else {
        option.checked = false;
      }
    });

    return () => {
      filters[0].options.forEach((option) => {
        option.checked = false;
      });

      filters[1].options.forEach((option) => {
        option.checked = false;
      });

      filters[2].options.forEach((option) => {
        option.checked = false;
      });
    };
  }, []);

  const openStyles = `${
    mobileFilterOpen
      ? "translate-x-0 ease-out duration-300 backdrop-blur-sm bg-black bg-opacity-50"
      : "translate-x-full ease-in duration-300"
  } fixed inset-0 z-40 flex`;

  const closeNav = { onClick: () => setMobileFilterOpen(false) };

  return (
    <>
      <button
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        className="fixed right-3 top-24 text-text dark:text-darktext lg:hidden"
      >
        <IconFilter aria-label="filter" />
      </button>
      <div className="m-4 hidden w-full flex-col lg:flex">
        <h1 className="border-b border-text/80 p-4 pl-0 text-xl text-text dark:border-darktext/80 dark:text-darktext">
          Filters
        </h1>
        <div className="border-b border-text/30 py-6 dark:border-darktext/30">
          <span onClick={() => setOpen0(!open0)}>
            <div className="flex w-full text-text dark:text-darktext">
              <h3 className="-my-3 flow-root font-medium">
                {filters[0].label}
              </h3>
              {open0 ? (
                <IconMinus
                  className="-my-[0.65rem] ml-auto h-5 w-5"
                  aria-hidden="true"
                />
              ) : (
                <IconPlus
                  className="-my-[0.65rem] ml-auto h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </div>
          </span>
          {open0 ? (
            <div className="space-y-4 pt-6">
              {filters[0].options.map((option, optionId) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={option.value.toString() + optionId.toString()}
                    className="h-4 w-4 rounded border-gray-300 text-primary-button focus:ring-primary-button"
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {
                      option.checked = !option.checked;
                      handleFilterChange(
                        option.value,
                        filters[0].id,
                        option.checked,
                      );
                    }}
                  />
                  <label className="ml-3 text-sm text-text dark:text-darktext">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="border-b border-text/30 py-6 dark:border-darktext/30">
          <div
            className="flex text-text dark:text-darktext"
            onClick={() => setOpen1(!open1)}
          >
            <h3 className="-my-3 flow-root font-medium text-text dark:text-darktext">
              {filters[1].label}
            </h3>
            {open1 ? (
              <IconMinus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <IconPlus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            )}
          </div>
          {open1 ? (
            <div className="space-y-4 pt-6">
              {filters[1].options.map((option, optionId) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={option.value.toString() + optionId.toString()}
                    className="h-4 w-4 rounded border-text/30 text-primary-button focus:ring-primary-button dark:border-darktext/30"
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {
                      option.checked = !option.checked;
                      handleFilterChange(
                        option.value,
                        filters[1].id,
                        option.checked,
                      );
                    }}
                  />
                  <label className="ml-3 text-sm text-text dark:text-darktext">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="border-b border-text/30 py-6 dark:border-darktext/30">
          <div
            className="flex text-text dark:text-darktext"
            onClick={() => setOpen2(!open2)}
          >
            <h3 className="-my-3 flow-root font-medium">{filters[2].label}</h3>
            {open2 ? (
              <IconMinus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <IconPlus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            )}
          </div>
          {open2 ? (
            <div className="space-y-4 pt-6">
              {filters[2].options.map((option, optionId) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={option.value.toString() + optionId.toString()}
                    className="h-4 w-4 rounded border-text/30 text-primary-button focus:ring-primary-button dark:border-darktext/30"
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {
                      option.checked = !option.checked;
                      handleFilterChange(
                        option.value,
                        filters[2].id,
                        option.checked,
                      );
                    }}
                  />
                  <label className="ml-3 text-sm text-text dark:text-darktext">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className={
            "border-b border-text/30 py-6 dark:border-darktext/30 " +
            (open3 ? "pb-2" : "")
          }
        >
          <div
            className="flex text-text dark:text-darktext"
            onClick={() => setOpen3(!open3)}
          >
            <h3 className="-my-3 flow-root font-medium">Price</h3>
            {open3 ? (
              <IconMinus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            ) : (
              <IconPlus
                className="-my-[0.65rem] ml-auto h-5 w-5"
                aria-hidden="true"
              />
            )}
          </div>
          {open3 ? (
            <div className="p-2 pt-6">
              <form
                className="grid grid-cols-4 items-center"
                onSubmit={handleInputChange}
              >
                <div />
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <input
                    ref={startPriceRef}
                    type="text"
                    placeholder="0"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="max-w-[80px] rounded border border-text/30 bg-background p-1 px-2 font-semibold text-text placeholder:text-text focus:ring-primary-button dark:border-darktext/30 dark:bg-darkbg dark:text-darktext dark:placeholder:text-darktext"
                  />
                  <div className="text-text dark:text-darktext">to</div>
                  <input
                    ref={endPriceRef}
                    type="text"
                    placeholder="0"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="max-w-[80px] rounded border border-text/30 bg-background p-1 px-2 font-semibold text-text placeholder:text-text focus:ring-primary-button dark:border-darktext/30 dark:bg-darkbg dark:text-darktext dark:placeholder:text-darktext"
                  />
                </div>
                <div className="mr-4 flex justify-end">
                  <button
                    type="submit"
                    className="transform rounded-md bg-primary-button px-2 py-1 font-semibold text-background shadow-sm shadow-primary-button duration-300 ease-in-out hover:shadow-md hover:shadow-primary-button dark:text-darkbg"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>

      {/* mobile */}

      <div
        className={openStyles}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="fixed inset-0 z-10" {...closeNav}></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 dark:bg-darkbg sm:max-w-sm sm:ring-1 sm:ring-text/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5"></Link>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-text dark:text-darktext"
              tabIndex={0}
            >
              <span className="sr-only">Close menu</span>
              <IconFilterX aria-label="filter close" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="border-b border-text/30 py-6 dark:border-darktext/30">
                  <span onClick={() => setOpen0(!open0)}>
                    <div className="flex w-full text-text dark:text-darktext">
                      <h3 className="-my-3 flow-root font-medium">
                        {filters[0].label}
                      </h3>
                      {open0 ? (
                        <IconMinus
                          className="-my-[0.65rem] ml-auto h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <IconPlus
                          className="-my-[0.65rem] ml-auto h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </span>
                  {open0 ? (
                    <div className="space-y-4 pt-6">
                      {filters[0].options.map((option, optionId) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={option.value.toString() + optionId.toString()}
                            className="h-4 w-4 rounded border-text/30 text-primary-button focus:ring-primary-button dark:border-darktext/30"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[0].id,
                                option.checked,
                              );
                            }}
                          />
                          <label className="ml-3 text-sm text-text dark:text-darktext">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="border-b border-text/30 py-6 dark:border-darktext/30">
                  <div
                    className="flex text-text dark:text-darktext"
                    onClick={() => setOpen1(!open1)}
                  >
                    <h3 className="-my-3 flow-root font-medium">
                      {filters[1].label}
                    </h3>
                    {open1 ? (
                      <IconMinus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconPlus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {open1 ? (
                    <div className="space-y-4 pt-6">
                      {filters[1].options.map((option, optionId) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={option.value.toString() + optionId.toString()}
                            className="h-4 w-4 rounded border-text/30 text-primary-button focus:ring-primary-button dark:border-darktext/30"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[1].id,
                                option.checked,
                              );
                            }}
                          />
                          <label className="ml-3 text-sm text-text dark:text-darktext">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="border-b border-text/30 py-6 dark:border-darktext/30">
                  <div
                    className="flex text-text dark:text-darktext"
                    onClick={() => setOpen2(!open2)}
                  >
                    <h3 className="-my-3 flow-root font-medium">
                      {filters[2].label}
                    </h3>
                    {open2 ? (
                      <IconMinus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconPlus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {open2 ? (
                    <div className="space-y-4 pt-6">
                      {filters[2].options.map((option, optionId) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={option.value.toString() + optionId.toString()}
                            className="h-4 w-4 rounded border-text/30 text-primary-button focus:ring-primary-button dark:border-darktext/30"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[2].id,
                                option.checked,
                              );
                            }}
                          />
                          <label className="ml-3 text-sm text-text dark:text-darktext">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div
                  className={
                    "border-b border-text/30 py-6 dark:border-darktext/30 " +
                    (open3 ? "pb-2" : "")
                  }
                >
                  <div
                    className="flex text-text dark:text-darktext"
                    onClick={() => setOpen3(!open3)}
                  >
                    <h3 className="-my-3 flow-root font-medium">Price</h3>
                    {open3 ? (
                      <IconMinus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconPlus
                        className="-my-[0.65rem] ml-auto h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {open3 ? (
                    <div className="p-2 pt-6">
                      <form
                        className="grid grid-cols-4 items-center"
                        onSubmit={handleInputChange}
                      >
                        <div className="col-span-3 flex items-center justify-center gap-2">
                          <input
                            ref={startPriceRef}
                            type="text"
                            placeholder="0"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="max-w-[80px] rounded border border-text/30 bg-background p-1 px-2 font-semibold text-text placeholder:text-text focus:ring-primary-button dark:border-darktext/30 dark:bg-darkbg dark:text-darktext dark:placeholder:text-darktext"
                          />
                          <div className="text-text dark:text-darktext">to</div>
                          <input
                            ref={endPriceRef}
                            type="text"
                            placeholder="0"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="max-w-[80px] rounded border border-text/30 bg-background p-1 px-2 font-semibold text-text placeholder:text-text focus:ring-primary-button dark:border-darktext/30 dark:bg-darkbg dark:text-darktext dark:placeholder:text-darktext"
                          />
                        </div>
                        <div className="mr-4 flex justify-end">
                          <button
                            type="submit"
                            className="transform rounded-md bg-primary-button px-2 py-1 font-semibold text-background shadow-sm shadow-primary-button duration-300 ease-in-out hover:shadow-md hover:shadow-primary-button dark:text-darkbg"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
