import { links } from "@/values";
import Link from "next/link";

export default function LinksPage(props) {
  return (
    <section {...props}>
      <div className="bg-black/85 flex flex-col gap-3 p-4 rounded-xl border-2 border-secondary text-primary relative font-mono shadow-glow-secondary">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black glow-primary">Links</h5>
        {links.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className="flex items-stretch w-fit gap-2 hover:gap-4 hover:scale-105 transition-all duration-200"
          >
            {link.icon}
            <h4 className="italic">{link.to} &#x2197;</h4>
          </Link>
        ))}

        <Link
          href="#contact"
          className="bg-secondary px-4 py-2 mt-4 rounded-md w-fit bg-opacity-50 hover:bg-opacity-80 text-[0.83rem] md:text-[1em] transition-colors shadow-glow-secondary"
        >
          Click here to send email
        </Link>
      </div>
    </section>
  );
}
