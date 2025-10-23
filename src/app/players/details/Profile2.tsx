import { staticImages } from "@/assets/images";
import Image from "next/image";
import { GiSoccerField } from "react-icons/gi";
import { PiGlobeStandDuotone } from "react-icons/pi";
import { TbPlayBasketball, TbPlayFootball } from "react-icons/tb";

export function PlayerProfile2() {
  return (
    <div className="flex max-md:flex-wrap items-start lg:grid grid-cols-2 ">
      <section>
        <h1 className="_heading">NAME</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
          cupiditate tempore odio doloribus sunt, quaerat, sed necessitatibus
          nostrum explicabo deleniti asperiores voluptatum obcaecati labore
          quisquam excepturi molestiae id veniam! Corporis!
        </p>

        <div className="flex items-start gap-6 mt-10">
          <Image
            width={300}
            height={300}
            src={staticImages.ronaldo}
            alt={"player?.firstName as string"}
            className="w-72 drop-shadow-2xl"
          />

          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl">ABOUT HIM</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              ab nobis corporis nisi, numquam, quis voluptatem impedit quas in
              enim voluptate alias earum hic incidunt nam eaque excepturi
              recusandae ipsam!
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-start grow ">
        <Image
          width={300}
          height={300}
          src={staticImages.ronaldo}
          alt={"player?.firstName as string"}
          className="w-72 h-full drop-shadow-2xl"
        />

        <div >
          <h2 className="text-4xl md:text-5xl font-semibold">STATS</h2>
          <ul className="_card flex flex-wrap gap-3 min-w-44">
            <li className="flex items-center gap-2.5">
              <TbPlayFootball size={40} />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold">67</span>
                <span>MoTM</span>
              </div>
            </li>

            <li className="flex items-center gap-2.5">
              <GiSoccerField size={40} />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold">45</span>
                <span>Matches</span>
              </div>
            </li>

            <li className="flex items-center gap-2.5">
              <PiGlobeStandDuotone size={40} />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold">67</span>
                <span>MoTM</span>
              </div>
            </li>

            <li className="flex items-center gap-2.5">
              <TbPlayBasketball size={40} />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold">3</span>
                <span>Goals</span>
              </div>
            </li>

            <li className="flex items-center gap-2.5">
              <TbPlayBasketball size={40} />
              <div className="flex flex-col items-start">
                <span className="text-4xl font-semibold">3</span>
                <span>Assists</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
