let video = document.querySelector("#cam");
let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');
let webcam = false
let SERVER_URL = "https://localhost:80";

// HTTP GET REQUEST
function getRequest(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url);

        request.onload = () => {
            if (request.status === 200) {
                resolve(request.responseText); // 성공 시 응답 텍스트를 리턴
            } else {
                reject(new Error(request.statusText)); // 실패 시 오류를 리턴
            }
        };

        request.onerror = () => {
            reject(new Error("Network Error")); // 네트워크 오류 처리
        };

        request.send();
    });
}

// HTTP POST REQUEST
const postRequest = (url, file) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('image', file); // 이미 변환된 File 객체를 직접 추가
    request.open("POST", url);
    request.send(formData);
}

// WEBCAM SETTING
const constraints = {
    video: true,  // 비디오 사용 여부
    audio: false  // 오디오 사용 여부
};

// GET WEBCAM
function getVideoStream() {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        video.srcObject = stream; // video.srcObject 사용
        console.log(stream);
        webcam = true;
      })
      .catch(function(err) {
        console.error('웹캠에 접근할 수 없습니다:', err);
      });
}

// SITE IS LOADED
document.addEventListener('DOMContentLoaded', getVideoStream);

// CAPTUREFRAME AND SENDBACKEND SERVER
async function captureFrame() {
    if(webcam) {
        let id = "Object Detection";
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        let file = dataURLtoFile(imageDataUrl, "webcamImg.png"); // .png 확장자 추가
        postRequest(SERVER_URL, file); // File 객체를 직접 전달
        getRequest(SERVER_URL +"/"+ id)
        .then(response => {
            // debug code
            console.log(response)
            
            // setInterval(() => {
            //     canvas.srcObcject = response;
            // }, 200)
        })
        .then(e => {
            console.err("has error:", e)
        })
    }
}

// CAPTUREFRAME AND SENDBACKEND SERVER
/**
 * 
 * @param {*} id 
 */
async function captureFrame(id) {
    if(webcam) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        let file = dataURLtoFile(imageDataUrl, "webcamImg.png"); // .png 확장자 추가
        postRequest(SERVER_URL +"/"+ id, file); // File 객체를 직접 전달
        getRequest(SERVER_URL +"/"+ id)
        .then(response => {
            // debug code
            console.log(response)

            // setInterval(() => {
            //     canvas.srcObcject = response;
            // }, 200)
        })
        .then(e => {
            console.err("has error:", e)
        })
    }
}

// IMG URL TO FILE OBJECT
function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

setInterval(captureFrame, 200);

// CHANGE MODEL FUNCTION
async function changeModel(id) {
    let h2 = document.getElementById("selectedModel");
    h2.innerText = id;
    captureFrame(id);
}
