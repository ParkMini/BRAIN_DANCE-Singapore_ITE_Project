let video = document.querySelector("#cam");
let canvas = document.querySelector(".canvas");
let context = canvas.getContext("2d");
let webcam = false;
const SERVER_URL = "https://localhost:80";

const postRequest = (url, file) => {
  const request = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("image", file); // 이미 변환된 File 객체를 직접 추가
  request.open("POST", url);
  request.send(formData);
};

const constraints = {
  video: true, // 비디오 사용 여부
  audio: false, // 오디오 사용 여부
};

function getVideoStream() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream; // video.srcObject 사용
      webcam = true;
    })
    .catch(function (err) {
      console.error("웹캠에 접근할 수 없습니다:", err);
    });
}

function captureFrame() {
  if (webcam) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");
    let file = dataURLtoFile(imageDataUrl, "webcamImg.png"); // .png 확장자 추가
    postRequest(SERVER_URL, file); // File 객체를 직접 전달
  }
}

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

setInterval(captureFrame, 200); // 예: 5초마다 실행

// HTML onClick 이벤트에서 getVideoStream 호출


async function changeModel(id) {
    let h2 = document.getElementById("selectedModel");
    h2.innerText = id;
    captureFrame(id);
}
