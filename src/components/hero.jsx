import { developer } from "@/values";

export default function HeroPage(props) {

  return (
    <section {...props} >
      <div className="rounded-xl border-2 bg-black p-4 border-secondary flex flex-col lg:flex-row-reverse items-center gap-16 h-full relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">About Me</h5>
        <img src={developer.logo} className="w-[15rem] md:w-[20rem] aspect-square rounded-[35%] p-4 bg-secondary" />
        <h4 className="text-primary font-mono md:text-[1.17rem]">
          Hello ... <br />
          {developer.about} &darr;
        </h4>
      </div>
    </section>
  );
}
