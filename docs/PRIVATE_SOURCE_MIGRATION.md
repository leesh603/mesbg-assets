# MESBG: 비공개 개발 저장소 / 공개 플레이 사이트 분리

현재 공개 저장소는 개발 소스, 원본 아트와 Git 이력을 포함한다. 파일만 지우거나
.gitignore를 수정해도 이미 공개된 Git 커밋 이력은 사라지지 않는다.

## 준비된 배포 방식

- 개발 저장소(최종): leesh603/mesbg-source — **Private**
- 공개 배포 저장소(최종): leesh603/mesbg-assets — **Public**, Pages main / (root)
- 주소: https://leesh603.github.io/mesbg-assets/
- 스테이징: node tools/build-public.js -> .public-site/
- 감리: node tools/build-public.js --audit
- 배포 workflow: .github/workflows/public-game-release.yml
- 공개 대상: index, PWA 아이콘, 게임/갤러리용 런타임 이미지만.
- 비공개 대상: src, tools, data, art-src, tokens_painted, dice-faces-painted,
  workers, 제작 스크립트, archive, 전체 Git 이력과 원본 아트.
- 공개 갤러리에서는 도색 원본 토글을 제거한다.
- 빌드한 HTML/JS 및 실제 렌더링되는 이미지의 브라우저 추출까지 막을 수는 없다.

## 중요: 원래 저장소는 지금 즉시 Private으로 바꾸지 않는다

원래 Pages 사이트가 내려갈 수 있다. 먼저 이 브랜치의 배포 빌드 확인을 마치고
대체 공개 저장소를 배포할 준비가 될 때 전환한다.
기존 이름을 보존하면서 Git 전체 이력 재업로드를 피하려면 아래 순서가 적합하다.

### GitHub 웹 설정이 필요한 단계 (현재 커넥터는 저장소 생성/개명/공개 설정/Secrets 관리를 지원하지 않음)

1. 현재 소스 저장소 leesh603/mesbg-assets의 Settings > General >
   Repository name에서 mesbg-source로 **이름 변경**.
   변경 직후에도 원본 브랜치와 Git 커밋 이력은 보존된다.
2. 이름이 바뀐 leesh603/mesbg-source의 Settings > General >
   Danger Zone > Change repository visibility에서 **Private** 전환.
   Pages가 중단될 수 있다. 이 시점부터 배포 완료 전까지 짧은 서비스 중단을 예상한다.
3. 신규 저장소 leesh603/mesbg-assets를 **Public**으로 생성한다.
   생성할 때 README를 추가하여 main 브랜치를 초기화한다.
4. PRIVATE 소스 저장소에서 배포 준비 브랜치와 main의 최신 변경사항을
   확인한다. 아직 배포용 secret이 없으면 준비 브랜치를 병합하지 않는다.
5. https://github.com/settings/personal-access-tokens 에서 Fine-grained PAT를 만든다.
   접근할 리포는 신규 공개 mesbg-assets **한 개만 선택**.
   Permissions > Repository permissions > Contents = Read and write.
   만료 기간을 설정하고 원본 Private 저장소의
   Settings > Secrets and variables > Actions에서
   PUBLIC_DEPLOY_TOKEN 이름의 Actions secret으로 저장한다.
   토큰을 코드나 채팅에 붙여넣지 않는다.
6. PRIVATE 소스 저장소의 security/private-source-split-20261014 브랜치를
   검증 후 main에 병합한다. **private main에 병합되는 순간 자동으로**
   배포 워크플로가 실행된다. 이후에는 public 런타임 파일이 바뀐 main push가
   자동으로 릴리스된다. 필요하면 Actions > Build safe public game release >
   Run workflow에서 publish=true로 수동 재실행할 수 있다.
   워크플로는 원본 repository가 private인지 검증하고 화이트리스트 빌드만
   새 public repository의 main에 커밋한다.
7. 신규 Public mesbg-assets > Settings > Pages > Build and deployment에서
   Deploy from a branch, Branch: main, Folder: / (root)를 선택한다.
   사이트 https://leesh603.github.io/mesbg-assets/ 의
   실행, 갤러리, PWA, 캐릭터 스프라이트, 서버 API 기능을 확인한다.
8. 배포 성공 확인 후부터 게임 수정은 PRIVATE 소스 저장소에서만 하고,
   publish workflow로만 새 PUBLIC 배포 저장소에 반영한다.
   PUBLIC 저장소에서 원본 소스와 전체 자산 마스터를 관리하지 않는다.

## 주의

- 원본 에셋을 이미 내려받았거나 포크한 사람이 있다면 이후에도 보유 가능하다.
- Games Workshop / Tolkien 관련 저작권과 배포 허용 여부는 별도 문제다.
- 배포용 index.html은 브라우저에서 실행되므로 JavaScript 로직은 복사할 수 있다.
- public site의 .public-site/ 파일 사이즈 가드레일 950 MiB, 단일 파일 100 MiB.
- gallery2.html, test/demo HTML, 백업 및 원본 도색 폴더는 퍼블릭 배포에서 제외한다.
- Cloudflare Worker 배포는 건드리지 않는다. 기존 API 주소가 유지되게 한다.
- 안전을 위해 **이 가이드만으로 설정을 자동 변경하지 않는다.**
