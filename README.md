# Game Item Simulator

- [AWS 배포 웹사이트 링크](http://eliotjang.shop:3000/)

## 캐릭터 관련 엔드포인트

### POST /api/characters

- 기능 : 캐릭터 생성
- Method : POST
- API URL : /api/chracters
- request body :
  ```json
  {
    "name": "your_character_name"
  }
  ```
- response body :
  ```json
  {
    "message": "새로운 캐릭터 ‘엘리엇장’을(를) 생성하셨습니다!"
    "data": {
      "character_id": 321
    }
  }
  ```

### DELETE /api/characters/:character_id

- 기능 : 캐릭터 삭제
- Method : POST
- API URL : /api/characters/:character_id
- request body : `{ }`
- response body :
  ```json
  {
    "message": "캐릭터 ‘엘리엇장’을(를) 삭제하였습니다."
  }
  ```

### GET /api/characters/:character_id

- 기능 : 캐릭터 상세 조회
- Method : GET
- API URL : /api/characters/:character_id
- request body : `{ }`
- response body :
  ```json
  {
    "data": {
      "character_id": 3,
      "name": "엘리엇장",
      "health": 500,
      "power": 100
    }
  }
  ```

### GET /api/characters

- 기능 : 캐릭터 전체 조회
- Method : GET
- API URL : /api/characters
- request body : `{ }`
- response body :
  ```json
  {
    "data": [
      {
        "character_id": 3,
        "name": "엘리엇장",
        "health": 500,
        "power": 100
      },
      {
        "character_id": 2,
        "name": "제임스장",
        "health": 500,
        "power": 100
      },
      {
        "character_id": 1,
        "name": "스티브장",
        "health": 500,
        "power": 100
      }
    ]
  }
  ```

### 작성중...
