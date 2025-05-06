import {Lavishly_Yours} from "next/font/google";

const lavishlyYours = Lavishly_Yours({
  weight: ["400"],
  subsets: ["latin"]
});

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex items-center justify-center">
        <div className="container-custom mt-10 ml-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            kaay &bull; ell
          </h1>
          <div className="flex flex-row items-baseline space-x-2">
            <h2>KL</h2>
            <h2 className={lavishlyYours.className}>kristie-lynne</h2>
          </div>
        </div>
      </section>
    </div>
  );
}