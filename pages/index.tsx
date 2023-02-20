import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as Label from '@radix-ui/react-label';

let socket: io();

export default function Home() {

  //usestate to store url and update it
  const [enteredUrl, setUrl] = useState('');
  const [pTags, setPTags] = useState<any>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    setReload(!reload);
    console.log("reloaded")
  }, [pTags])
  
  const socketInitializer = async () => {
    // await fetch('/api/socket');
    socket = io();
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('scrapping-started', (url: any) => {
      console.log("scrapping started ", url)
    })
    socket.on('p-tags', (msg: any)  => {
      console.log("All the p tag ", msg)
      const newPtags = pTags;
      newPtags.push(msg);

      setPTags(newPtags);
      console.log("pTags ", pTags);
    }) 
  }


  const inputChangeHandler = (e: any) => {
    setUrl(e.target.value)
  }
  const keyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      console.log("going to ... ",enteredUrl)
      socket.emit('input-change', enteredUrl)
    }
  }
  
   

  return (
    <>
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer><input onKeyDown={keyDownHandler} onChange={inputChangeHandler} className="min-w-fit rounded-md text-black" type={"text"} placeholder="Enter the URL..." /></Balancer>
        </motion.h1>
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      {/* <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"> */}
        <ul className="text-black">
          <li>Hiii</li>
          <li>Hiii</li>
          <li></li>
          {pTags.length > 0 && <li>{pTags[0].data[0]}</li>}
        </ul>
        <ul>
          {pTags.map(function (para: any) {
            return (
              // <Card
              //   key={para.link}
              //   title={para.link}
              //   description={para.link}
              //   demo={
              //     sentences(para.data) 
              //     // <p>{"hi"}</p>         
              //   }
              //   // large={large}
              // />
              <li key={para.link}>{para.link}</li>
            )
            })
          }
        </ul>
        

      {/* </div> */}

    </>
  );
}

const sentences = (dataArray: any) => {
  let sentences: JSX.Element[] = [];
  dataArray.forEach((data: any) => {
    sentences.push(<p>data</p>);
  })
  return sentences;
}

const features = [
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={120}
        />
      </a>
    ),
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
];
