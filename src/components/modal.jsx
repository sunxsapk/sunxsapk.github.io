'use client';

import { useState } from "react";

export default function useModal() {
  const [active, setActive] = useState(false);

  const ModalComponent = ({ children }) => (
    <div className="fixed z-[100] top-0 left-0 w-screen h-screen bg-[#000a]" style={{ display: active ? "block" : "none" }}>
      <div onClick={() => setActive(false)} className="p-2 md:py-10 md:px-[15vw] h-full w-full relative flex flex-col gap-2 items-center">
        {children}
        
        <button className="px-8 py-2 border-2 border-secondary rounded-xl w-fit bg-primary bg-opacity-30">Close</button>
      </div>
    </div>
  );

  return {
    setActive : setActive,
    component : ModalComponent
  }
}
