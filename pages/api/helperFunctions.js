export function getFullUrl(url, str) {
  const hostname = getHostname(url);

  if(!str || str === '' || str.startsWith('#')) return null;
  if (str.startsWith("http") || str.startsWith("https") || str.startsWith("www")) {
    if(getHostname(str) !== getHostname(url))
      return null;
    return str;
  } 
  else if(str.startsWith(getHostname(url))) {
    return getUrlProtocol(url) + "//" + hostname + str;
  }
  else if (str.startsWith("/")) {
    return getUrlProtocol(url) + "//" + hostname + str;
  } 
  else {
    return getUrlProtocol(url) + "//" + hostname + str;
  }
}

export function getHostname(url) {
  console.log("host name url", new URL(url).hostname)
  return new URL(url).hostname;
}

export function getUrlProtocol(url) {
  return new URL(url).protocol;
}
