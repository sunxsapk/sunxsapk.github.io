import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

const giticon = <GithubIcon color="#fff"/>;
const linkedinicon = <LinkedinIcon color="#44d" />;
const instaicon = <InstagramIcon color="#e0f" />;

export const developer = {
  name : 'Sunil Sapkota',
  logo : "/images/therealsunx.svg",
  about : " I am Sunil Sapkota. I am a game developer filled with passion for making games. I make some pretty cool frontend for web-apps too. If you want a piece of this, you know where to find me."
};

export const resume = "/files/resume.pdf";

export const links = [
  { to: "/therealsunx", href: "https://www.github.com/therealsunx", icon: giticon },
  { to: "/therealsunx", href: "https://www.linkedin.com/in/therealsunx", icon: linkedinicon },
  { to: "/sunil_sapkota1224", href: "https://www.instagram.com/sunil_sapkota1224", icon: instaicon },
];

export const portfolio = [
  {
    title: "Endless",
    description: "An Endless flight game with dynamically generated environment with thrilling gameplay.",
    link: {
      href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.Endless",
      iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    },
    code: {
      href: "https://github.com/therealsunx/Endless",
      icon: giticon
    },
    thumbnail: "/images/EndLess.png", //img
    demo: "/videos/endless.mp4", //video
  },
  {
    title: "Physx-2D",
    description: "A game/simulation engine library with custom physics and Entity Component System with great performance.",
    code: {
      href: "https://github.com/therealsunx/Endless",
      icon: giticon
    },
    thumbnail: "/images/physx2d.png", //img
    demo: "/videos/physx2d.mp4", //video
  },
  {
    title: "Edge Of Space",
    description: "An arcade classic with a fight at the edge of space.",
    link: {
      href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.EdgeOfSpace",
      iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    },
    code: {
      href: "https://github.com/therealsunx/EdgeOfSpace",
      icon: giticon
    },
    thumbnail: "/images/edgeofspace.png", //img
    demo: "/videos/edgeofspace.mp4", //video
  },
  /*
  {
    title: "Endless",
    description: "An Endless flight game with dynamically generated environment with thrilling gameplay.",
    link: {
      href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.Endless&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
      iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    },
    code: {
      href: "https://github.com/therealsunx/Endless",
      icon: giticon
    },
    thumbnail: "/images/EndLess.png", //img
    demo: "/videos/Endless.mp4", //video
  },
  /**/
];

export const experience = [
  {
    field: "Game Developement",
    position: "Indie Developer",
    company: "",
    start: "Apr 2022", //date
    end: "", //data or null (means currently working)
    skills: ["Unity", "C#", "C++", "Engine development", "ECS", "OPENGL", "Shader", "Blender"],
    project_types: ["2D Mobile games", "3d Mobile games", "Desktop Games", "Rendering Engine", "Physics Engine"],
  },
  {
    field: "Web Developement",
    position: "Frontend Developer",
    company: "MarginTop Solutions",
    start: "Nov 2023", //date
    end: "", //data or null (means currently working)
    skills: ["React", "Nextjs", "Javascript", "THREEjs", "Fiberjs", "Konvajs", "API integration"],
    project_types: ["Static Web-app", "Dynamic Web-apps", "2D & 3D configurators"],
  },
  /*
  {
    field: "Web Developement",
    position: "Frontend Developer",
    company: "MarginTop Solutions",
    start: "Nov 2023", //date
    end: "", //data or null (means currently working)
    skills: ["React", "Nextjs", "Javascript", "THREEjs", "Fiberjs", "Konvajs", "API integration"],
    project_types: ["Static Web-app", "Dynamic Web-apps", "2D & 3D configurators"],
  },
  {
    field: "Web Developement",
    position: "Frontend Developer",
    company: "MarginTop Solutions",
    start: "Nov 2023", //date
    end: "", //data or null (means currently working)
    skills: ["React", "Nextjs", "Javascript", "THREEjs", "Fiberjs", "Konvajs", "API integration"],
    project_types: ["Static Web-app", "Dynamic Web-apps", "2D & 3D configurators"],
  },
 /* */
];
