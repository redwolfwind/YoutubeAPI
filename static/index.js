var search = document.querySelector("#search")
var form = document.querySelector("form")
var reponseArea = document.querySelector(".results")
var button = document.querySelector("button")


function onClientLoad(){
    gapi.client.setApiKey("AIzaSyDUqjAD2Qmnvdv9xx0PsCykQVzCFhwBv_o")
    gapi.client.load("youtube","v3",onyoutubeload)
    console.log("WORRRK")
}
window.onload = onClientLoad


function onyoutubeload(){
    
    console.log("load")
    gapi.client.setApiKey("AIzaSyDUqjAD2Qmnvdv9xx0PsCykQVzCFhwBv_o")
    // form.addEventListener("submit",search)
    console.log("search")
    var request = gapi.client.youtube.search.list({
        part : "snipped",
        maxResults: 10,
        queue : search.value
    
    })
    console.log(request)
    request.execute(function (resp){
        while(reponseArea.firstChild){
            reponseArea.removeChild(reponseArea.firstChild)
        }
        var results = resp.items
        console.log(resp.result)
        for(let i = 0; i < results.length; i++){
            displayVideo(results[i], i)
        }
    })}

function search(e){
    e.preventDefault()
    console.log("search")
    var request = gapi.client.youtube.search.list({
        part : "snipped",
        maxResults: 10,
        queue : search.value
    
    })
    request.execute(function (resp){
        while(reponseArea.firstChild){
            reponseArea.removeChild(reponseArea.firstChild)
        }
        var results = resp.items
        for(let i = 0; i < results.length; i++){
            displayVideo(results[i], i)
        }
    })
    
}

function displayVideo(result,index){
    var vid = document.createElement("div")
    console.log("Display Video")
    var vidid = "vid" + index
    vid.id = vidid
    reponseArea.appendChild(vid)
    var player = new YT.Player(vidid,{
        height : "360",
        width: "480",
        videoId: results.id.videoId,
        events: {
            "onReady": ready,
        }
    })
}

function ready(e) {
    console.log("ready")
    var myId = e.target.a.id
    console.log(e.target.a)
    var duration = e.target.getDuration()
    if (duration == 0){
        reponseArea.removeChild(e.target.a)
    }
    else{
        console.log("Video" + myId + "Is ready to play")
    }
}
