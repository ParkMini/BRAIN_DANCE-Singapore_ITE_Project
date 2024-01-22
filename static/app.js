// 페이지 초기화 함수: 첫 번째 체험을 기본으로 선택하고 버튼에 이벤트 리스너를 추가함
const selectAIPageInit = () => {
  // 첫 번째 체험을 기본으로 선택
  updateSelectedExperience(document.querySelector("#experience_0"));

  // 각 '자세히 알아보기' 버튼에 이벤트 리스너 추가
  document
    .querySelectorAll("#select_experience .button button")
    .forEach((button) =>
      button.addEventListener("click", handleSelectExperience)
    );
};

// 체험 선택 이벤트 핸들러: 사용자가 선택한 체험을 처리함
const handleSelectExperience = (event) => {
  // 선택된 항목의 부모 요소(ul) 찾기 및 업데이트
  const selectedUl = event.target.closest("ul");
  updateSelectedExperience(selectedUl);
};

// 선택된 체험 업데이트 함수: 선택된 체험의 정보를 업데이트하고 표시함
const updateSelectedExperience = (selectedUl) => {
  const selectedExperience = {
    title: selectedUl.querySelector(".title").textContent,
    imageSrc: selectedUl.querySelector(".image img").src,
    imageWidth: selectedUl.querySelector(".image img").width,
    imageHeight: selectedUl.querySelector(".image img").height,
    href: "",
    content: "",
  };

  // 선택된 체험에 따라 href 및 내용 속성 변경
  switch (selectedUl.id) {
    case "experience_0":
      selectedExperience.href = "./image_classification";
      selectedExperience.content =
        "100개의 카테고리로 분류되는 이미지를 추론하는 AI를 체험해 봅시다.";
      break;
    case "experience_1":
      selectedExperience.href = "./object_detection";
      selectedExperience.content =
        "웹 캠을 활용하여 실시간으로 객체를 인식하는 AI를 체험해 봅시다.";
      break;
    case "experience_2":
      selectedExperience.href = "./pose_detection";
      selectedExperience.content =
        "웹 캠을 활용하여 실시간으로 객체의 포즈를 인식하는 AI를 체험해 봅시다.";
      break;
    case "experience_3":
      selectedExperience.href = "./style_change";
      selectedExperience.content =
        "웹 캠을 활용하여 실시간으로 스타일이 변환되는 AI를 체험해 봅시다.";
      break;
  }

  // 현재 selected_experience에 있는 내용 업데이트
  const currentSelected = document.querySelector("#selected_experience");
  currentSelected.querySelector("h2").textContent = selectedExperience.title;
  currentSelected.querySelector("h3").textContent = selectedExperience.content;

  const currentImage = currentSelected.querySelector("img");
  currentImage.src = selectedExperience.imageSrc;
  currentImage.width = selectedExperience.imageWidth;
  currentImage.height = selectedExperience.imageHeight;

  document
    .querySelector("#go_experience")
    .setAttribute("href", selectedExperience.href);

  // 모든 버튼 라벨 업데이트
  updateButtonLabels(selectedUl);
};

// 버튼 라벨 및 상태 업데이트 함수: 모든 버튼의 라벨과 활성/비활성 상태를 업데이트함
const updateButtonLabels = (selectedUl) => {
  // 모든 버튼에서 '자세히 알아보기'로 변경 및 클래스 변경
  document
    .querySelectorAll("#select_experience .button button")
    .forEach((button) => {
      button.textContent = "자세히 알아보기";
      button.disabled = false; // 버튼 활성화
      button.parentElement.parentElement.classList.remove("selected");
    });

  // 선택된 체험에 '선택됨' 추가 및 클래스 변경
  const selectedButton = selectedUl.querySelector(".button button");
  selectedButton.textContent = "선택됨";
  selectedUl.classList.add("selected");
};

function image_classificationInit() {
  const fileUpload = document.getElementById("file-upload");
  const getResultButton = document.getElementById("get-ai-result");
  const resultDiv = document.getElementById("result");
  const selectImageDiv = document.getElementById("selectImage");

  // 초기 버튼 상태 설정
  getResultButton.disabled = !fileUpload.files.length;

  // 파일 업로드 필드의 상태 변경에 따라 버튼 활성화/비활성화
  fileUpload.addEventListener("change", () => {
    getResultButton.disabled = !fileUpload.files.length;
  });

  // 결과 버튼 클릭 이벤트
  getResultButton.addEventListener("click", () => {
    if (fileUpload.files.length) {
      const file = fileUpload.files[0];
      const reader = new FileReader();
      const inferredObjectName = "[추론한 오브젝트 명]"; // 추후 AI 모델 결과로 교체

      reader.onload = function (e) {
        // 이미지 업로드 영역 숨김
        selectImageDiv.style.display = "none";

        // 업로드된 이미지 출력
        const image = new Image();
        image.src = e.target.result;
        image.style.maxWidth = "500px"; // 이미지 크기 조정
        image.style.display = "block"; // 이미지 중앙 정렬
        image.style.margin = "20px auto"; // 상하 여백 추가

        // 결과 텍스트 생성
        const resultText = document.createElement("p");
        resultText.innerHTML = `AI가 <strong>${inferredObjectName}</strong>으로 추론하였습니다.`;
        resultText.style.textAlign = "center"; // 텍스트 중앙 정렬

        const backButton = document.createElement("button");
        backButton.textContent = "처음으로 돌아가기";
        backButton.style.display = "block"; // 버튼 중앙 정렬
        backButton.style.margin = "20px auto";
        backButton.onclick = function () {
          location.reload(); // 페이지 새로고침
        };

        // 결과 영역에 내용 추가
        resultDiv.innerHTML = ""; // 기존 결과 내용 초기화
        resultDiv.appendChild(image);
        resultDiv.appendChild(resultText);
        resultDiv.appendChild(backButton);
      };

      reader.readAsDataURL(file);
    }
  });
}

function object_detection_init() {
  const cameraButton = document.getElementById("activate-camera");
  const cameraStreamDiv = document.getElementById("camera-stream");
  const resultDiv = document.getElementById("result");

  // 카메라 활성화 버튼 클릭 이벤트
  cameraButton.addEventListener("click", () => {
    // mediaDevices API 지원 여부 확인
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("이 브라우저는 카메라 기능을 지원하지 않습니다.");
      return;
    }

    // 웹 카메라 사용 권한 요청
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        // 비디오 요소 생성 및 설정
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.style.maxWidth = "500px"; // 비디오 크기 조정

        // 카메라 스트림 영역에 비디오 요소 추가
        cameraStreamDiv.innerHTML = "";
        cameraStreamDiv.appendChild(video);

        // 결과 표시 영역 초기화
        resultDiv.innerHTML = "";
      })
      .catch(function (err) {
        // 권한 거부나 다른 오류 처리
        alert("카메라에 접근할 수 없습니다: " + err.message);
        console.log("카메라 접근 오류: ", err);
      });
  });
}
