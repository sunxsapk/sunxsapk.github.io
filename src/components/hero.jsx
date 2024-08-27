import logo from "@/assets/logo.svg";
import { developer } from "@/values";

export default function HeroPage(props) {

  return (
    <section {...props} >
      <div className="rounded-xl border-2 bg-black p-4 border-secondary flex flex-row-reverse items-center gap-16 h-full relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">About Me</h5>
        <img src={logo.src} className="w-[20rem] aspect-square rounded-[40%] p-10 bg-secondary" />
        <h3 className="text-primary font-mono">
          Hello ... <br />
          {developer.about} &rarr;
        </h3>
      </div>
    </section>
  );
}
