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
