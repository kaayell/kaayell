import { courierPrime, fredericka, lavishlyYours } from "@/lib/fonts";

export default async function Home() {
  return (
    <section className="flex flex-col justify-center">
      <div className="mr-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h4 className={`text-7xl font-bold mb-2 ${courierPrime.className}`}>
          kaay•ell
        </h4>
        <div className="flex flex-row items-baseline space-x-3">
          <h2 className={fredericka.className}>KL</h2>
          <h2 className={lavishlyYours.className}>kristie-lynne</h2>
        </div>
      </div>
    </section>
  );
}
