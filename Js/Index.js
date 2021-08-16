console.log("This is on Project06");
let customRequest = document.getElementsByClassName('customRequest')[0];
let jsonRequest = document.getElementById('jsonRequest');
customRequest.style.display="none";
jsonRequest.style.display="none";

let idNo = 0;



let createElement = ()=>{
    let div = document.createElement('div');
    div.id =`custom${idNo+1}`;
    div.className = 'customContents'
    idNo++;
    return div;
}

let getJsonContent = ()=>{
    let data = {};
    data = document.getElementById('jsonContent').value
    return data;
    }

let getCustomContent = ()=>{
    let customContents = document.getElementsByClassName('customContents');
    let data = {};
    for(let element of customContents){
        data[element.querySelector('input[name="CustomContentName"]').value]=element.querySelector('input[name="CustomContentData"]').value;
    }
    
    data = JSON.stringify(data);
    return data;
}

document.getElementById('addBtn').addEventListener('click',()=>{
    let html =     `<input name="CustomContentName" placeholder=" Enter Content Name ${idNo+2}" type="text">
                    <input name="CustomContentData" placeholder=" Enter Content Data ${idNo+2}" type="text">
                    <input type="button" value="-" class="deleteBtn" >`
    let element = createElement();
    element.innerHTML = html;
    customRequest.appendChild(element);
    Array.from(document.getElementsByClassName('deleteBtn')).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    })
})


let custom = document.getElementById('custom');
let json = document.getElementById('json');
custom.addEventListener('click',()=>{
     customRequest.style.display='block';
     customRequest.style.display='flex';
     jsonRequest.style.display='none';
})
json.addEventListener('click',()=>{
    jsonRequest.style.display="block";
    jsonRequest.style.display="flex";
    customRequest.style.display="none";
})

let subBtn = document.getElementById('subBtn');
subBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let url = document.getElementById('url').value;
    
    
    let get = document.getElementById('get');
    let post = document.getElementById('post');
    if(post.checked){
        let data;
        if(document.getElementById('json').checked){
             data = getJsonContent();
        }
        else if(document.getElementById('custom').checked){
            data = getCustomContent();
        }
        fetch(url,{
            method: "POST",
            body: data,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response)=>{
            return response.text()
        }).then((text)=>{document.getElementById('responsePrism').innerText = text
            Prism.highlightAll();
            });
        }
    else if(get.checked){
        fetch(url,{
            method:'GET'
        }).then((response) =>{
            return response.json()
        }).then((json)=>{document.getElementById('responsePrism').innerText = JSON.stringify(json)
        Prism.highlightAll();
        });
    }
    
})