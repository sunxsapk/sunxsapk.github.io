'use client';

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function EmailForm(props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    if(loading) return;
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
    }, (err) => {
      setLoading(false);
      console.log(err);
      alert('Something went wrong !');
    })
  }

  const handleChange = e => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }
  return (
    <section {...props}>
      <div className="border-2 border-secondary rounded-xl relative font-mono flex flex-col">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black text-primary">Contact</h5>

        <div className="px-2 py-4 space-y-1">
          <h5 className="font-bold">Name</h5>
          <input
            type="text"
            name="name" required
            placeholder="John Doe"
            value={form.name}
            className="w-full bg-secondary bg-opacity-25 rounded-lg px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <div className="px-2 py-4 space-y-1">
          <h5 className="font-bold">Email</h5>
          <input
            type="email" required
            placeholder="johndoe@sth.com"
            name="email"
            value={form.email}
            className="w-full bg-secondary bg-opacity-25 rounded-lg px-2 py-1"
            onChange={handleChange}
          />
        </div>

        <div className="px-2 py-4 space-y-1">
          <h5 className="font-bold">Message</h5>
          <textarea
            type="text" rows={5}
            name="message" required
            placeholder="Hello there, I've got an idea. Let's talk about it."
            value={form.message}
            className="w-full bg-secondary bg-opacity-25 rounded-lg px-2 py-1"
            onChange={handleChange}
          />
        </div>
        
        <button className="px-4 self-center m-2 bg-secondary bg-opacity-55 rounded-md" onClick={sendEmail}>{loading? "Sending..." : "Submit"}</button>
      </div>
    </section>
  );
}
