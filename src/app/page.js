import ContactPage from "@/components/contact";
import ExperiencePage from "@/components/experience";
import HeroPage from "@/components/hero";
import PortfolioPage from "@/components/portfolio";
import { developer } from "@/values";

export default function Home() {
  return (
    <main className="p-8 min-h-screen flex flex-col items-center gap-8">
      <h1 className="font-mono font-bold">{developer.name}</h1>
      <section className="flex flex-wrap min-h-[25rem] gap-8">
        <HeroPage className="flex-[0.5]" />
        <ContactPage className="flex-[0.5]" />
      </section>
      <PortfolioPage className="flex-grow w-full flex flex-col"/>
      <ExperiencePage className="flex-grow w-full flex flex-col"/>
    </main>
  );
}
