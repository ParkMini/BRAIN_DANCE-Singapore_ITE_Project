let video = document.querySelector("#cam");

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
      })
      .catch(function(err) {
        console.error('웹캠에 접근할 수 없습니다:', err);
      });
}

addEventListener("DOMContentLoaded", getVideoStream);

