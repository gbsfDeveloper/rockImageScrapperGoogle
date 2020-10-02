function searchImages(value,DOM){
    $.get(`http://localhost:4000/image/${value}`,(data)=>{
        DOM.search_images.empty();
        for (const image of data) {
            var imgElement = $(
                `<div class="imgcontainer">
                    <img src= "${image}" alt="">
                </div>`
            );
            DOM.search_images.append(imgElement);
        }
    });
}

$(document).ready(function(){
    let DOM = {
        search_button:$('#buttonSearch'),
        search_input:$('#inputSearch'),
        search_images:$('#images')
    }

    DOM.search_button.on("click",function(){
        const searchValue = DOM.search_input.val();
        searchImages(searchValue,DOM);
    });

    DOM.search_input.on("keyup",function(event){
        if(event.keyCode === 13){
            const searchValue = DOM.search_input.val();
            searchImages(searchValue,DOM); 
        }
    });
});