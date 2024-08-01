"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [search, searchParams]);

  return (
    <Input
      type="text"
      placeholder="Find a property..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.currentTarget.value);
        handleSearch(e.currentTarget.value);
      }}
    />
  );
};

export default NavSearch;
