"use client";

import Outcome from "@/components/Outcome";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import clsx from "clsx";
import Footer from "@/components/Footer";

interface Data {
  amount: number;
  term: number;
  interest: number;
  type: string;
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFocused, setIsFocused] = useState({
    amount: false,
    term: false,
    interest: false,
    type1: false,
    type2: false,
  });
  const [isError, setIsError] = useState({
    amount: false,
    term: false,
    interest: false,
    type: false,
  });
  const handleInputFocus = (input: string) => {
    setIsFocused({ ...isFocused, [input as keyof typeof isFocused]: true });
  };
  const handleInputBlur = (input: string) => {
    setIsFocused({ ...isFocused, [input as keyof typeof isFocused]: false });
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = parseInt(formData.get("amount")?.toString().trim() ?? "");
    const term = parseInt(formData.get("term")?.toString().trim() ?? "");
    const interest = parseFloat(
      formData.get("interest")?.toString().trim() ?? ""
    );
    const type = formData.get("type")?.toString().trim() ?? "";

    !amount ? handleError("amount") : handleNoError("amount");
    !term ? handleError("term") : handleNoError("term");
    !interest ? handleError("interest") : handleNoError("interest");
    !type ? handleError("type") : handleNoError("type");

    //  if (!amount || !term || !interest || !type) return;

    const newData = { amount, term, interest, type };
    setData(newData);

    if (type === "Repayment") {
      const rate = Math.pow(1 + interest / 100 / 12, term * 12);
      let newMonthlyRepayment =
        (((amount * interest) / 100 / 12) * rate) / (rate - 1);
      let newTotal = newMonthlyRepayment * term * 12;
      newMonthlyRepayment = precisionRoundMod(newMonthlyRepayment, 2);
      newTotal = precisionRoundMod(newTotal, 2);
      setMonthlyRepayment(newMonthlyRepayment);
      setTotal(newTotal);
    }
    if (type === "Interest Only") {
      let newMonthlyRepayment = (amount * interest) / 100 / 12;
      let newTotal = newMonthlyRepayment * term * 12;
      newMonthlyRepayment = precisionRoundMod(newMonthlyRepayment, 2);
      newTotal = precisionRoundMod(newTotal, 2);
      setMonthlyRepayment(newMonthlyRepayment);
      setTotal(newTotal);
    }
  }
  function precisionRoundMod(number: number, precision: number): number {
    const factor = Math.pow(10, precision);
    const n = precision < 0 ? number : 0.01 / factor + number;
    return Math.round(n * factor) / factor;
  }
  function handleError(input: string) {
    let newList = isError;
    newList[input as keyof typeof isError] = true;
    setIsError(newList);
    console.log(isError);
  }
  function handleNoError(input: string) {
    let newList = isError;
    newList[input as keyof typeof isError] = false;
    setIsError(newList);
    //  setIsError({ ...isError, [input as keyof typeof isError]: false });
  }
  function clear() {
    setMonthlyRepayment(0);
    setTotal(0);
  }
  const errorMsg = <p className="text-Red">This field is required</p>;

  return (
    <main className="min-h-screen text-base font-medium bg-Slate-100 grid place-content-center">
      <div className="flex md:rounded-3xl text-base font-medium bg-White flex-col max-h-[800px] items-center justify-between md:grid md:grid-cols-2 max-w-[1110px] md:w-11/12 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-5/6 max-w-[700px] mx-auto mt-10 md:p-10 md:w-full md:m-0"
        >
          <span className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
            <h1 className="font-bold text-2xl  text-Slate-900">
              Mortgage Calculator
            </h1>
            <input
              type="reset"
              value="Clear All"
              className="underline text-Slate-500 mt-2 cursor-pointer"
              onClick={() => clear}
            />
          </span>
          <div className="flex flex-col my-5">
            <label htmlFor="amount" className="text-Slate-500">
              Mortgage Amount
            </label>

            <span className="border border-Slate-300 relative rounded-md font-bold hover:border-Slate-900">
              <input
                type="number"
                name="amount"
                id="amount"
                className="p-2 w-full pl-14 rounded-md"
                onFocus={() => handleInputFocus("amount")}
                onBlur={() => handleInputBlur("amount")}
              />
              <p
                className={
                  "absolute left-0 h-full w-10 text-Slate-700 grid place-content-center top-0  rounded-l-md " +
                  `${isFocused.amount ? "bg-Lime" : "bg-Slate-100"} ${
                    isError.amount ? "bg-Red" : ""
                  } `
                }
              >
                &pound;
              </p>
            </span>
            {isError.amount && errorMsg}
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="term" className="text-Slate-500">
              Mortgage Term
            </label>
            <span className="border border-Slate-300 relative rounded-md font-bold">
              <input
                type="number"
                name="term"
                id="term"
                className="p-2 w-full pl-4 rounded-md"
                onFocus={() => handleInputFocus("term")}
                onBlur={() => handleInputBlur("term")}
              />
              <p
                className={clsx(
                  "absolute text-Slate-700 right-0 h-full w-16 grid place-content-center top-0 rounded-r-md",
                  {
                    "bg-Lime": isFocused.term,
                    "bg-Slate-100": !isFocused.term,
                    "bg-Red": isError.term,
                  }
                )}
              >
                years
              </p>
            </span>
            {isError.term && errorMsg}

            <div className="flex flex-col mt-5">
              <label htmlFor="interest" className="text-Slate-500">
                Interest Rate
              </label>
              <span className="border border-Slate-300 relative rounded-md font-bold">
                <input
                  type="number"
                  step="0.01"
                  name="interest"
                  id="interest"
                  className="p-2 w-full pl-4 rounded-md"
                  onFocus={() => handleInputFocus("interest")}
                  onBlur={() => handleInputBlur("interest")}
                />
                <p
                  className={`absolute text-Slate-700 right-0 h-full w-10 grid place-content-center top-0 rounded-r-md ${
                    isFocused.interest ? "bg-Lime" : "bg-Slate-100"
                  } ${isError.interest ? "bg-Red" : ""}`}
                >
                  %
                </p>
              </span>
              {isError.interest && errorMsg}
            </div>
          </div>

          <p className="text-Slate-500">Mortgage Type</p>

          <div
            className={`border border-Slate-300 relative rounded-md font-bold flex p-2 my-2  hover:border-Lime ${
              isFocused.type1 ? "bg-light-lime" : ""
            }`}
          >
            <input
              type="radio"
              name="type"
              id="rp"
              value="Repayment"
              onFocus={() => handleInputFocus("type1")}
              onBlur={() => handleInputBlur("type1")}
            />
            <label htmlFor="rp" className="ml-4 flex-1  text-Slate-900">
              Repayment
            </label>
          </div>

          <div
            className={`border border-Slate-300 relative rounded-md font-bold p-2 hover:border-Lime flex ${
              isFocused.type2 ? "bg-light-lime" : ""
            }`}
          >
            <input
              type="radio"
              name="type"
              id="io"
              value="Interest Only"
              onFocus={() => handleInputFocus("type2")}
              onBlur={() => handleInputBlur("type2")}
            />
            <label htmlFor="io" className="ml-4 flex-1 text-Slate-900">
              Interest Only
            </label>
          </div>
          {isError.type && errorMsg}
          <button
            type="submit"
            className="flex justify-center md:mb-0 md:mx-0 md:mt-12 items-center gap-4 w-full mx-auto max-w-[20rem]  text-Slate-900 bg-Lime rounded-[3rem] border-none px-6 py-3 my-8"
          >
            <Image
              className=""
              src="/icon-calculator.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className="font-bold">Calculate Repayments</p>
          </button>
        </form>

        <Outcome monthlyRepayment={monthlyRepayment} total={total} />
      </div>

      <Footer />
    </main>
  );
}
