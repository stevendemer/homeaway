import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";

export const UserIcon = async () => {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        className="rounded-full"
        alt="profile image"
        width={30}
        height={30}
      />
    );
  }

  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-slate-200" />;
};
