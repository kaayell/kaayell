import {Courier_Prime, Fredericka_the_Great, Lavishly_Yours} from "next/font/google";
import TypewriterText from "@/components/ui/TypewriterText";

const lavishlyYours = Lavishly_Yours({
  weight: ["400"],
  subsets: ["latin"]
});

const fredericka = Fredericka_the_Great({
  weight: ["400"],
  subsets: ["latin"]
})

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex items-center justify-center">
        <div className="container-custom mt-20 ml-10">
          <div className={`text-8xl font-bold mb-6 ${courierPrime.className}`}>
            <TypewriterText text="kaay•ell" delay={0.15} speed={0.2}/>
            <hr className="border-neutral-700"/>
          </div>
          <div className="flex flex-row items-baseline space-x-3">
            <h2 className={fredericka.className}>KL</h2>
            <h2 className={lavishlyYours.className}>kristie-lynne</h2>
          </div>
        </div>
      </section>
    </div>
  );
}