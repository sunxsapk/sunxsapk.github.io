'use client';

import { portfolio } from "@/values";
import Link from "next/link";
import useModal from "./modal";
import { useState } from "react";

export default function PortfolioPage(props) {
  const projModal = useModal();
  const [projInView, setProjInView] = useState(portfolio[0]);

  const openProj = proj => {
    projModal.setActive(true);
    setProjInView(proj);
  }

  const projectcomp = (project, i) => (
    <div className="bg-black rounded-xl p-4 border-2 border-primary relative gap-2 flex flex-col items-center min-w-full lg:min-w-[20rem] lg:max-w-[28rem]" key={i}>
      <iframe
        src={project.demo}
        allow="autoplay; encrypted-media"
        className="w-full aspect-video"
      />
      <div className="font-mono p-2 rounded-xl">
        <h4 className="text-wrap max-w-[30rem] font-bold bg-secondary bg-opacity-40">{"> "}{project.title}</h4>
        <h5 className="text-wrap max-w-[30rem]">{project.description}</h5>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4">
            {project.link && <Link href={project.link.href} className="hover:scale-125 duration-200" >
              <img src={project.link.iconSrc} className="h-10" />
            </Link>}
            {project.code && <Link href={project.code.href} className="hover:scale-125 duration-200" >
              {project.code.icon}
            </Link>}
          </div>

          <button onClick={_ => openProj(project)} className="px-4 py-1 rounded-md bg-primary bg-opacity-30">Details</button>
        </div>
      </div>
    </div>
  );

  return (
    <section {...props}>
      <div className="p-4 rounded-xl border-2 border-secondary relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">Portfolio</h5>
        <div className="flex gap-4 justify-evenly items-center flex-wrap">
          {portfolio.map(projectcomp)}
        </div>
      </div>

      <projModal.component>
        <ProjectDetail project={projInView} />
      </projModal.component>
    </section>
  );
}

const ProjectDetail = ({ project }) => (
  <div className="flex flex-col items-center gap-4 py-4 md:px-16 w-full md:w-3/4 h-full bg-black border-2 border-secondary rounded-xl overflow-clip font-mono">
    <h2 className="underline">{project.title}</h2>
    <iframe
      src={project.demo}
      allow="autoplay; encrypted-media"
      className="w-full aspect-video"
    />
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-wrap">{project.description}</h3>

      <div className="flex flex-col gap-4">
        <p className="border-b-2 border-secondary">Skills</p>
        <div className="flex flex-wrap gap-4">
          {project.skills.map(skill => (
            <Link key={skill} href={`https://www.google.com/search?q=${skill}`} target="_blank" className="cursor-pointer">
              <h4 className="px-2 py-1 rounded-md bg-secondary bg-opacity-40 hover:bg-opacity-80">{skill}</h4>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="border-b-2 border-secondary">Links</p>
        <div className="flex flex-wrap gap-4 items-center">
          {project.link && <Link href={project.link.href} className="hover:scale-125 duration-200" >
            <img src={project.link.iconSrc} className="h-10" />
          </Link>}
          {project.code && <Link href={project.code.href} className="hover:scale-125 duration-200" >
            {project.code.icon}
          </Link>}
        </div>
      </div>
    </div>
  </div>
);

