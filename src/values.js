import { GithubIcon, InstagramIcon, LinkedinIcon, TagIcon } from "lucide-react";

const tagicon = <TagIcon color="#ffffff" />;
const giticon = <GithubIcon color="#fff" />;
const linkedinicon = <LinkedinIcon color="#44d" />;
const instaicon = <InstagramIcon color="#e0f" />;

export const developer = {
    name: 'Sunil Sapkota',
    logo: "/images/sunxsapk.svg",
    about: `I am Sunil Sapkota. I am a problem solver by default. I make things happen
    using code. I've found my interest on making games, game engines, tools, web-apps, etc. I
    also occasionally make some 2d and 3d assets for games. Reach out to me if you've got
    something for me.`
};

export const resume = "/files/resume.pdf";

export const links = [
    { to: "/sunxsapk", href: "https://www.github.com/sunxsapk", icon: giticon },
    { to: "/sunxsapk", href: "https://www.linkedin.com/in/sunxsapk", icon: linkedinicon },
    { to: "/sunil_sapkota1224", href: "https://www.instagram.com/sunil_sapkota1224", icon: instaicon },
];

export const portfolio = [
    {
        title: "Everest",
        description: `Everest is a cross-platform Game Engine written from scratch in C++, available with
        a powerful scene editor, high performance ECS, Physics and Rendering Engine, along with post-processing
        support.`,

        highlights: [
            "Cross-platform 2D/3D engine written from scratch in modern C++",
            "Custom ECS, physics, renderer, and post-processing pipeline",
            "Integrated scene editor with run-time Lua scripting",
        ],

        more: [`I was always fascinated with games and their development processes. I used to program simple
        arcade games from scratch in python for fun. Upon involving more with it I was suggested to use Unity
        Engine, and so I did. Learning to make games using engine is not a preferred thing for programmers because
        engines hide the inner beauty of game programming. And thus began my journey of programming a game
        engine from scratch.`,

            `Everest engine is a game engine library under-development written in C/C++. It comes up with a Editor
        which can be used to create, configure and save the scenes for your game. It supports run-time scripting
        using Lua programming language for its easy learning curve and the best performance among all the scripting
        languages.`
        ],

        skills: ["Game Engine Architecture", "Graphics Programming", "Event System Programming", "Runtime Scripting",
            "Memory Management", "Tools programming", "DSA", "Game Development", "C++", "CMake"],
        code: {
            href: "https://github.com/sunxsapk/everest",
            icon: giticon
        },
        thumbnail: "/images/everest.png",
        demo: "https://drive.google.com/file/d/1ayPQqh0hYhKRtoIs8hRwg2NjW2liWOgf/preview"
    },
    {
        title: "trvim",
        description: "trvim - is a text editor, similar in operation to vim, built in C.",

        highlights: [
            "Vim-style modal editor written in C with zero external dependencies",
            "Syntax highlighting, split-screen, and buffer-based file editing",
            "Hand-rolled non-canonical terminal input and rendering",
        ],

        more: [`I started to develop trvim, only because I wanted to see if I can program some features of
        vim. So, I went on to create a simple text editor that uses vim motions. Along the way,
        many features came along because, ...why not? So now It has some cool features like, syntax
        highlighting, split-screen, buffer-based file editing, selection replacement, etc. `
        ],

        skills: ["Text Editor Programming", "Non-Canonical Input Handling",
            "Data Structures & Algorithms", "C", "Syntax Highlighter Programming", "CMAKE",
            "Memory Management", "System Programming"],
        link: {
            href: "https://github.com/sunxsapk/trvim/releases",
            iconSrc: tagicon
        },
        code: {
            href: "https://github.com/sunxsapk/trvim",
            icon: giticon
        },
        thumbnail: "/images/trvim.png",
        demo: "https://drive.google.com/file/d/1mwa9bAGj4IGuG-X-l33Db7iyxbTjwJD7/preview",
    },
    {
        title: "Endless",
        description: "An Endless flight game with dynamically generated environment with thrilling gameplay.",

        highlights: [
            "Procedurally generated terrain using a semi-wave-function-collapse approach",
            "Published on Google Play Store",
            "Immersive 3D audio designed for headphone playback",
        ],

        more: [`It is a 3D endless flight game, that has dynamic environment each time you play, thanks
        to power of procedural generation. It uses semi-wave function collapse algorithm to make the terrain
        continously. I found that it is good to play this game with headphones on. It is highly
        immersive that way.`
        ],

        skills: ["Unity", "C#", "Blender", "3D Modelling", "Procedural Generation"],
        link: {
            href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.Endless",
            iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        },
        code: {
            href: "https://github.com/sunxsapk/Endless",
            icon: giticon
        },
        thumbnail: "/images/EndLess.png",
        demo: "https://drive.google.com/file/d/1HTplTROBPICTkVatyNcTnFtPCTMq4MF4/preview",
    },
    {
        title: "Physx-2D",
        description: "A game/simulation engine library with custom physics and Entity Component System with great performance.",

        highlights: [
            "Standalone 2D engine — no third-party rendering or physics dependencies",
            "Instanced rendering pipeline for low draw-call overhead",
            "Custom ECS, asset loading, and platform abstraction layer",
        ],

        more: [`Physx-2D is a game/physics engine library I created for C/C++. It does not sit on top of
        any other libraries. It handles everything from creation & management of windows, rendering Sprites,
        textures and shaders loading - to handling physics-system as well as managing its own Entity
        Component System. It has optimized rendering system which utilizes instanced rendering for reducing
        draw-calls.`,

            `It is developed to be available across different platforms and also provides some
        platform-specific defination to make it easy for developers. It also provides its own logging system for debugging
        which erases all debug statements during release build, thus making faster builds. It has many other
        features which you can check out on its github repo.`
        ],

        skills: ["Physics Engine Programming", "Graphics Engine Programming", "OpenGL", "GLSL",
            "Entity Component System(ECS) Design]", "Shared Library Building", "C/C++", "CMAKE",
            "Data Structure & Algorithms", "Texture & Shaders Loading", "Compute Shaders"],
        code: {
            href: "https://github.com/sunxsapk/Physx-2D",
            icon: giticon
        },
        thumbnail: "/images/physx2d.png",
        demo: "https://drive.google.com/file/d/1MyHf1fhyxFdGrWF7u4Z8MSKW1H6eX5Sv/preview",
    },
    {
        title: "tr-ECS",
        description: "A fast and easy to use Entity Component System in C++.",

        highlights: [
            "Archetype-based ECS with balanced memory-to-performance trade-off",
            "Header-light public API for easy drop-in integration",
        ],

        more: [`trecs - is a simple and easy to use Entity Component System library written in C++. It
          uses archetype based approach to manage components, which in turn provides balanced memory-to-performance
          ratio.`],

        skills: ["Entity Component System", "C++", "Memory Management", "Data Structures & Algorithm"],
        code: {
            href: "https://github.com/sunxsapk/tr-ecs",
            icon: giticon
        },
        thumbnail: "/images/trecs.png",
    },
    {
        title: "libhash",
        description: "A C-library for hashmaps, with easy to use API.",

        highlights: [
            "Drop-in C hashmap library using FNV-1a",
            "Minimal, intuitive API — clone and use",
        ],

        more: [`libhash is a easy to use c-library for hashmaps. It uses FNV-1a hash algorithm under the
    hood. It is made easy to use and very intuitive API. Simply clone the library into your project
    and use it.`],

        skills: ["C", "Memory Management", "Data Structures & Algorithm"],
        link: {
            href: "https://github.com/sunxsapk/libhash/releases/tag/libhash-v0.0.1",
            iconSrc: tagicon
        },
        code: {
            href: "https://github.com/sunxsapk/libhash",
            icon: giticon
        },
        thumbnail: "/images/libhash.png",
    },
    {
        title: "Edge Of Space",
        description: "An arcade classic with a fight at the edge of space.",

        highlights: [
            "2D arcade shooter published on Google Play Store",
            "Custom pixel art assets created in Aseprite",
        ],

        more: [`It is a 2D game that I made for me to pass some time and later went on to release it.`],

        skills: ["Unity", "C#", "Aseprite", "2D Pixel Art", "Procedural Generation"],
        link: {
            href: "https://play.google.com/store/apps/details?id=com.FourSevenGames.EdgeOfSpace",
            iconSrc: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        },
        code: {
            href: "https://github.com/sunxsapk/EdgeOfSpace",
            icon: giticon
        },
        thumbnail: "/images/edgeofspace.png",
        demo: "https://drive.google.com/file/d/1kIa2TaqhWo2GvgFqES4DHDYwiVY4HNU1/preview",
    },
];

