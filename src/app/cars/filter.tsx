"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect, useRef } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import Link from "next/link";
import { IconFilterX } from "@tabler/icons-react";

let filters = [
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
    ],
  },
];

const filterSearchParams = (str: string) => {
  let capacity: number[] = [];
  let transmission: string[] = [];
  let passengers: number[] = [];
  let startPrice: number = 0;
  let endPrice: number = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "C") {
      capacity.push(Number(str[i + 1]));
    } else if (str[i] === "T") {
      if (str[i + 1] === "A") transmission.push("Automatic");
      else transmission.push("Manual");
    } else if (str[i] === "P") {
      passengers.push(Number(str[i + 1]));
    } else if (str[i] === "S") {
      let startPriceStr = "";
      while (str[i + 1] !== "-") {
        startPriceStr += str[i + 1];
        i++;
      }
      startPrice = Number(startPriceStr);

      i++;
      let endPriceStr = "";
      while (str[i + 1] !== "E") {
        endPriceStr += str[i + 1];
        i++;
      }
      endPrice = Number(endPriceStr);
    }
  }

  return {
    t: transmission,
    c: capacity,
    p: passengers,
    s: startPrice,
    e: endPrice,
  };
};

export const Filter = () => {
  const startPriceRef = useRef<HTMLInputElement>(null!);
  const endPriceRef = useRef<HTMLInputElement>(null!);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [open0, setOpen0] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const { replace } = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (
    term: string,
    label: string,
    isChecked?: boolean
  ) => {
    let params = new URLSearchParams(location.search);

    if (isChecked) {
      let filter = params.getAll("filter").join("");
      params.set("filter", filter + label[0] + term);
    } else {
      let filter = params.getAll("filter").join("");
      let newFilter = filter?.replace(label[0] + term, "");
      params.set("filter", newFilter ?? "");
      if (!params.getAll("filter").join("")) {
        params.delete("filter");
      }
    }
    params.delete("page");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let params = new URLSearchParams(location.search);

    let filter = params.getAll("filter").join("");
    if (startPriceRef.current.value && endPriceRef.current.value) {
      if (filter.includes("S")) {
        let newFilter = filter?.replace(
          /S.*E/,
          "S" +
            startPriceRef.current.value +
            "-" +
            endPriceRef.current.value +
            "E"
        );
        params.set("filter", newFilter ?? "");
      } else {
        params.set(
          "filter",
          filter +
            "S" +
            startPriceRef.current.value +
            "-" +
            endPriceRef.current.value +
            "E"
        );
      }
    } else if (startPriceRef.current.value) {
      if (filter.includes("S")) {
        let newFilter = filter?.replace(
          /S.*E/,
          "S" + startPriceRef.current.value + "-" + "E"
        );
        params.set("filter", newFilter ?? "");
      } else {
        params.set(
          "filter",
          filter + "S" + startPriceRef.current.value + "-" + "E"
        );
      }
    } else if (endPriceRef.current.value) {
      if (filter.includes("S")) {
        let newFilter = filter?.replace(
          /S.*E/,
          "S0-" + endPriceRef.current.value + "E"
        );
        params.set("filter", newFilter ?? "");
      } else {
        params.set("filter", filter + "S0-" + endPriceRef.current.value + "E");
      }
    } else {
      let newFilter = filter?.replace(/S.*E/, "");
      params.set("filter", newFilter ?? "");
      if (!params.getAll("filter").join("")) {
        params.delete("filter");
      }
    }
    params.delete("page");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    let params = new URLSearchParams(location.search);
    let filter = params.getAll("filter").join("");
    let { t, c, p } = filterSearchParams(filter);

    filters[0].options.forEach((option) => {
      c.includes(Number(option.value))
        ? (option.checked = true)
        : (option.checked = false);
    });

    filters[1].options.forEach((option) => {
      t.includes(option.value)
        ? (option.checked = true)
        : (option.checked = false);
    });

    filters[2].options.forEach((option) => {
      p.includes(Number(option.value))
        ? (option.checked = true)
        : (option.checked = false);
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
        className="fixed right-3 top-24 lg:hidden text-text dark:text-darktext"
      >
        <IconFilter aria-label="filter" />
      </button>
      <div className="m-4 hidden w-full flex-col lg:flex">
        <h1 className="border-b border-text/80 dark:border-darktext/80 text-text dark:text-darktext p-4 pl-0 text-xl">
          Filters
        </h1>
        <div className="border-b border-text/30 dark:border-darktext/30 py-6">
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
                        filters[0].label,
                        option.checked
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
        <div className="border-b border-text/30 dark:border-darktext/30 py-6">
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
                    className="h-4 w-4 rounded border-text/30 dark:border-darktext/30 text-primary-button focus:ring-primary-button"
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {
                      option.checked = !option.checked;
                      handleFilterChange(
                        option.value,
                        filters[1].label,
                        option.checked
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
        <div className="border-b border-text/30 dark:border-darktext/30 py-6">
          <div
            className="flex text-text dark:text-darktext"
            onClick={() => setOpen2(!open2)}
          >
            <h3 className="-my-3 flow-root font-medium ">{filters[2].label}</h3>
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
                    className="h-4 w-4 rounded border-text/30 dark:border-darktext/30 text-primary-button focus:ring-primary-button"
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => {
                      option.checked = !option.checked;
                      handleFilterChange(
                        option.value,
                        filters[2].label,
                        option.checked
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
            "border-b border-text/30 dark:border-darktext/30 py-6 " +
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
                className="flex flex-col items-center gap-4"
                onSubmit={handleInputChange}
              >
                <span className="flex items-center gap-2">
                  <input
                    ref={startPriceRef}
                    type="text"
                    placeholder="0"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="max-w-[80px] rounded border bg-background dark:bg-darkbg px-2 placeholder:text-text dark:placeholder:text-darktext border-text/30 dark:border-darktext/30 p-1 font-semibold text-text dark:text-darktext focus:ring-primary-button"
                  />
                  <span className="text-text dark:text-darktext">to</span>
                  <input
                    ref={endPriceRef}
                    type="text"
                    placeholder="0"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="max-w-[80px] rounded border bg-background dark:bg-darkbg px-2 placeholder:text-text dark:placeholder:text-darktext border-text/30 dark:border-darktext/30 p-1 font-semibold text-text dark:text-darktext focus:ring-primary-button"
                  />
                </span>
                <button
                  type="submit"
                  className="rounded-md shadow-sm hover:shadow-md hover:shadow-primary-button shadow-primary-button bg-primary-button px-2 py-1 text-background dark:text-darkbg transform ease-in-out duration-300 font-semibold"
                >
                  Button
                </button>
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
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background dark:bg-darkbg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-text/10">
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
            <div className="-my-6 divide-y divide-gray-500/10 ">
              <div className="space-y-2 py-6">
                <div className="border-b border-text/30 dark:border-darktext/30 py-6">
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
                            className="h-4 w-4 rounded border-text/30 dark:border-darktext/30 text-primary-button focus:ring-primary-button"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[0].label,
                                option.checked
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
                <div className="border-b border-text/30 dark:border-darktext/30 py-6">
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
                            className="h-4 w-4 rounded border-text/30 dark:border-darktext/30 text-primary-button focus:ring-primary-button"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[1].label,
                                option.checked
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
                <div className="border-b border-text/30 dark:border-darktext/30 py-6">
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
                            className="h-4 w-4 rounded border-text/30 dark:border-darktext/30 text-primary-button focus:ring-primary-button"
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => {
                              option.checked = !option.checked;
                              handleFilterChange(
                                option.value,
                                filters[2].label,
                                option.checked
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
