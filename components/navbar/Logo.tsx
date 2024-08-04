import { LuTent } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

const Logo = () => {
  return (
    <Button size="sm" asChild>
      <Link className="flex items-center" href="/">
        <LuTent className="w-6 h-6" />
        <h1 className="sm:text-xl text-md leading-loose font-semibold p-2">
          Home Away
        </h1>
      </Link>
    </Button>
  );
};

export default Logo;
