import { GithubIcon, InstagramIcon, LinkedinIcon, TagIcon } from "lucide-react";

const tagicon = <TagIcon color="#ffffff"/>;
const giticon = <GithubIcon color="#fff"/>;
const linkedinicon = <LinkedinIcon color="#44d" />;
const instaicon = <InstagramIcon color="#e0f" />;

export const developer = {
  name : 'Sunil Sapkota',
  logo : "/images/therealsunx.svg",
  about : `I am Sunil Sapkota. I am a programmer/problem solver by default. I love making stuffs
  with code. So far, I've made Games, Game/Physics engines, Text editor, Web-apps, etc. Contact
  me if I can prove to be helpful to you.`
};

export const resume = "/files/resume.pdf";

export const links = [
  { to: "/therealsunx", href: "https://www.github.com/therealsunx", icon: giticon },
  { to: "/therealsunx", href: "https://www.linkedin.com/in/therealsunx", icon: linkedinicon },
  { to: "/sunil_sapkota1224", href: "https://www.instagram.com/sunil_sapkota1224", icon: instaicon },
];

export const portfolio = [
  {
    title: "trvim",
    description: "trvim - is a text editor, similar in operation to vim, built in C.",

    more:`I started to develop trvim, only because I wanted to see if I can program some features of
    vim. So, I went on to create a simple text editor that uses vim motions. Along the way,
    many features came along because, ...why not? So now It has some cool features like, syntax 
    highlighting, split-screen, buffer-based file editing, selection replacement, etc. `,

    skills: ["Text Editor Programming", "Non-Canonical Input Handling",
      "Data Structures & Algorithms", "C", "Syntax Highlighter Programming", "CMAKE",
      "Memory Management", "System Programming"],
    link: {
      href: "https://github.com/therealsunx/trvim/releases",
      iconSrc: tagicon
    },
    code: {
      href: "https://github.com/therealsunx/trvim",
      icon: giticon
    },
    thumbnail: "/images/trvim.png", //img
    demo: "https://drive.google.com/file/d/1mwa9bAGj4IGuG-X-l33Db7iyxbTjwJD7/preview", //video
  },
  {
    title: "Endless",
    description: "An Endless flight game with dynamically generated environment with thrilling gameplay.",

    more : `It is a 3D endless flight game, that has dynamic environment each time you play, thanks
    to power of procedural generation. It uses semi-wave function collapse algorithm to make the terrain
    continously. I found that it is good to play this game with headphones on. It is highly
    immersive that way.`,

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

    more:`Physx-2D is a game/physics engine library I created for C/C++. It does not sit on top of
    any other libraries. It handles everything from creation & management of windows, rendering Sprites,
    textures and shaders loading - to handling physics-system as well as managing its own Entity
    Component System. It has optimized rendering system which utilizes instanced rendering for reducing
    draw-calls. It is developed to be available across different platforms and also provides some
    platform-specific defination to make it easy for developers. It also provides its own logging system for debugging
    which erases all debug statements during release build, thus making faster builds. It has many other
    features which you can check out on its github repo.`,

    skills: ["Physics Engine Programming", "Graphics Engine Programming", "OpenGL", "GLSL",
      "Entity Component System(ECS) Design]", "Shared Library Building", "C/C++", "CMAKE",
      "Data Structure & Algorithms", "Texture & Shaders Loading", "Compute Shaders"],
    code: {
      href: "https://github.com/therealsunx/Physx-2D",
      icon: giticon
    },
    thumbnail: "/images/physx2d.png", //img
    demo: "https://drive.google.com/file/d/1MyHf1fhyxFdGrWF7u4Z8MSKW1H6eX5Sv/preview", //video
  },
  {
    title: "libhash",
    description: "A C-library for hashmaps, with easy to use API.",

    more:`libhash is a easy to use c-library for hashmaps. It uses FNV-1a hash algorithm under the
    hood. It is made easy to use and very intuitive API. Simply clone the library into your project
    and use it.`,

    skills: ["C", "Memory Management", "Data Structures & Algorithm"],
    link: {
      href: "https://github.com/therealsunx/libhash/releases/tag/libhash-v0.0.1",
      iconSrc: tagicon
    },
    code: {
      href: "https://github.com/therealsunx/libhash",
      icon: giticon
    },
    thumbnail: "/images/libhash.png", //img
  },
  {
    title: "Edge Of Space",
    description: "An arcade classic with a fight at the edge of space.",

    more : `It is a 2D game that I made for me to pass some time and later went on to release it.`,

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
  /*
  {
    field: "Game Developement",
    position: "Indie Developer",
    company: "",
    start: "Apr 2022", //date
    end: "", //data or null (means currently working)
    skills: ["Unity", "C#", "C++", "Engine development", "ECS", "OPENGL", "Shader", "Blender"],
    project_types: ["2D Mobile games", "3d Mobile games", "Desktop Games", "Graphics Engine", "Physics Engine"],
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
