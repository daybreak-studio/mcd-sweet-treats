import { LogoLockup } from "@/components/LogoLockup/LogoLockup";

type Props = {};

const Closed = (props: Props) => {
  return (
    <>
      <LogoLockup />
      <div className="flex flex-grow flex-col items-center justify-center text-center">
        <h1 className="font-serif-xl w-10/12 md:font-serif-2xl md:w-8/12">
          Sorry, we’re no longer translating, but Grandma would still love to
          hear from you!
        </h1>
      </div>
    </>
  );
};

export default Closed;
