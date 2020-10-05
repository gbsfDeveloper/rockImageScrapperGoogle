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

function loadingAnimation(option="add",DOM) {
    if (option.localeCompare("add") === 0) {
        let loadingAnimation = `<div class="animContainer"></div>`;
        DOM.search_images.empty();
        DOM.search_images.prepend(loadingAnimation);
    } 
    else if(option.localeCompare("remove") === 0){
        if ($(".animContainer").length) {
            $(".animContainer").remove();
        }
    }
}

$(document).ready(function(){
    let DOM = {
        search_button:$('#buttonSearch'),
        search_input:$('#inputSearch'),
        search_images:$('#images')
    }

    DOM.search_button.on("click",function(){
        const searchValue = DOM.search_input.val();
        if(searchValue !== ""){
            loadingAnimation("add",DOM);      
            searchImages(searchValue,DOM);
        }
        else{
            DOM.search_images.append(`El campo de texto no puede estar vacio, porfavor escribe el nombre de la roca que quieras buscar`);
        }
    });

    DOM.search_input.on("keyup",function(event){
        if(event.keyCode === 13){
            const searchValue = DOM.search_input.val();
            if(searchValue !== ""){
                loadingAnimation("add",DOM);      
                searchImages(searchValue,DOM);
            }
            else{
                DOM.search_images.append(`El campo de texto no puede estar vacio, porfavor escribe el nombre de la roca que quieras buscar`);
            }
        }
    });
});

