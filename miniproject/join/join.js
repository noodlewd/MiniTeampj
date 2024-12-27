// DOM 요소 가져오기
const joinForm = document.getElementById("joinForm");
const memberList = document.getElementById("memberList");

// 폼 제출 이벤트 처리
joinForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 동작 방지

    // 입력값 가져오기
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const style = document.getElementById("style").value.trim();
    const strength = document.getElementById("strength").value.trim();
    const mbti = document.getElementById("mbti").value.trim();

    // 데이터 검증
    if (!name || !age || !style || !strength || !mbti) {
        alert("모든 필드를 채워주세요!");
        return;
    }

    if (isNaN(age) || age <= 0) {
        alert("나이는 양의 숫자로 입력해주세요!");
        return;
    }

    // 데이터 저장 객체 생성
    const memberData = {
        name: name,
        age: parseInt(age),
        style: style,
        strength: strength,
        mbti: mbti
    };

    // 데이터 화면에 추가
    addMemberToList(memberData);

    // 성공 메시지 및 폼 초기화
    alert("회원 정보가 성공적으로 등록되었습니다!");
    joinForm.reset(); // 폼 초기화
});

// 데이터를 화면에 추가하는 함수
function addMemberToList(member) {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${member.name}</strong> (${member.age}세, ${member.mbti}) <br>
        협업 스타일: ${member.style} <br>
        장점: ${member.strength} <br>
        <button onclick="editMember(this)">수정</button>
        <button onclick="deleteMember(this)">삭제</button>
    `;
    memberList.appendChild(li);
}


function editMember(button) {
    const li = button.parentElement;

    // 데이터 추출 (정규식 대신 DOM 접근 방식 사용)
    const nameMatch = li.querySelector("strong").innerText; // 이름 추출
    const ageMatch = li.querySelector("strong").nextSibling.textContent.match(/\((\d+)세/); // 나이 추출
    const mbtiMatch = li.querySelector("strong").nextSibling.textContent.match(/, (.+?)\)/); // MBTI 추출
    const styleMatch = li.innerHTML.match(/협업 스타일: (.+?)<br>/)[1]; // 협업 스타일 추출
    const strengthMatch = li.innerHTML.match(/장점: (.+?)<br>/)[1]; // 장점 추출

    // 입력 필드에 데이터 채우기
    document.getElementById("name").value = nameMatch;
    document.getElementById("age").value = ageMatch[1];
    document.getElementById("mbti").value = mbtiMatch[1];
    document.getElementById("style").value = styleMatch;
    document.getElementById("strength").value = strengthMatch;

    // 수정 후 항목 삭제
    memberList.removeChild(li);
}

// 데이터 삭제 함수
function deleteMember(button) {
    const li = button.parentElement;
    memberList.removeChild(li);
}