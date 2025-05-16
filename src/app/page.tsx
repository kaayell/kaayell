import { courierPrime, fredericka, lavishlyYours } from "@/lib/fonts";
import TypewriterText from "@/components/ui/TypewriterText";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-20 ml-10">
        <div className={`text-8xl font-bold mb-6 ${courierPrime.className}`}>
          <TypewriterText text={"kaay•ell"} speed={200} delay={500} />
          <hr className="border-neutral-700" />
        </div>
        <div className="flex flex-row items-baseline space-x-3">
          <h2 className={fredericka.className}>KL</h2>
          <h2 className={lavishlyYours.className}>kristie-lynne</h2>
        </div>
      </div>
    </section>
  );
}
