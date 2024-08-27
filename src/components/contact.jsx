import EmailPrompt from "./emailprompt";
import LinksPage from "./links";

export default function ContactPage(props) {

  return (
    <div {...props} >
      <div className="flex flex-col gap-8 h-full" >
        <LinksPage />
        <EmailPrompt className="flex-grow"/>
      </div>
    </div>
  );
}
