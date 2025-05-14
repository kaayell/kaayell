import {
  Courier_Prime,
  Fredericka_the_Great,
  Geist,
  Geist_Mono,
  Lavishly_Yours,
} from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const lavishlyYours = Lavishly_Yours({
  weight: ["400"],
  subsets: ["latin"],
});

export const fredericka = Fredericka_the_Great({
  weight: ["400"],
  subsets: ["latin"],
});

export const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
});
