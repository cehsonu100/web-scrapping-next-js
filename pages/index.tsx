import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion, AnimatePresence } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as Label from '@radix-ui/react-label';
import ScrappedSite from "../components/scrappedSite";
import urlExist from "url-exist"

let socket: any;

export default function Home() {

  //usestate to store url and update it
  const [enteredUrl, setUrl] = useState('');
  const [enteredUrlForSingleScrap, setUrlForSingleScrap] = useState('');
  const [pTags, setPTags] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    async function sleep() {
      await new Promise(resolve => setTimeout(resolve, 4000));
    }
    sleep().then(() => {
      setRefresh(!refresh);
    });
    console.log("reloaded")
  }, [refresh])
  
  const socketInitializer = async () => {
    await fetch('/api/socket');
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
      if(msg.data.length > 0) {
        newPtags.push(msg);
        setPTags(newPtags);
        setRefresh(!refresh);
        console.log("pTags ", pTags);
      }
      
    }) 
  }


  const inputChangeHandler = (e: any) => {
    setUrl(e.target.value)
  }
  const inputChangeHandlerSingleScrap = (e: any) => {
    setUrlForSingleScrap(e.target.value)
  }
  const keyDownFullSiteScrap = async (e: any) => {
    if (e.key === 'Enter') {
      // const isValidUrl = await urlExist(enteredUrl)
      // if(!isValidUrl) {
      //   alert("Please type valid url")
      //   return;
      // }
      console.log("going to ... ",enteredUrl)
      socket.emit('full-site-scrap', enteredUrl)
    }
  }
  const keyDownSingleSiteScrap = async (e: any) => {
    if (e.key === 'Enter') {
      // const isValidUrl = await urlExist(enteredUrlForSingleScrap)
      // if(!isValidUrl) {
      //   alert("Please type valid url")
      //   return;
      // }
      console.log("going to ... ",enteredUrlForSingleScrap)
      socket.emit('single-site-scrap', enteredUrlForSingleScrap)
    }
  }
  
   

  return (
    <div className="bg-white">
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
        <motion.div
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            <input type="text" onKeyDown={keyDownSingleSiteScrap} onChange={inputChangeHandlerSingleScrap} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL for single site scrapping..." />
            <input type="text" onKeyDown={keyDownFullSiteScrap} onChange={inputChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL for full site scrapping..." />
          </Balancer>
        </motion.div>
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="pl-8 my-10 w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        
        {/* <ul className="list-disc hover:list-inside divide-y divide-dashed"> */}
          {/* <AnimatePresence> */}
            {pTags.map(function (idx: number, para: any) {
              const contents = {link: para.link, data: para.data}; 
              return (
                
                  <ScrappedSite contents={contents} key={idx}/> 
                
              )
              })
            }
          {/* </AnimatePresence> */}
        {/* </ul> */}
        
      </div>

    </div>
  );
}



// const sentences = (dataArray: string[]) => {
//   let sentences: JSX.Element[] = [];
//   dataArray.forEach((data: any) => {
//     sentences.push(<p>{data}</p>);
//   })
//   return sentences;
// }

// const features = [
//   {
//     title: "Beautiful, reusable components",
//     description:
//       "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
//     large: true,
//   },
//   {
//     title: "Performance first",
//     description:
//       "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
//     demo: <WebVitals />,
//   },
//   {
//     title: "One-click Deploy",
//     description:
//       "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
//     demo: (
//       <a href={DEPLOY_URL}>
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           src="https://vercel.com/button"
//           alt="Deploy with Vercel"
//           width={120}
//         />
//       </a>
//     ),
//   },
//   {
//     title: "Built-in Auth + Database",
//     description:
//       "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
//     demo: (
//       <div className="flex items-center justify-center space-x-20">
//         <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
//         <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
//       </div>
//     ),
//   },
//   {
//     title: "Hooks, utilities, and more",
//     description:
//       "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
//     demo: (
//       <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
//         <span className="font-mono font-semibold">useIntersectionObserver</span>
//         <span className="font-mono font-semibold">useLocalStorage</span>
//         <span className="font-mono font-semibold">useScroll</span>
//         <span className="font-mono font-semibold">nFormatter</span>
//         <span className="font-mono font-semibold">capitalize</span>
//         <span className="font-mono font-semibold">truncate</span>
//       </div>
//     ),
//   },
// ];
