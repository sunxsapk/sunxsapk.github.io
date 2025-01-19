'use client';

import EmailForm from "@/components/emailform";
import EmailPrompt from "@/components/emailprompt";
import ExperiencePage from "@/components/experience";
import HeroPage from "@/components/hero";
import LinksPage from "@/components/links";
import PortfolioPage from "@/components/portfolio";
import ResumePage from "@/components/resume";
import { developer } from "@/values";
import { useState } from "react";

export default function Home() {
  const [vim, setVim] = useState(false);

  return (
    <main className="md:p-2 lg:p-8 min-h-screen flex flex-col items-center gap-8">
      <h1 className="underline font-mono font-bold">{developer.name}</h1>
      <section className="flex flex-col md:flex-row min-h-[25rem] gap-8">
        <HeroPage className="flex-[0.6]" />
        <div className="flex-[0.4] flex flex-col gap-8">
          <LinksPage />
          <ResumePage className="flex-grow" />
        </div>
      </section>
      <ExperiencePage className="flex-grow w-full flex flex-col" />
      <PortfolioPage className="flex-grow w-full flex flex-col" />

      <div className="w-full flex gap-8">
        {vim ? <EmailPrompt id="contact" className="w-full bg-[#000a]" />
          : <EmailForm id="contact" className="w-full bg-[#000a]" />}
        <div className="hidden lg:flex-[0.1] lg:flex flex-col gap-4 py-4 pr-4">
          <button className="flex-1 hover:flex-[2] p-4 rounded-md duration-200" style={{ background: vim ? "#e64" : "#999" }} onClick={() => setVim(true)}></button>
          <button className="flex-1 hover:flex-[2] p-4 rounded-md duration-200" style={{ background: vim ? "#999" : "#e64" }} onClick={() => setVim(false)}></button>
        </div>
      </div>
    </main>
  );
}
