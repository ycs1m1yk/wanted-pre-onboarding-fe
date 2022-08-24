# wanted-pre-onboarding-fe

## 데모 영상

데모 영상[링크](https://youtu.be/7a5Bzg5rGkk)입니다.

## Dependency

- react
- react-router-dom
- react-icons
- styled-components
- axios

## 실행 방법

1. `Clone`

   ```markdown
   $ git clone https://github.com/ycs1m1yk/wanted-pre-onboarding-fe.git
   ```

2. `Install`

   ```markdown
   $ npm install
   ```

3. `Set` environment variables

   1. package.json과 같은 디렉토리에 `.env.local` 파일을 생성합니다.

   2. `.env.local` 파일 안에 아래와 같이 작성합니다.

   ```
   REACT_APP_API_BASE_URL = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production'
   ```

4. `start` the project

   ```markdown
   $ npm start
   ```