'use client';

import { portfolio } from "@/values";
import { PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PortfolioPage(props) {

  return (
    <section {...props}>
      <div className="p-4 rounded-xl border-2 border-secondary relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">Portfolio</h5>
        <div className="flex gap-4 justify-evenly items-center flex-wrap">
          {portfolio.map((project, i) => (
            <div className="rounded-xl p-4 border-2 border-primary relative gap-2 flex flex-col" key={i}>
              <Video project={project} />
              <div className="font-mono p-2 bg-primary bg-opacity-25 rounded-xl">
                <h4 className="text-wrap max-w-[30rem]">{project.title} : {project.description}</h4>
                <div className="flex items-center gap-4">
                  {project.link && <Link href={project.link.href} className="hover:scale-125 duration-200" >
                    <img src={project.link.iconSrc} className="h-10" />
                  </Link>}
                  {project.code && <Link href={project.code.href} className="hover:scale-125 duration-200" >
                    {project.code.icon}
                  </Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Video = ({ project }) => {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <div className="relative h-[16rem] aspect-video">
      {!isPlaying && (
        <div
          className="absolute top-0 left-0 z-10 w-full h-full opacity-85 hover:opacity-100 hover:scale-[1.05] duration-200 cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          <img
            className="w-full h-full rounded-xl"
            src={project.thumbnail}
          />
          <PlayCircleIcon className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full" />
        </div>
      )}

      <video
        controls
        className="h-full w-full"
        style={{ display: isPlaying ? 'block' : 'none' }}
        autoPlay={isPlaying}
      >
        <source src={project.demo} type="video/mp4" />
        Your browser doesn't support video tag.
      </video>
    </div>
  );
};
