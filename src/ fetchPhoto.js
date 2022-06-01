export default class ApiPhoto{
    constructor(){
this.searchText=``;
this.page=1;
    }
     fetchPhoto(){
       
         return fetch(`https://pixabay.com/api/?key=27737984-087ff865c77ff0cde11c21156&q=${this.searchText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
          .then(r =>{
              if(r.ok){
             return r.json()  
              } else {
                  throw new Error(r.message);
              }
              
          } ).then(data=>{
              this.page+=1;
              return data
            })
      }
      get query (){
          return this.searchText;
      }
      set query (newSearchText){
          return this.searchText = newSearchText;
      }
      resetPage(){
        this.page=1;
      }
}