export const experience = [
    {
        field: "Game Developement",
        position: "Lead Game Developer",
        company: "Yarsa Labs",
        link: "https://www.yarsalabs.com",
        start: "May 2025",
        end: "",
        skills: ["Unity", "C#", "C++", "Game development", "Assets Development", "UI System", "Bugs Fixing"],
        project_types: ["2D board and card games", "Integration of services in game", "UI Systems", "Game Design", "Cross-game module development"],
    },
    {
        field: "Frontend Developement",
        position: "Software Developer",
        company: "MarginTop Solutions",
        link: "https://www.margintopsolutions.com",
        start: "Sep 2023",
        end: "May 2025",
        skills: ["React", "Nextjs", "Javascript", "THREEjs", "Fiberjs", "Konvajs", "API integration"],
        project_types: ["Dynamic Web-apps", "2D configurators", "3D Configurators", "Company Portfolio Sites"],
    },
    {
        field: "Robotics and Web Developement",
        position: "Executive Member",
        company: "Robotics Club, Pashchimanchal Campus",
        link: "https://robotics.wrc.edu.np",
        start: "Apr 2022",
        end: "Apr 2024",
        volunteer: true,
        skills: ["Embedded System Programming", "C/C++", "Python", "React", "Nextjs", "Javascript"],
        project_types: ["Programming Autonomous Systems", "CNC-programming", "Custom CNC-path editor"],
    },
];

export const games = [
    {
        id: "space-shooter",
        title: "Space Shooter",
        blurb: "Classic vertical-scroll arcade. Lasers, waves, and explosions.",
        accent: "primary",
        controls: "Arrow keys / drag to move · Space / tap to fire",
    },
    {
        id: "tetris",
        title: "Tetris",
        blurb: "The all-time classic. Stack, clear, level up.",
        accent: "secondary",
        controls: "← → to move · ↑ rotate · ↓ soft drop · Space hard drop",
    },
    {
        id: "2048",
        title: "2048",
        blurb: "Swipe and merge tiles until you reach 2048.",
        accent: "primary",
        controls: "Arrow keys or swipe",
    },
];
