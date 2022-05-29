export function fetchCountries(name){
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(respounce=>{
        if(respounce.ok){
          return respounce.json();
        }  else{
          throw new Error(respounce.message);
        }
        
        })
}

