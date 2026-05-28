import { developer } from "@/values";

export default function HeroPage(props) {
  return (
    <section {...props}>
      <div className="rounded-xl border-2 bg-black/85 p-4 border-secondary flex flex-col lg:flex-row-reverse items-center gap-16 h-full relative shadow-glow-secondary">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary glow-primary">About Me</h5>
        <img
          src={developer.logo}
          className="h-[15rem] md:h-[20rem] rounded-[6rem] aspect-[4/3] border-2 border-primary/60 shadow-glow-primary"
          alt={developer.name}
        />
        <h4 className="font-mono md:text-[1.17rem] leading-relaxed">
          Hello ... <br />
          {developer.about} &darr;
        </h4>
      </div>
    </section>
  );
}
