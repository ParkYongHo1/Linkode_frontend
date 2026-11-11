import "server-only";

import { cache } from "react";

import { createClient } from "@/shared/api/supabase/server";

import { isProblemLevel } from "../model/problem-level";
import type { ProblemDetail, ProblemTestCase } from "../model/types";

export const getProblem = cache(
  async (id: string): Promise<ProblemDetail | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("problems")
      .select(
        "id, code, title, topic, level, estimated_minutes, description, starter_code, test_cases",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      if (error.code === "22P02") {
        return null;
      }

      throw new Error(`문제 조회 실패: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    if (!isProblemLevel(data.level)) {
      throw new Error(`알 수 없는 난이도: ${data.level} (문제 ${data.code})`);
    }

    function isTestCases(value: unknown): value is ProblemTestCase[] {
      if (!Array.isArray(value)) {
        return false;
      }

      return value.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "args" in item &&
          Array.isArray(item.args) &&
          "expected" in item,
      );
    }

    if (!isTestCases(data.test_cases)) {
      throw new Error(`테스트 케이스 형식 오류 (문제 ${data.code})`);
    }

    return {
      id: data.id,
      number: data.code,
      title: data.title,
      topic: data.topic,
      level: data.level,
      estimatedMinutes: data.estimated_minutes,
      description: data.description,
      starterCode: data.starter_code,
      testCases: data.test_cases,
    };
  },
);
