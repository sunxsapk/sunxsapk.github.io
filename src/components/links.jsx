import { links } from "@/values";
import Link from "next/link";

export default function LinksPage(props) {
  return (
    <section {...props} >
      <div className="flex flex-col gap-3 p-4 rounded-xl border-2 border-secondary text-primary relative">
        <h5 className="absolute top-[-.6rem] left-[1rem] px-1 bg-black">Links</h5>
        {links.map((link, i) => (
          <Link href={link.href} key={i} className="flex items-stretch w-fit gap-2">
            {link.icon}
            <h4 className="text-primary font-mono italic">{link.to} &#x2197;</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
