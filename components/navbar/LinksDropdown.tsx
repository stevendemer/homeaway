import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { UserIcon } from "./UserIcon";
import SignoutLink from "./SignoutLink";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6 " />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 space-y-2"
        align="start"
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Sign up</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            return (
              <DropdownMenuItem
                key={link.href}
                className="capitalize w-full cursor-pointer hover:bg-slate-100/20"
              >
                <Link className="capitalize w-full" href={link.href}>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignoutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
