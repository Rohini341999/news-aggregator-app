//this is the url declared.
let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=6fca41f1ee4846f9bac8555d7b53dcae";


let prepareHTMLFromData = function(dataArr){
    let finalHtml = '';
    if(dataArr.length == 0 ){
        let text = "No article was found based on the search.";
        let str = `<div class="not-found">${text}</div>`;
        finalHtml = finalHtml + str;
        document.getElementsByClassName("not-found").innerHTML = finalHtml;
    }
    for (let i=0;i<dataArr.length;i++){
        console.log(dataArr[i]);
        let htmlString = `
        <li class="article">
            <img class="article-img" src="${dataArr[i]["urlToImage"]}">
            <h2 class="article-title">${dataArr[i]["title"]}</h2>
            <p class="article-description">${dataArr[i]["description"]}</p>
            <span class="article-author">${dataArr[i]["author"]}</span>
            
        </li> 
        `;
        // console.log(htmlString);
        finalHtml = finalHtml + htmlString;
    }
    
    // console.log(finalHtml);
    document.getElementById("news-articles").innerHTML = finalHtml;
}

//this whole code basically works as for loop to extract contents out of the contents. 
//in this we have a callApi function which is taking url as a parameter.
let callApi = function(url){
    //in this we have fetched the promise .
let urlfetched = fetch(url);
    //in this we have used parser to parse the data in json format and stored in response function.
urlfetched.then(function (response){
    //here we print on console the contents of response function.
    // console.log(response);
    //now we specifically store the data in response 
    response = response.json();
    //response gives it to responseInner function.
    response.then(function (responseInner){
        //where we print print responseInner contents in console.
        // console.log(responseInner);
        //here we have a condition to check if we have articles in response.if true we give them to a different function named prepareHTMLFromData. 
        if(responseInner.articles){
            //a new function again.
            prepareHTMLFromData(responseInner.articles);
        }
    })
})
}
//here we lastly call callApi and pass the url parameter.
callApi(url);
let searchtext = function(keyword){
    let searchUrl = url + `&q=${keyword}`; 
    // console.log(searchUrl);
    // console.log(keyword);
    callApi(searchUrl);
}

let EnterSearch  = function(){
    if(event.keyCode == 13){
        let searchInput = document.getElementById("search");
        // console.log(searchInput);
        searchtext (searchInput.value);
        return;
}
}
