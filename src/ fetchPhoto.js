export  function fetchPhoto(name){
        return  fetch(`https://pixabay.com/api/?key=27737984-087ff865c77ff0cde11c21156&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
          .then(r =>{
              if(r.ok){
               return r.json()  
              } else {
                  throw new Error(r.message);
              }
              
          } )
      }

