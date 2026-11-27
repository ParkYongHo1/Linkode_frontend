export type HomeFeature = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const HOME_FEATURES: HomeFeature[] = [
  {
    id: "hint",
    eyebrow: "AI 단계별 힌트",
    title: "정답 대신, 필요한 만큼만 열어봐요",
    description:
      "지금 작성한 코드와 마지막 실행 에러를 함께 보고 힌트를 줘요. 앞 단계를 받아야 다음 단계가 열려요.",
    points: [
      "1단계 방향, 2단계 위치, 3단계 거의 정답 순서로 열려요",
      "글자 단위로 바로 보이고, 중간에 멈출 수 있어요",
      "코드를 고치면 이전 코드 기준 힌트라고 알려줘요",
    ],
    media: {
      src: "/readme/hint-stream-abort.gif",
      alt: "1단계 힌트를 받은 뒤 2단계 힌트를 받다가 중단하는 화면",
      width: 1280,
      height: 885,
    },
  },
  {
    id: "run",
    eyebrow: "브라우저 실행·채점",
    title: "무한 루프여도 화면은 멈추지 않아요",
    description:
      "코드는 브라우저의 별도 스레드에서 실행돼요. 5초가 지나면 알아서 멈추고 결과를 보여줘요.",
    points: [
      "테스트마다 입력값, 기대값, 실제값, 실행 시간을 보여줘요",
      "시간이 초과돼도 먼저 끝난 테스트 결과는 남아요",
      "console.log 출력은 콘솔 탭에서 따로 확인해요",
    ],
    media: {
      src: "/readme/run-worker-timeout.gif",
      alt: "무한 루프 코드를 실행해도 화면이 멈추지 않고 5초 뒤 시간 초과가 표시되는 화면",
      width: 1200,
      height: 780,
    },
  },
  {
    id: "save",
    eyebrow: "자동 저장",
    title: "두 탭에서 고쳐도 코드가 사라지지 않아요",
    description:
      "입력을 멈추고 2초가 지나면 저장돼요. 다른 탭에서 먼저 저장했다면 덮어쓰지 않고 알려줘요.",
    points: [
      "저장에 실패하면 5초 뒤 다시 시도해요",
      "충돌이 나면 두 코드의 차이를 나란히 비교해요",
      "어떤 코드를 남길지 직접 골라요",
    ],
    media: {
      src: "/readme/save-conflict-diff.gif",
      alt: "두 탭에서 같은 코드를 수정해 충돌 안내와 차이 비교가 나타나는 화면",
      width: 1280,
      height: 686,
    },
  },
];

export const HINT_POLICIES = [
  {
    title: "하루 10번",
    description: "한국 시간 자정이 되면 다시 채워져요.",
  },
  {
    title: "받은 만큼만 차감",
    description:
      "첫 글자가 오기 전에 멈추거나 서버 오류가 나면 횟수가 줄지 않아요.",
  },
  {
    title: "단계마다 한 번",
    description:
      "다 받은 단계는 다시 열지 않아요. 멈췄거나 실패한 단계는 다시 받을 수 있어요.",
  },
];
