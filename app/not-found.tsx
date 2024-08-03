import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen justify-center flex-1 flex-wrap my-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-xl text-center lg:text-xl font-bold">
          Error 404: Page not found 😔
        </h1>
        <Button variant="link" asChild size="lg">
          <Link className="flex items-center flex-wrap space-x-4" href="/">
            <FaArrowLeft />
            <p className="leading-loose font-light">Go back home</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
