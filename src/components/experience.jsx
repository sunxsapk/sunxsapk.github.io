import { experience } from "@/values";
import Link from "next/link";

export default function ExperiencePage(props) {

  const experienceItem = (exp, i) => (
    <div className="bg-black flex flex-col gap-1 p-4 rounded-lg border-2 border-primary min-w-full lg:min-w-[20rem] max-w-[40rem] aspect-video font-mono" key={i}>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-2 bg-secondary bg-opacity-40">
        <h4>{"> "}{exp.position}</h4>
        {exp.company && <h4 className="italic">@{exp.company}</h4>}
      </div>
      <h5 className="italic font-bold mt-1">{exp.field}</h5>
      <div className="border-b-[1px] border-secondary flex justify-between text-[0.8rem] px-1 mt-2">
        <i>{exp.start}</i>
        {exp.end ? (<i>{exp.end}</i>) : (<i>Currently working</i>)}
      </div>

      <div className="flex flex-col gap-2 py-2 mt-2">
        <h4 className="font-bold">Skills</h4>
        <div className="flex gap-4 flex-wrap">{exp.skills.map(skill => (
          <Link key={skill} href={`https://www.google.com/search?q=${skill}`} target="_blank" className="cursor-pointer">
            <h5 className="px-2 py-1 rounded-md bg-secondary bg-opacity-40 hover:bg-opacity-80">{skill}</h5>
          </Link>
        ))}</div>
      </div>

      <div className="flex flex-col gap-2 py-2">
        <h4 className="font-bold">Project Types</h4>
        <div className="flex gap-4 flex-wrap">{exp.project_types.map(proj => (
          <Link key={proj} href={`https://www.google.com/search?q=${proj}`} target="_blank" className="cursor-pointer">
            <h5 className="px-2 py-1 rounded-md bg-secondary bg-opacity-40 hover:bg-opacity-80">{proj}</h5>
          </Link>
        ))}</div>
      </div>
    </div>
  );

  return (
    <section {...props}>
      <div className="rounded-xl border-2 border-secondary p-4 min-w-full flex-grow relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">Experience</h5>
        <div className="flex gap-4 justify-evenly flex-wrap">
          {experience.map(experienceItem)}
        </div>
      </div>
    </section>
  );
}
