# plating delivery app

1. 의존성 설치
   ```bash
   cd /Users/chaelin/plating-app
   npm install
   ```

2. 환경 변수 설정  
   `.env.example`을 복사해 `.env`를 만들고 값을 채운다.
   ```bash
   cp .env.example .env
   ```
   - `SHEET_ID`: Google 스프레드시트 ID (기본값 포함)
   - `GOOGLE_APPLICATION_CREDENTIALS`: service-account.json 경로 (예: `./service-account.json`)
   - `SERVER_PORT`: API 서버 포트 (기본 3001)

3. Google Sheets 연동
   - [Google Cloud Console](https://console.cloud.google.com/)에서 서비스 계정을 만들고 키(JSON)를 받는다.
   - 키 파일을 프로젝트 루트에 `service-account.json`으로 저장한다.
   - 해당 스프레드시트를 서비스 계정 이메일(JSON 내 `client_email`)에 **편집자** 또는 **뷰어**로 공유한다.

4. API 서버 + 프론트 동시 실행
   ```bash
   npm run dev:all
   ```
   - API: http://localhost:3001  
   - 앱: http://localhost:5173 (프록시로 `/api` → 3001 연결)

   또는 터미널 2개에서:
   ```bash
   npm run server   # 3001
   npm run dev      # 5173
   ```

5. 브라우저에서 http://localhost:5173 접속

## 시트 형식 (Sheet1!A:J)

| A       | B       | C    | D              | E                | F      | G           | H          | I      | J             |
|--------|--------|------|----------------|------------------|--------|-------------|------------|-------|---------------|
| teamName| teamId | time | location       | tags (쉼표 구분) | stageLabel | status     | statusText | dimmed | regionLabel   |
| Mike team | ABC-1234 | 7:30 | WeWork        | Breakfast, Snacks, Bento | Setup | in-transit | In Transit |        | Long island city |
| ...    | ...    | ...  | ...            | ...              | ...    | ...         | ...        | ...   | ...           |

- 1행: 헤더(무시 가능). 2행부터 데이터.
- status: `in-transit` | `preparing` | `delivered`
- dimmed: `1` / `y` / `yes` / `true` / `예` 이면 해당 행이 흐리게 표시.
