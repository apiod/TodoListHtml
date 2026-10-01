/*
1) 전체출력
2) 추가(등록)
3) 수정(chckbox 상태변경)
4) 삭제
5) 검색
*/
//초기 데이터
let mockData = [
  {
    id: 0,
    isDone: false,
    content: "React study",
    date: new Date().toLocaleString(),
  },
  {
    id: 1,
    isDone: true,
    content: "친구만나기",
    date: new Date().toLocaleString(),
  },
  {
    id: 2,
    isDone: false,
    content: "낮잠자기",
    date: new Date().toLocaleString(),
  },
];

// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

//날짜 출력
const printDate = () => {
  const today = new Date();
  //   console.log(today);
  //   const dateString = today.toLocaleString();
  const year = today.getFullYear();
  const mon = today.getMonth() + 1;
  const date = today.getDate();
  const yoyil = day[today.getDay()];
  const dateString = `${year}년 ${mon}월 ${date}일 ${yoyil}요일 `;

  document.querySelector("#time").textContent = dateString;
};

//초기 데이터 설정
const initData = (printData) => {
  /* checkbox   
    onchange=”onUpdate(id값)” 
    todo의 isDone이 true이면 checked속성 추가 

    button 
    name속성 추가해서  value에 todo의 id 설정 
    onclick =”todoDel(this)” 추가 
  */
  //   console.log(printData);

  const wrapper = document.querySelector(".todos_wrapper");
  wrapper.innerHTML = "";
  printData.forEach(({ id, isDone, content, date }) => {
    wrapper.innerHTML += `
        <div class="TodoItem" id=${id}>
            <input type="checkbox" name="che" ${isDone ? "checked" : ""}/>
            <div class="content">${content}</div>
            <div class="date">${date}</div>
            <button name=${id}>삭제</button>
          </div>
        
        `;
  });
};
//체크박스 변경 이벤트
document.querySelector(".todos_wrapper").addEventListener("change", (event) => {
  if (event.target.matches("input")) {
    const checkBox = event.target;
    const id = checkBox.closest(".TodoItem").id;
    mockData[id].isDone = checkBox.checked;
    console.log(mockData);
  }
});

//todoList add
let idIndex = 3;
document
  .querySelector(".Editor > button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    let content = event.target.previousElementSibling.value;
    if (content) {
      mockData.push({
        id: idIndex++,
        isDone: false,
        content,
        date: new Date().toLocaleString(),
      });
      console.log(mockData);
      event.target.previousElementSibling.value = "";
    } else {
      console.log("텍스트 입력");
    }

    initData(mockData);
  });

// todoList 삭제
document.querySelector(".todos_wrapper").addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    console.log(event.target.name);
    mockData = mockData.filter((obj) => obj.id != event.target.name);
    initData(mockData);
  }
});

//검색
const getFilterData = (content) => {
  if (!content) {
    return mockData;
  }
  let searchDatas = [];
  mockData.forEach((data) => {
    if (data.content.indexOf(content) === -1) {
      return mockData; //없으니까 기본데이터
    } else {
      searchDatas.push(data); //있으니까 데이터 배열에 넣고
    }
  });
  //   console.log(searchDatas);
  return searchDatas; //그 데이터 반환
};

const searchEle = document.querySelector(".List > input");
searchEle.addEventListener("input", (event) => {
  //   console.log(event.target.value);
  let searchedData = getFilterData(event.target.value);
  //   console.log(searchedData);
  initData(searchedData);
});

// onload = () => {};
initData(mockData);
printDate();
//날짜 출력
