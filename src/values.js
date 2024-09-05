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
    skills: ["Unity", "C#", "Blender", "3D Modelling", "Procedural Generation"],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.Endless",
      iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    },
    code: {
      href: "https://github.com/therealsunx/Endless",
      icon: giticon
    },
    thumbnail: "/images/EndLess.png", //img
    demo: "https://drive.google.com/file/d/1HTplTROBPICTkVatyNcTnFtPCTMq4MF4/preview", //video
  },
  {
    title: "Physx-2D",
    description: "A game/simulation engine library with custom physics and Entity Component System with great performance.",
    skills: ["Physics Engine Programming", "Graphics Engine Programming", "OpenGL", "GLSL", "Entity Component System(ECS) Design]", "Shared Library Building", "C/C++", "CMAKE"],
    code: {
      href: "https://github.com/therealsunx/Physx-2D",
      icon: giticon
    },
    thumbnail: "/images/physx2d.png", //img
    demo: "https://drive.google.com/file/d/1MyHf1fhyxFdGrWF7u4Z8MSKW1H6eX5Sv/preview", //video
  },
  {
    title: "Edge Of Space",
    description: "An arcade classic with a fight at the edge of space.",
    skills: ["Unity", "C#", "Aseprite", "2D Pixel Art", "Procedural Generation"],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.EdgeOfSpace",
      iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    },
    code: {
      href: "https://github.com/therealsunx/EdgeOfSpace",
      icon: giticon
    },
    thumbnail: "/images/edgeofspace.png", //img
    demo: "https://drive.google.com/file/d/1kIa2TaqhWo2GvgFqES4DHDYwiVY4HNU1/preview", //video
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
    field: "Web Developement",
    position: "Frontend Developer",
    company: "MarginTop Solutions",
    start: "Sep 2023", //date
    end: "", //data or null (means currently working)
    skills: ["React", "Nextjs", "Javascript", "THREEjs", "Fiberjs", "Konvajs", "API integration"],
    project_types: ["Dynamic Web-apps", "2D configurators", "3D Configurators", "Company Portfolio Sites"],
  },
  {
    field: "Game Developement",
    position: "Indie Developer",
    company: "",
    start: "Apr 2022", //date
    end: "", //data or null (means currently working)
    skills: ["Unity", "C#", "C++", "Engine development", "ECS", "OPENGL", "Shader", "Blender"],
    project_types: ["2D Mobile games", "3d Mobile games", "Desktop Games", "Graphics Engine", "Physics Engine"],
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
