"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

const modes = {
  normal: 0,
  insert: 1,
};

const states = {
  message: 0,
  name: 1,
  email: 2
};

export default function EmailPrompt(props) {

  const [terminal, setTerminal] = useState({
    key: { name: "", code: 0 },
    mode: modes.normal,
    state: states.message,
    data: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [msgReq, setMsgReq] = useState(false);

  const sendEmail = () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please, Don't leave any fields empty");
      return;
    }
    setLoading(true);
    emailjs.send('service_uevkdiq', 'template_wybkgos',
      {
        from_name: form.name,
        to_name: "Sunil Sapkota",
        from_email: form.email,
        to_email: "sunx.sapk@gmail.com",
        message: form.message + "\nfrom " + form.email
      },
      'eL_bSzeBmyjJtLlXS'
    ).then(() => {
      setLoading(false);
      alert('Thank you ! I will get back to you as soon as possible.');
      setForm({ name: '', email: '', message: '' })
      setTerminal(p => ({ ...p, data: "" }));
    }, (err) => {
      setLoading(false);
      console.log(err);
      alert('Something went wrong !');
    })
  }

  useEffect(() => {
    const onKeyDown = key => { // ctrlKey, shiftKey, altKey, keyCode

      let trm = {};
      trm.key = { name: key.key, code: key.keyCode };
      trm.data = terminal.data;

      //normal mode
      if (terminal.mode === modes.normal) {
        if (trm.key.name === 'i') trm.mode = modes.insert;
        if (terminal.key.name === ":" && trm.key.name === "w") {
          if (terminal.state === states.message) {
            setForm(fr => ({ ...fr, message: terminal.data }));
            trm.data = form.name;
            trm.state = states.name;
          } else if (terminal.state === states.name) {
            setForm(fr => ({ ...fr, name: terminal.data }));
            trm.data = form.email;
            trm.state = states.email;
          } else {
            setForm(fr => ({ ...fr, email: terminal.data }));
            trm.data = form.message;
            trm.state = states.message;
            setMsgReq(true);
          }
        }
      }
      //insert mode
      else if (trm.key.code === 27) trm.mode = modes.normal;
      else {
        if (trm.key.name.length > 1) {
          if (trm.key.code === 8) trm.data = trm.data.slice(0, trm.data.length - 1)
          if (trm.key.code === 13) trm.data = trm.data.concat("\n");
        } else trm.data = trm.data.concat(trm.key.name);
      }

      setTerminal(p => ({
        ...p, ...trm
      }));
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [form, terminal]);

  useEffect(() => {
    if (msgReq) {
      sendEmail();
      setMsgReq(false);
    }
  }, [msgReq]);

  const getStateStr = () => {
    switch (terminal.state) {
      case states.message: return "message";
      case states.name: return "name";
      case states.email: return "email";
    }
  }

  const getModeStr = () => {
    switch (terminal.mode) {
      case modes.normal: return "NORMAL";
      case modes.insert: return "INSERT";
    }
  }


  return (
    <section {...props}>
      <div className="rounded-xl border-2 border-secondary p-4 relative min-h-[30rem] flex flex-col">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">Contact</h5>
        {terminal.mode === modes.normal ?
          (<p className="italic font-mono text-gray-400 flex-grow whitespace-pre-wrap">
            {!terminal.data ?
              `Press 'i' to enter ${getStateStr()}` :
              terminal.data}
          </p>) :
          (<p className="font-mono text-gray-400 flex-grow whitespace-pre-wrap">
            {terminal.data + "⮖"}
          </p>)
        }

        <div className="p-1">
          <div className="flex justify-between gap-2 font-mono bg-[#444] text-gray-300 px-2 rounded-md">
            <p>{loading ? "Sending Message..." : getStateStr()}</p>
            <p>{terminal.mode === modes.normal ? `${terminal.state === states.email? "send" : "save"}=':w' insert-mode='i'` : "normal-mode='Esc'"}</p>
          </div>
          <div className="flex justify-between gap-4 font-mono text-gray-300 px-2 py-1">
            <h5>--{getModeStr()}--</h5>
            <h5>_{terminal.key.name}_</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
