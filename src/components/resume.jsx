'use client';

import { developer, resume } from "@/values";
import useModal from "./modal";

export default function ResumePage(props) {

  const resumeModal = useModal();

  return (
    <section {...props}>
      <div className="bg-black flex flex-col gap-3 p-4 rounded-xl border-2 border-secondary text-primary relative font-mono h-full ">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black">Resume</h5>

        <button onClick={() => resumeModal.setActive(true)} className="px-4 py-1 rounded-xl bg-primary bg-opacity-30 w-fit hover:bg-opacity-50">
          View Resume
        </button>

        <a href={resume} download={`${developer.name}-resume`} className="px-4 py-1 cursor-pointer rounded-xl bg-secondary bg-opacity-30 w-fit hover:bg-opacity-50">
          Download Resume
        </a>
      </div>

      <resumeModal.component>
        <object data={resume} type="application/pdf" className="w-full h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="p-4">Your browser doesnot support PDF plugin.</h1>
            <a href={resume} download={`${developer.name}-resume`} className="px-8 py-2 cursor-pointer rounded-xl bg-secondary w-fit hover:bg-opacity-50">
              Download Resume Instead
            </a>
          </div>
        </object>
      </resumeModal.component>
    </section>
  );
}
