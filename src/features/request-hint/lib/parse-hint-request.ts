import {
  MAX_HINT_CODE_LENGTH,
  MAX_HINT_ERROR_LENGTH,
} from "../config/hint-limits";
import type { HintRequestBody } from "../model/types";

export function parseHintRequest(value: unknown): HintRequestBody | null {
  if (typeof value !== "object" || value === null) return null;

  const { problemId, stage, code, lastError, codeVersion } = value as Record<
    string,
    unknown
  >;

  if (typeof problemId !== "string" || problemId.length === 0) return null;

  if (stage !== 1 && stage !== 2 && stage !== 3) return null;

  if (typeof code !== "string" || code.length > MAX_HINT_CODE_LENGTH)
    return null;

  if (
    lastError !== null &&
    (typeof lastError !== "string" || lastError.length > MAX_HINT_ERROR_LENGTH)
  )
    return null;

  if (
    typeof codeVersion !== "number" ||
    !Number.isInteger(codeVersion) ||
    codeVersion < 0
  )
    return null;

  return { problemId, stage, code, lastError, codeVersion };
}
