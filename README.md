## Preview
https://github.com/moonelysian/pokemon/assets/37898263/ee6343b2-69e5-4137-9922-822ef15846aa

## 프로젝트 실행 방법
```
npm start
```
## 배포 주소
https://pokemon-ezetgcz3h-moonelysians-projects.vercel.app/

## 기술 스택
### Development
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### Environment
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

## 트러블 슈팅

### 문제점
1. 포켓몬 상세페이지에 다녀오면 fetchPokemons의 초기 api가 재호출되면서 포켓몬 목록이 중복되는 현상을 발견했다.

### 해결
1. `condition`으로 nextUrl이 비어서 호출되는 경우 pokemons의 배열 길이를 확인했다. 이미 배열이 차있는 경우엔 페이지 첫 랜딩이 아닌 것으로 판단하여 현재 상태의 state를 변경하지않도록 하니 해결됐다.
  ```ts
  // pokemonSlice.ts
  ...
    {
      condition(nextUrl, { getState }) {
        const { pokemons } = getState() as RootState;
        if (!nextUrl && pokemons.pokemons.results.length > 0) return false;
        return true;
      },
    }
  ...
  ```
2. 추가적으로 해당 함수를 dispatch하는 useEffect 내부에서 거르는 것도 생각해봤다.
   ```ts
   useEffect(() => {
     if (pokemons) return;
     dispatch(fetchPokemons());
   } ,[pokemon])
   ```
이렇게 해도 useInfiniteScrollHook 덕분에 nextUrl을 가져올 수 있어서 중복없이 호출이 가능했다. 이 방법을 사용하지 않은 이유는 해당 api를 호출하는 곳마다 방어 코드를 작성하는 번거로움이 있었기 때문이다.
