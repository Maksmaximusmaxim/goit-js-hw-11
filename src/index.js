import {fetchPhoto} from "./ fetchPhoto";

const form = document.querySelector(`form`);
const divGallary = document.querySelector(`.gallery`);
const loadMore = document.querySelector(`.load-more`);

let searchText = ``;
form.addEventListener(`submit`,(e)=>{
    e.preventDefault();
     searchText = e.currentTarget.searchQuery.value.trim();
if(searchText===``){
    return
}

fetchPhoto(searchText).then(photographs =>{
    console.log(photographs.hits);
  const htmlMarkup = photographs.hits.map(p=>{
    console.log(p);
      return  `<div class="photo-card">
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
    
}
)

// .then(console.log)
// .then(photo => console.log(photo))
// .catch(
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
// )
} )


