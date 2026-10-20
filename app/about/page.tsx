import type { Metadata } from "next";
import Image from "next/image";
import { ReserveButton } from "@/components/reservation-provider";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "About | Brew & Co",
  description: "How Maya and Daniel opened Brew & Co, a neighbourhood coffee shop in Brooklyn.",
};

const values = [
  {
    title: "Coffee we can name",
    text: "We buy from three roasters whose farmers we can name, and we change what's on the bar with the seasons.",
  },
  {
    title: "Baked before we open",
    text: "Daniel is in at 4:30 every morning. If a tray sells out, that's it until tomorrow.",
  },
  {
    title: "Nights for the neighbourhood",
    text: "Open mic on Fridays and tastings on Saturdays started with a few friends. Now they fill the room.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <h1 className="max-w-[16ch] font-display text-h1 font-semibold tracking-[-0.03em]">
          Two friends, one corner, a lot of coffee
        </h1>
      </Section>

      <Section className="grid items-start gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="flex max-w-prose flex-col gap-6 text-lead">
          <p>
            Maya Okafor spent eleven years behind other people&apos;s espresso machines. She pulled shots at 6am for commuters, trained new baristas, and kept a notebook of the café she&apos;d open one day: a counter you could lean on, a table big enough for a stranger to join, and a bell that meant it was her turn to say hello.
          </p>
          <p>
            Daniel Reyes was a pastry cook who worked nights and slept through the daylight. He and Maya met when she started buying his croissants for the shop where she worked. Within a month she was staying after close to taste the next batch, and he was learning why the coffee mattered as much as the dough.
          </p>
          <p>
            In 2018 they found a corner storefront in Brooklyn with a crooked floor and good light, and signed the lease the same afternoon. They painted the walls themselves, borrowed chairs from relatives, and opened with one grinder, one oven and a chalkboard menu.
          </p>
          <p>
            The first week, eleven people came in. By the third month, the same eleven were bringing friends. Open mic started when a regular asked if she could play a few songs on a Friday. Coffee tastings started when Maya got tired of explaining why two cups from the same bag tasted different, and decided to show people instead.
          </p>
          <p>
            We still bake before sunrise, we still know most of your orders, and the bell is still there. Come say hello.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-cup shadow-lift">
            <Image
              src="/images/about-shop.webp"
              alt="Wooden café chairs and tables on a cobbled street beside a red brick wall with hanging plants"
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="values-title" className="pt-0 lg:pt-0">
        <h2
          id="values-title"
          className="mb-12 font-display text-h2 font-semibold tracking-[-0.02em]"
        >
          What we care about
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-cup shadow-lift md:aspect-auto md:min-h-[28rem]">
            <Image
              src="/images/about-pour-over.webp"
              alt="A hand pouring hot water from a black gooseneck kettle over a pour-over coffee dripper"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-6">
            <ul className="flex flex-col gap-8 rounded-cup bg-surface p-8 shadow-lift">
              {values.map(({ title, text }) => (
                <li key={title} className="flex flex-col gap-2">
                  <h3 className="font-display text-h3 font-medium tracking-[-0.01em]">{title}</h3>
                  <p className="text-muted">{text}</p>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/3] overflow-hidden rounded-cup shadow-lift">
              <Image
                src="/images/about-baker.webp"
                alt="A baker in an apron and white cap kneading dough on a floured steel counter"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[50%_22%]"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="visit-title" className="pt-0 lg:pt-0">
        <div className="flex flex-col items-start gap-6 rounded-cup bg-surface-inverse p-8 text-surface md:p-12">
          <h2
            id="visit-title"
            className="max-w-[18ch] font-display text-h2 font-semibold tracking-[-0.02em]"
          >
            Come sit with us
          </h2>
          <p className="max-w-prose text-lead opacity-80">
            Tell us when you&apos;re coming and we&apos;ll save you a table.
          </p>
          <ReserveButton size="lg" />
        </div>
      </Section>
    </>
  );
}
