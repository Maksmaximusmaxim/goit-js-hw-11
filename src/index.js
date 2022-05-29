import debounce from 'lodash.debounce';
import './css/styles.css';
import {fetchCountries} from "./fetchCountries" ;
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`#search-box`);
const ul = document.querySelector(`.country-list`);
const div = document.querySelector(`.country-info`);

// console.log(input)
let textValue = ``;

function cleatCountry(){
    ul.innerHTML=``;
    div.innerHTML=``;
}


input.addEventListener(`input`,debounce((e)=>{
    textValue = e.target.value.trim();
    cleatCountry();
    if(!textValue){
    return
    }
    fetchCountries(textValue).then(listOfCountries => {
        console.log(listOfCountries)
        if(listOfCountries.length > 10){
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);  
        } else if(listOfCountries.length <= 10 && listOfCountries.length >= 2){ 
            console.log(`все ок`);
            listOfCountries.map(c => {const codeHTML = `<li class="ul__item">
             <div class="ul__imgBlock"><img src="${c.flags.svg}" width="20" height="15" /></div>
            <p>${c.name.common}</p>
          </li>`;
           ul.insertAdjacentHTML(`afterbegin`, codeHTML)
           console.log(c)
        });
       
        }else if  (listOfCountries.length ===1){
            listOfCountries.map(c =>{
             
                  console.log(Object.values(c.languages) )
              
               const codeHTMLOneCard =  `<ul>
                <li class="ul__itemOneCard"><div><img src="${c.flags.png}" alt="страна" width="20" height="15"></div><p class="ul__tittle">${c.name.common}</p></li>
                <li><p class="ul__text" ><span class="span">Capital:</span>${c.capital}</p></li>
                <li><p class="ul__text"><span class="span">Population:</span>${c.population}</p></li>
                <li><p class="ul__text"><span class="span">Languages:</span>${Object.values(c.languages).join(`,`)}</p></li>
              </ul> `
                div.insertAdjacentHTML(`afterbegin`, codeHTMLOneCard);
                
            })
            
            console.log(div);
console.log(listOfCountries.length);
        }
        
        
    }).catch(Error)

function Error(){
    Notiflix.Notify.failure("Oops, there is no country with that name");
}
    
}, DEBOUNCE_DELAY )  ) 




