import type { ProblemListItem } from "@/entities/problem";

export const MOCK_COURSE_TITLE = "자료구조 기초";

export const MOCK_PROBLEMS: ProblemListItem[] = [
  { id: "1-1", number: "1-1", title: "두 수의 합", topic: "배열 · 해시", level: "easy", estimatedMinutes: 15, status: "passed", statusText: "통과 · 10월 19일" },
  { id: "1-2", number: "1-2", title: "괄호 짝 맞추기", topic: "스택", level: "easy", estimatedMinutes: 15, status: "passed", statusText: "통과 · 10월 20일" },
  { id: "2-1", number: "2-1", title: "프린터 대기열", topic: "큐", level: "normal", estimatedMinutes: 20, status: "passed", statusText: "통과 · 10월 22일" },
  { id: "3-1", number: "3-1", title: "섬의 개수", topic: "그래프 · DFS", level: "normal", estimatedMinutes: 25, status: "passed", statusText: "통과 · 10월 25일" },
  { id: "3-2", number: "3-2", title: "미로의 최단 경로", topic: "그래프 · BFS", level: "normal", estimatedMinutes: 25, status: "in_progress", statusText: "3개 중 1개 통과 · 오후 11:58" },
  { id: "4-1", number: "4-1", title: "회의실 배정", topic: "그리디 · 정렬", level: "hard", estimatedMinutes: 35, status: "todo", statusText: "시작 전" },
];

export const MOCK_CONTINUE_LAB = {
  problemId: "3-2",
  title: "3-2. 미로의 최단 경로",
  summary: "마지막 실행에서 테스트 3개 중 1개를 통과했어요. 코드는 오후 11:58에 저장됐어요.",
};
