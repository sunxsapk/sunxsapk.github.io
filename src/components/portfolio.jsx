'use client';

import { portfolio } from "@/values";
import Link from "next/link";
import useModal from "./modal";
import { useState } from "react";

function ProjectCard({ project, index, onOpen }) {
    return (
        <div
            className={`
            bg-black/85 rounded-xl p-4 relative gap-2 flex flex-col items-center min-w-full border-2 border-primary h-[28rem] shadow-glow-primary
            ${index === 0 ?
                    "lg:border-y-[6px] lg:border-x-[12px] lg:h-[40rem] lg:min-w-[45vw] lg:max-w-[60vw] lg:mx-[20rem] lg:my-6" :
                    "lg:min-w-[30rem] lg:max-w-[30rem]"}
            `}
        >
            {project.demo ? (
                <iframe
                    src={project.demo}
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    className="w-full flex-grow rounded"
                />
            ) : (
                <img src={project.thumbnail} className="w-full aspect-video object-contain" alt="" />
            )}
            <div className="font-mono p-2 rounded-xl w-full">
                <h4 className="text-wrap w-full font-bold bg-secondary bg-opacity-40 px-1 rounded">{"> "}{project.title}</h4>
                <h5 className="text-wrap w-full mt-1">{project.description}</h5>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                        {project.link && (
                            <Link href={project.link.href} className="hover:scale-125 transition-transform duration-200">
                                {typeof project.link.iconSrc === "string" ?
                                    <img src={project.link.iconSrc} className="h-10" alt="" /> :
                                    project.link.iconSrc}
                            </Link>
                        )}
                        {project.code && (
                            <Link href={project.code.href} className="hover:scale-125 transition-transform duration-200">
                                {project.code.icon}
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => onOpen(project)}
                        className="px-4 py-1 rounded-md bg-primary bg-opacity-30 hover:bg-opacity-60 transition-colors shadow-glow-primary"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioPage(props) {
    const projModal = useModal();
    const [projInView, setProjInView] = useState(portfolio[0]);

    const openProj = (proj) => {
        setProjInView(proj);
        projModal.setActive(true);
    };

    return (
        <section {...props}>
            <div className="p-4 rounded-xl border-2 border-secondary relative bg-black/40 shadow-glow-secondary">
                <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary glow-primary">Portfolio</h5>
                <div className="flex gap-4 justify-evenly items-center flex-wrap">
                    {portfolio.map((p, i) => (
                        <ProjectCard project={p} index={i} key={i} onOpen={openProj} />
                    ))}
                </div>
            </div>

            <projModal.component>
                {projModal.active && <ProjectDetail project={projInView} />}
            </projModal.component>
        </section>
    );
}

const ProjectDetail = ({ project }) => (
    <div className="flex flex-col gap-4 py-4 px-2 md:px-8 w-full md:w-[90%] lg:w-[80%] h-full bg-black/85 border-2 border-secondary rounded-xl overflow-y-auto font-mono shadow-glow-secondary">
        <div className="flex items-center justify-between gap-2 px-2">
            <h2 className="glow-primary">{project.title}</h2>
            {project.link && (
                <Link href={project.link.href} className="hover:scale-110 transition-transform">
                    {typeof project.link.iconSrc === "string" ?
                        <img src={project.link.iconSrc} className="h-8" alt="" /> :
                        project.link.iconSrc}
                </Link>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-2">
            <div className="md:col-span-5 flex flex-col gap-4">
                <div className="rounded-lg overflow-hidden border border-primary/40 shadow-glow-primary bg-black">
                    {project.demo ? (
                        <iframe
                            src={project.demo}
                            allow="autoplay; encrypted-media"
                            loading="lazy"
                            className="w-full aspect-video"
                        />
                    ) : (
                        <img src={project.thumbnail} className="w-full aspect-video object-contain" alt="" />
                    )}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    {project.code && (
                        <Link
                            href={project.code.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/20 hover:bg-primary/40 transition-colors"
                        >
                            {project.code.icon}
                            <span className="text-sm">Source</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-4">
                {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-col gap-2 p-3 rounded-lg border border-primary/40 bg-primary/5">
                        <p className="text-primary font-bold glow-primary">Highlights</p>
                        <ul className="flex flex-col gap-1 list-disc list-inside text-[0.95rem]">
                            {project.highlights.map((h, i) => (
                                <li key={i} className="text-wrap">{h}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <h3 className="text-wrap">{project.description}</h3>

                <hr className="border-secondary/60" />

                <div className="flex flex-col gap-3">
                    {project.more.map((m, i) => (
                        <h4 className="text-wrap leading-relaxed" key={i}>{m}</h4>
                    ))}
                </div>

                <div className="flex flex-col gap-2 py-2">
                    <p className="border-b border-secondary/60 pb-1 font-bold">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                            <Link
                                key={skill}
                                href={`https://www.google.com/search?q=${skill}`}
                                target="_blank"
                                className="cursor-pointer"
                            >
                                <h4 className="chip text-sm">{skill}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
