import { experience } from "@/values";
import Link from "next/link";

function ExperienceCard({ exp }) {
  return (
    <div className="bg-black/85 flex flex-col gap-1 p-4 rounded-lg border-2 border-primary min-w-full lg:min-w-[20rem] max-w-[40rem] aspect-video font-mono shadow-glow-primary">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 bg-secondary bg-opacity-40 px-2 py-1 rounded">
        <div className="flex items-center gap-2 flex-wrap">
          <h4>{"> "}{exp.position}</h4>
          {exp.volunteer && (
            <span className="chip chip-primary text-[0.7rem] font-mono uppercase tracking-wide">
              Volunteer
            </span>
          )}
        </div>
        {exp.company && (
          <a href={exp.link} className="italic font-bold hover:glow-primary">
            @{exp.company} ↗ &nbsp;
          </a>
        )}
      </div>
      <h5 className="italic font-bold mt-1">{exp.field}</h5>
      <div className="flex justify-between text-[0.8rem] px-1 mt-2">
        <i>{exp.start}</i>
        {exp.end ? <i>{exp.end}</i> : <i>Currently working</i>}
      </div>

      <div className="flex w-full items-center text-secondary font-bold h-[10px]">
        <div className="flex-grow h-[2px] border-[1px] border-secondary" />
        {">"}
      </div>

      <div className="flex flex-col gap-2 py-2 mt-2">
        <h4 className="font-bold">Skills</h4>
        <div className="flex gap-2 flex-wrap">
          {exp.skills.map((skill) => (
            <Link
              key={skill}
              href={`https://www.google.com/search?q=${skill}`}
              target="_blank"
              className="cursor-pointer"
            >
              <h5 className="chip">{skill}</h5>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 py-2">
        <h4 className="font-bold">Project Types</h4>
        <div className="flex gap-2 flex-wrap">
          {exp.project_types.map((proj) => (
            <Link
              key={proj}
              href={`https://www.google.com/search?q=${proj}`}
              target="_blank"
              className="cursor-pointer"
            >
              <h5 className="chip">{proj}</h5>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage(props) {
  return (
    <section {...props}>
      <div className="rounded-xl border-2 border-secondary p-4 min-w-full flex-grow relative bg-black/60 shadow-glow-secondary">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary glow-primary">Experience</h5>
        <div className="flex gap-4 justify-evenly flex-wrap">
          {experience.map((exp, i) => (
            <ExperienceCard exp={exp} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
