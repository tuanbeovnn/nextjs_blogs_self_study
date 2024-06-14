import React from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
interface Props {
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  id: string;
  light?: boolean;
}

export const Author = ({
  avatar,
  name,
  createdAt,
  id,
  light = false,
}: Props) => {
  return (
    <Link href={`/author/${id}`} className="flex flex-wrap items-center">
      <Image
        className="w-10 h-10 object-cover object-center rounded-full mr-3"
        src={avatar}
        width={1000}
        height={670}
        alt={name}
      />
      <span
        className={`text-base font-medium mr-5 ${
          light ? "text-[#ffff]" : "text-description no-underline hover:underline"
        }`}
      >
        {name}
      </span>

      <span
        className={`text-base ${light ? "text-[#ffff]" : "text-[#97989F]"}`}
      >
        {moment(createdAt).format("LL")}
      </span>
    </Link>
  );
};
