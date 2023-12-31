# 레포 설명

- **디자인 패턴** 학습 목적으로 프로그래머스 과제 테스트 연습 중 [영화 좌석 예매 페이지](https://school.programmers.co.kr/skill_check_assignments/496) 내용 일부를 가져왔습니다.
- 해당 구현 사항을 주제로 코드를 작성하되, 바닐라 자바스크립트로 프레임워크처럼 **반응성**을 구현하기 위해 **반응형 패턴**을 적용하는 것이 목표입니다.
- **바닐라 자바스크립트**로 리액트와 같은 프레임워크처럼 데이터의 변화에 따라 UI를 관리할 수 있도록, 선언적으로 프로그래밍하는 것을 목표로 합니다.
- **Observer 패턴**을 사용해 영화 예매 좌석 페이지의 인원, 좌석, 장애인석 체크여부 데이터 변화에 따라 UI와 각 연관된 상탯값이 변경되도록 구현했습니다.
- Observer 패턴에서의 구독 상태외에도 분리한 관심사에 직접 접근해야 할 경우, **Singleton 패턴**을 사용했습니다.
  - 좌석 데이터를 관리하는 인스턴스에서 직접 인원 데이터를 관리하는 클래스에 접근해야할 경우: Singleton패턴으로 생성된 인스턴스에 접근
  - 각각의 인스턴스는 애플리케이션 내 하나만 존재하기 때문에 Singleton패턴을 적용해 전역적으로 접근하도록 했습니다.

<br>
<br>
<br>
<br>
<br>

# 과제 요구사항

---

# 📌 유의 사항

> 과제 풀이 전 아래 유의사항을 꼭 숙지해 주시길 바랍니다. 이를 어길 시 평가에 불이익이 있을 수 있습니다.

- **`index.html`, `style.css` 파일은 절대로 수정하지 않습니다.**

  - 반드시 지문에 제시된 `index.html`, `style.css` 에 있는 선택자 요소를 활용합니다.
  - 응시자가 임의로 작성하여 적용하는 경우 정상적으로 채점이 되지 않습니다.

- **정답 코드는 `index.js`에 작성합니다.**

  - 채점 가능

    - `index.js` 파일에 모든 솔루션 코드를 작성하는 경우

      ```javascript
      // index.js

      console.log("Hello World");
      ```

    - 추가적인 파일을 생성하여 해당 코드를 `index.js`에 연결하는 경우

      ```javascript
      // index.js
      import App from "./src/App.js";

      new App(document.querySelector("body"));
      ```

      ```javascript
      // src/App.js

      console.log("Hello World");
      ```

  - 채점 불가능

    - HTML 문서 내에 미리 작성한 `<script>` 안에 정답 코드를 작성하는 경우
      ```html
      <body>
        ...
        <script>
          console.log("Hello World");
        </script>
      </body>
      ```
    - `index.js`가 아닌 다른 이름의 `.js` 파일을 만들어 코드를 작성하는 경우

      ```javascript
      // app.js
      console.log("Hello World");
      ```

- 상단에 `로그인` & `좌석 예매` 버튼은 문제 구분을 위한 것으로 채점 상에 영향을 주지 않습니다.
- 각 항목은 유기적으로 연결된 경우가 있으나(e.g. 관람 인원 선택 후 관람 좌석 선택) 모든 항목을 완벽하게 구현해야 점수를 획득 할 수 있는 것은 아닙니다. **모든 문항은 부분 점수가 있으니 시간 배분에 신경써서 최선을 다해 문제를 풀어주세요.**
- 아래와 같이 문제 화면과 작성할 코드 화면을 분할하여 사용할 수 있습니다.
  ![how_to_use_vscode](https://user-images.githubusercontent.com/91870252/222297816-eee5042f-f8f2-4b27-a9bb-cf52d11ec505.gif)
- 과제 풀이 시 크롬 브라우저 개발자 도구 사용은 가능합니다.

# 📌 1번 문제. "Login" 유효성 검사 구현하기

> - 내비게이션 바에 '로그인' 버튼을 클릭하면 나타나는 화면에서 문제를 풀어야 합니다.
>
> - 1번 문제에 대한 자세한 요구사항은 `문제 1번.md` 파일을 참조해주세요.

# 📌 2번 문제. "좌석 예매" 기능 구현하기

> - 내비게이션 바에 '좌석예매' 버튼을 클릭하면 나타나는 화면에서 문제를 풀어야 합니다.
>
> - 2번 문제에 대한 자세한 요구사항은 `문제 2번.md` 파일을 참조해주세요.
