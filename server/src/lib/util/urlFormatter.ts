const dotComCheck = (urlString: String) => {
  if(urlString.match('.com') !== null) {
    const formattedURLStringDotCom = urlString.split('/');
    console.log('format-conditional worked-dotcom!', formattedURLStringDotCom);
    console.log('format-conditional worked-dotcom!', formattedURLStringDotCom[0]);
    return formattedURLStringDotCom[0]
  }
}

const httpsCheck = (urlString: String) => {
  if(urlString.match('https://') !== null) {
    const formattedURLStringHttps = urlString.split('https://');
    console.log('format-conditional worked-https!', formattedURLStringHttps);
    console.log('format-conditional worked-https!', formattedURLStringHttps[1]);
    return formattedURLStringHttps[1]
  }
}


const getDomainFromUrlString = (urlString: String) => {
  const urlStringCheck = urlString.match('https://')
  console.log('urlStringCheck:::', urlStringCheck)

  dotComCheck(urlString);
  httpsCheck(urlString);

//   if(urlString.match('https://') !== null) {
//     const formattedURLString = urlString.split('https://');
//     console.log('format-conditional worked-https!', formattedURLString);
//     console.log('format-conditional worked-https!', formattedURLString[1]);
//     return formattedURLString[1]
//   }
//   if(urlString.match('.com') !== null) {
//     const formattedURLStringDotCom = urlString.split('/');
//     console.log('format-conditional worked-dotcom!', formattedURLStringDotCom);
//     console.log('format-conditional worked-dotcom!', formattedURLStringDotCom[0]);
//     return formattedURLStringDotCom[0]
// }
}

export { getDomainFromUrlString };
