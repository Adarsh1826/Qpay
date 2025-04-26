import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {prisma} from "@repo/db";
export default function Home() {
  return (
    <div className="bg-yellow-300">
      hii there
    </div>
  );
}
