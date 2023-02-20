import * as cheerio from 'cheerio';
import { getFullUrl, getHostname } from './helperFunctions';
const axios = require('axios');
const fs = require('fs'); 
import urlExist from "url-exist"

const visitedLink = [];
let linksQueue;

export async function scrape(url, socket) {
  console.log("hiiiii");
  url = 'https://csudh.edu'
  const isValidUrl = await urlExist(url)
  if(!isValidUrl) {
    return ;
  }
  const response = await axios.get(url);
  const body = response.data; 
  const $ = cheerio.load(body); // Load HTML data and initialize cheerio 
  linksQueue = getLinks($);
  if(linksQueue.length > 0) 
    await bfsVisit(getHostname(url), linksQueue, socket);
  // return links;
}

async function bfsVisit(host, linksQueue, socket) {
  while(linksQueue.length > 0) {
    const link = linksQueue.shift();
    console.log("In bfsVisit", link.href)
    if(!visitedLink.includes(link.href)) {
      visitedLink.push(link.href);
      console.log("Site is not visited previusly", link.href)
      socket.emit('scrapping-started', link.href);
      console.log(link.href);

      const allPTags = await getPTagsText(link);
      console.log(allPTags);
      socket.emit('p-tags', {link: link.href, data: allPTags});

      const isValidUrl = await urlExist(link.href)
      if(!isValidUrl) 
        continue
      
      const response = await axios.get(link.href);
      const body = response.data; 
      const $ = cheerio.load(body); // Load HTML data and initialize cheerio 
      linksQueue = linksQueue.concat(getLinks($));
    }

  }
}




function getLinks($) {
  const links = $('a');
  const linksData = []

  // loop through all the anchors and get the text
  links.each((index, el) => {
    const data = {
      text: $(el).text(),
      href: getFullUrl('https://csudh.edu', $(el).attr('href'))
    }
    if(data.href && data.href.length > 0)
      linksData.push(data);
  })
  console.log("links data in getLinks",linksData);
  return linksData;
}

// Get p tags and text from a page
async function getPTagsText(link) {
  const isValidUrl = await urlExist(link.href)
  if(!isValidUrl) return [];
  const response = await axios.get(link.href);
  const body = response.data;
  const $ = cheerio.load(body); // Load HTML data and initialize cheerio

  const pTags = $('p');
  const pTagsTextList = []

  // loop through all the anchors and get the text
  pTags.each((index, el) => {
    const text = $(el).text();
    if(text.length > 60)
      pTagsTextList.push(text);
  })
  return pTagsTextList;
}


    



const getPokemons = ($) => { 
	// Get all list items from the unodered list with a class name of 'products' 
	const pokemons = $('.products li'); 
	const pokemonData = []; 
	// The 'each()' method loops over all pokemon list items 
	pokemons.each((index, el) => { 
		// Get the image, name, and price of each pokemon and create an object 
		const pokemon = {} 
 
		// Selector to get the image 'src' value of a pokemon 
		pokemon.img = $(el).find('a > img').attr('src'); 
		pokemon.name = $(el).find('h2').text(); // Selector to get the name of a pokemon 
		pokemon.price = $(el).find('.amount').text(); // Selector to get the price of a pokemon 
		pokemonData.push(pokemon) 
	}) 
 
	// Create a 'pokemon.json' file in the root directory with the scraped pokemonData 
	fs.writeFile("pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => { 
		if (err) { 
			console.error(err); 
			return; 
		} 
		console.log("Data written to file successfully!"); 
	}); 
} 