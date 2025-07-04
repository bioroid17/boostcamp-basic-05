# 미션 5

네이버 부스트캠프 [미션 5](https://lucas.codesquad.kr/boostcamp-2025-basic/course/u/%EB%B2%A0%EC%9D%B4%EC%A7%81/%EB%AF%B8%EC%85%985.-AST-%EA%B8%B0%EB%8A%A5-%EB%A6%AC%EC%84%9C%EC%B9%98/AST-%EB%A6%AC%EC%84%9C%EC%B9%98) 풀이과정입니다.

## 원래 컴파일러에 대해 어디까지 알고있었는가?

시스템 프로그래밍 수업에서 컴파일러 -> 어셈블러 -> 링커 -> 로더 순으로 프로그램을 변환해서 메모리에 로드한다~ 정도 배웠습니다. (어셈블러에 대해 알아보는 수업이었습니다.)

## AST란?

AST는 Abstract Syntax Tree의 약자로, 정의에 대해 찾아보니 이렇게 나왔다.

- 나무위키: 정의된 형식 문법을 따라 주어진 형식 언어에 대해 얻어진 생성 규칙의 트리 형태의 자료구조. 주로 구문 분석의 결과물로써 주어진다.
- 위키피디아: 추상 구문 트리는 컴파일러에 널리 사용되는 자료 구조인데, 이는 프로그램 코드의 구조를 표현하는 프로퍼티이기 때문이다. AST는 일반적으로 컴파일러의 구문 분석 단계의 결과물이다.
- Copilot: 프로그래밍 언어에서 소스 코드의 구조를 트리 형태로 표현한 자료 구조입니다. 컴파일러나 코드 분석 도구에서 핵심적으로 사용되죠.
- ChatGPT: Abstract Syntax Tree (AST, 추상 구문 트리)는 소스 코드의 구조를 트리 형태로 표현한 자료 구조입니다. 주로 컴파일러나 인터프리터에서 사용되며, 코드의 문법적 구조를 추상화하여 표현합니다.
  - AST는 코드의 의미 구조만을 표현한 나무 모양의 구조입니다.
    코드에서 필요 없는 괄호나 콤마 같은 세부 문법은 생략하고, 핵심 구성요소(문, 표현식 등)를 계층적으로 표현해요.
- Gemini: 추상 구문 트리(Abstract Syntax Tree, AST)는 컴퓨터 과학에서 소스 코드의 추상적인 구문 구조를 트리 형태로 표현한 것입니다
  - 간단히 말해, 프로그래밍 언어로 작성된 코드의 핵심적인 의미와 구조를 계층적으로 보여주는 지도와 같다고 생각하시면 됩니다.

즉, AST란 소스 코드의 문법 구조를 트리 형태로 표현한 자료구조이며, 컴파일러가 프로그래밍 코드를 이해하고 처리하기 위한 핵심 개념이라고 이해했다. 소스 코드를 파싱하여 AST를 만들고, 이를 기반으로 의미 분석, 코드 최적화, 최종 코드 생성 등의 작업을 수행한다.

##

## 예시

```js
const x = 5 + 2;
```

위 코드는

```text
VariableDeclaration
├── Identifier (x)
└── BinaryExpression
    ├── Literal (5)
    └── Literal (2)
```

이렇게 구조화된다.

## 나만의 AST

문제에서는 `var a = new A.init();`를 구조화하라고 한다.
만약 이걸 구조화한다면?

<https://github.com/estree/estree/blob/master/es5.md#programs>
<https://astexplorer.net/>
위 링크를 통해 이해한 바로는, JS에서 위 코드를 실행시키려면 다음과 같은 타입의 노드가 필요하다고 한다.

- VariableDeclaration: 변수를 선언할 때 필요하다.
  - VariableDelarator: 변수 선언 시 변수 이름 등을 저장하는 노드인 듯 하다.
    - Pattern: 변수 이름이 저장된다.
    - NewExpression: 클래스 인스턴스를 만들기 위해 `new`를 사용했으므로 필요하다.
      - MemberExpression: 클래스의 메소드를 호출하기 때문에 필요한 것으로 보인다.(callee)
        - Expression: 값은 A로, 메소드를 호출하는 클래스 부분을 저장하고 있다.
        - Expression: 값은 init으로, 메소드
      - Arguments: 생성자에 넘긴 파라미터를 저장하는 부분으로, 여기서는 아무 값도 넘기지 않으므로 빈 배열을 가진다.

```text
VariableDeclaration (kind: var)
└── VariableDeclarator
    ├── Pattern (id: a)
    └── NewExpression
        └── MemberExpression
            ├── Expression (object: A)
            └── Expression (property: init)
        └── Arguments: []

```

## 주로 공부한 소스

<https://github.com/estree/estree/blob/master/es5.md#programs>
<https://astexplorer.net/>
