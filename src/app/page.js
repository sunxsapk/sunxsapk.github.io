import EmailForm from "@/components/emailform";
import EmailPrompt from "@/components/emailprompt";
import ExperiencePage from "@/components/experience";
import HeroPage from "@/components/hero";
import LinksPage from "@/components/links";
import PortfolioPage from "@/components/portfolio";
import { developer } from "@/values";

export default function Home() {
  return (
    <main className="md:p-2 lg:p-8 min-h-screen flex flex-col items-center gap-8">
      <h1 className="underline font-mono font-bold">{developer.name}</h1>
      <section className="flex flex-col md:flex-row min-h-[25rem] gap-8">
        <HeroPage className="flex-[0.6]" />
        <LinksPage className="flex-[0.4]" />
      </section>
      <PortfolioPage className="flex-grow w-full flex flex-col" />
      <ExperiencePage className="flex-grow w-full flex flex-col" />
      <EmailPrompt id="contact" className="w-full hidden lg:block" />
      <EmailForm className="lg:hidden w-full" />
    </main>
  );
}
