import Image from "next/image";

type Props = {
  monthlyRepayment: number;
  total: number;
};

export default function Outcome({ monthlyRepayment, total }: Props) {
  return (
    <div className="bg-Slate-900 text-Slate-300 py-10 px-4 md:p-10 h-full md:rounded-r-3xl md:rounded-bl-[4rem]">
      {monthlyRepayment === 0 || total === 0 ? (
        <div className="text-center md:flex md:flex-col md:justify-center md:items-center md:h-full">
          <Image
            src="/illustration-empty.svg"
            alt=""
            priority={true}
            width={192}
            height={192}
            className="mx-auto"
          />
          <h1 className="text-Slate-100 text-2xl my-4 font-bold">
            Results shown here
          </h1>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div className="md:p-5 md:h-full">
          <h1 className="text-Slate-100 text-2xl my-4 font-bold">
            Your results
          </h1>

          <p>
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>

          <div className="bg-Slate-1000 relative md:p-6 md:mt-12 p-4 *:py-2 mt-6 rounded-xl before:w-full before:h-1 before:bg-Lime before:absolute before:top-0 before:left-0 before:rounded-t-xl ">
            <p>Your monthly repayments</p>
            <p className="text-[2.6rem] text-Lime font-bold">
              &pound;{monthlyRepayment}
            </p>

            <p className="mt-6 md:mt-12 md:before:-top-4 pb-0 relative before:absolute before:w-full before:h-[1px] before:bg-Slate-500 before:-top-1 before:left-0">
              Total you&apos;ll repay over the term
            </p>
            <p className="text-2xl text-White">&pound;{total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
