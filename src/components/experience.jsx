import { experience } from "@/values";

export default function ExperiencePage(props) {

  const experienceItem = (exp, i) => (
    <div className="flex flex-col gap-1 p-4 rounded-lg border-2 border-primary min-w-[30rem] max-w-[40rem] aspect-video font-mono" key={i}>
      <div className="flex justify-between bg-secondary bg-opacity-40">
        <h4>{"> "}{exp.position}</h4>
        {exp.company && <h4>@ {exp.company}</h4>}
      </div>
      <h5 className="italic font-bold">&nbsp;&nbsp;{exp.field}</h5>
      <div className="border-b-[1px] border-secondary flex justify-between text-[0.8rem] px-4">
        <i>{exp.start}</i>
        {exp.end ? (<i>{exp.end}</i>) : (<i>Currently working</i>)}
      </div>

      <div className="flex flex-col gap-2 py-2">
        <h4>Skills</h4>
        <div className="flex gap-4 flex-wrap">{exp.skills.map(skill => <h5 className="px-2 py-1 rounded-md bg-secondary bg-opacity-40">{skill}</h5>)}</div>
      </div>

      <div className="flex flex-col gap-2 py-2">
        <h4>Project Types</h4>
        <div className="flex gap-4 flex-wrap">{exp.project_types.map(proj => <h5 className="px-2 py-1 rounded-md bg-secondary bg-opacity-40">{proj}</h5>)}</div>
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
