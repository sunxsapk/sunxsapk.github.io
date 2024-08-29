'use client';

import { developer, resume } from "@/values";
import { useState } from "react";

export default function ResumePage(props) {

  const [active, setActive] = useState(false);

  return (
    <section {...props}>
      <div className="flex flex-col gap-3 p-4 rounded-xl border-2 border-secondary text-primary relative font-mono h-full ">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black">Resume</h5>

        <button onClick={() => setActive(true)} className="px-4 py-1 rounded-xl bg-primary bg-opacity-30 w-fit hover:bg-opacity-50">
          View Resume
        </button>

        <a href={resume} download={`${developer.name}-resume`} className="px-4 py-1 cursor-pointer rounded-xl bg-secondary bg-opacity-30 w-fit hover:bg-opacity-50">
          Download Resume
        </a>
      </div>

      <div className="fixed z-[100] top-0 left-0 w-full h-full bg-[#000a]" style={{ display: active ? "block" : "none" }}>
        <div onClick={()=>setActive(false)} className="p-10 relative flex justify-center">
          <embed src={resume} className="h-[90lvh] w-[70lvw]" />
        </div>
      </div>
    </section>
  );
}
