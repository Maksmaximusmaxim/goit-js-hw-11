import ApiPhoto from "./ fetchPhoto";
import Notiflix from 'notiflix';

const form = document.querySelector(`form`);
const divGallary = document.querySelector(`.gallery`);
const loadMore = document.querySelector(`.load-more`);
const Photo = new ApiPhoto();
const hOne = document.querySelector(`h1`);
console.log(hOne)

function deleteBtn(){
  loadMore.classList.add(`is-hidden`)
}
function recoveryBtn(){
  loadMore.classList.remove(`is-hidden`)
}

function clearContent (){
  divGallary.innerHTML=``;
}

deleteBtn();

form.addEventListener(`submit`,(e)=>{
    e.preventDefault();
    hOne.innerHTML=``;
    deleteBtn();
     
    
     Photo.query = e.currentTarget.searchQuery.value.trim();
     if(Photo.searchText===``){
     return Notiflix.Notify.info('Видите запрос');
      
    }
     Photo.resetPage();
    clearContent ();
     Photo.fetchPhoto()

     .then(photographs =>{
          console.log(photographs);
          if(photographs.hits.length == 0){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            
          }
        const htmlMarkup = photographs.hits.map(p=>{
          console.log(p);
            return  `<div class="photo-card ">
              <img src="${p.webformatURL}" alt="${p.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  ${p.likes}
                </p>
                <p class="info-item">
                  <b>Views</b>
                  ${p.views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${p.comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${p.downloads}
                </p>
              </div>
            </div>`
          }).join(``);
          divGallary.insertAdjacentHTML(`afterbegin`, htmlMarkup);
          recoveryBtn();
       })
       

} )

loadMore.addEventListener(`click`,()=>{

  deleteBtn()
  Photo.fetchPhoto()
  
  .then(photographs =>{
        console.log(photographs.hits);
      const htmlMarkup = photographs.hits.map(p=>{
        console.log(p);
          return  `<div class="photo-card ">
            <img src="${p.webformatURL}" alt="${p.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${p.likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${p.views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${p.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${p.downloads}
              </p>
            </div>
          </div>`
        }).join(``);
        recoveryBtn();
        divGallary.insertAdjacentHTML('beforeend', htmlMarkup);
        console.log(photographs);
        if(photographs.hits.length === 0){
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
          deleteBtn();
          hOne.innerHTML=`We're sorry, but you've reached the end of search results.`
          }
})


}) 




