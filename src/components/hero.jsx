import { developer } from "@/values";

export default function HeroPage(props) {

  return (
    <section {...props} >
      <div className="rounded-xl border-2 bg-black p-4 border-secondary flex flex-col lg:flex-row-reverse items-center gap-16 h-full relative">
        <div className="bg_image fixed w-full h-full top-0 left-0 -z-10" />
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">About Me</h5>
        <img src={developer.logo} className="h-[15rem] md:h-[20rem] rounded-[6rem] aspect-[4/3] shadow-xl border-2 shadow-primary" />
        <h4 className="font-mono md:text-[1.17rem]">
          Hello ... <br />
          {developer.about} &darr;
        </h4>
      </div>
    </section>
  );
}
