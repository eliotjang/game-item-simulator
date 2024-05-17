# Game Item Simulator

- [AWS 배포 웹사이트 링크](http://eliotjang.shop:3000/)
- [게임 아이템 시뮬레이션 API 명세서 링크](https://eliotjang.notion.site/c8dd140cb73a4d48a439095682a80418?v=5241996e10a74fa2a957638d88e7e3ad&pvs=4)

## 캐릭터 관련 엔드포인트

### POST /api/characters

- 기능 : 캐릭터 생성
- Method : POST
- API URL : /api/chracters
- request body :
  ```json
  {
    "name": "엘리엇장"
  }
  ```
- response body :
  ```json
  {
    "message": "새로운 캐릭터 ‘엘리엇장’을(를) 생성하셨습니다!"
    "data": {
      "character_id": 3
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

## 아이템 관련 엔드 포인트

### POST /api/items

- 기능 : 아이템 생성
- Method : POST
- API URL : /api/items
- request body :
  ```json
  {
    "item_code": 3,
    "item_name": "성물의 반지",
    "item_stat": {
      "health": 7,
      "power": 7
    }
  }
  ```
- response body :
  ```json
  {
    "message": "새로운 아이템 ‘성물의 반지’을(를) 생성하셨습니다!",
    "data": {
      "item_code": 3
    }
  }
  ```

### PATCH /api/items/:item_code

- 기능 : 아이템 수정
- Method : PATCH
- API URL : /api/items/:item_code
- request body :
  ```json
  {
    "item_code": 3,
    "item_name": "축복의 반지",
    "item_stat": {
      "health": 777,
      "power": 777
    }
  }
  ```
- response body :
  ```json
  {
    "message": "기존 아이템 성물의 반지이(가) 수정되었습니다.",
    "base_data": {
      "base_name": "성물의 반지",
      "base_stat": {
        "health": 7,
        "power": 7
      }
    },
    "patched_data": {
      "item_name": "축복의 반지",
      "item_stat": {
        "health": 777,
        "power": 777
      }
    }
  }
  ```

### GET /api/items

- 기능 : 아이템 목록 조회
- Method : GET
- API URL : /api/items
- request body : `{ }`
- response body :
  ```json
  {
    "data": [
      {
        "item_code": 4,
        "item_name": "으리으리한 몽둥이"
      },
      {
        "item_code": 3,
        "item_name": "축복의 반지"
      },
      {
        "item_code": 2,
        "item_name": "너덜너덜한 모자"
      },
      {
        "item_code": 1,
        "item_name": "부러질 듯한 장검"
      }
    ]
  }
  ```

### GET /api/items/:item_code

- 기능 : 아이템 상세 조회
- Method : GET
- API URL : /api/items/:item_code
- request body : `{ }`
- response body :
  ```json
  {
    "data": {
      "item_code": "3",
      "item_name": "축복의 반지",
      "item_stat": {
        "health": 777,
        "power": 777
      }
    }
  }
  ```

## 장비 관련 엔드포인트

### GET /api/equipment/:character_id

- 기능 : 캐릭터가 장착한 아이템 목록 조회
- Method : GET
- API URL : /api/equipment/:character_id
- request body : `{ }`
- response body :
  ```json
  {
    "data": [
      {
        "item_code": 4,
        "item_name": "으리으리한 몽둥이"
      },
      {
        "item_code": 3,
        "item_name": "축복의 반지"
      },
      {
        "item_code": 2,
        "item_name": "너덜너덜한 모자"
      },
      {
        "item_code": 1,
        "item_name": "부러질 듯한 장검"
      }
    ]
  }
  ```

### POST /api/equipment/:character_id

- 기능 : 아이템 장착
- Method : POST
- API URL : /api/equipment/:character_id
- request body :
  ```json
  {
    "item_code": 3
  }
  ```
- response body :
  ```json
  {
    "message": "캐릭터 드록바의 스탯이 변경되었습니다.",
    "base_stat": {
      "base_health": 500,
      "base_power": 100
    },
    "changed_stat": {
      "health": 507,
      "power": 107
    }
  }
  ```

### DELETE /api/equipment/:character_id

- 기능 : 아이템 탈착
- Method : DELETE
- API URL : /api/equipment/:character_id
- request body :
  ```json
  {
    "item_code": 3
  }
  ```
- response body :
  ```json
  {
    "message": "캐릭터 드록바의 스탯이 변경되었습니다.",
    "base_stat": {
      "base_health": 510,
      "base_power": 110
    },
    "changed_stat": {
      "health": 500,
      "power": 100
    }
  }
  ```
