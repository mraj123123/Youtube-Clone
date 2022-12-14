let API_KEY = "AIzaSyDXTi3OeS3E1rwtfWfx6vxafPtaifJqzZs"
let maxlimit = 50


let displayVideo = (videoList) => {

  console.log(videoList)
  let container = document.querySelector("#container")
  container.innerHTML = ""
  videoList.forEach(video => {

    const {
      id: { videoId },
      snippet: {
        title, channelTitle, thumbnails: {
          medium: { url },
        },
      },
    } = video

    let div = document.createElement("div")

    let videoThumbnail = document.createElement("img")
    videoThumbnail.src = url

    let channelTitleElement = document.createElement("h3")
    channelTitleElement.textContent = channelTitle

    let videoTitle = document.createElement("p")
    videoTitle.textContent = title


    div.append(videoThumbnail, videoTitle, channelTitle)


    container.append(div)

    div.addEventListener("click", function () {
      var videoId = video.id.videoId;
      localStorage.setItem("videoId", JSON.stringify(videoId))
      window.open("./individualVideo.html", '_blank').focus();
    })

  });
}


var autoCall = async () => {

  try {
    let search = "most popular video in india"
    let url = `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${search}&maxResults=${maxlimit}&type=video&part=snippet`

    var res = await fetch(url);

    var data = await res.json();

    displayVideo(data.items)
  } catch (error) {
    console.log(error)
  }

}
autoCall()




let myfun = async () => {
  try {
    let search = document.querySelector("#search").value
    let url = `https://youtube.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${search}&maxResults=${maxlimit}&type=video&part=snippet`
    let res = await fetch(url)
    let data = await res.json()
    displayVideo(data.items)

  } catch (error) {
    console.log(error)
  }
}
document.querySelector("#search_btn").addEventListener("click", myfun)
