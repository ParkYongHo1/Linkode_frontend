import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { saveCode } from "../api/save-code";
import type { SaveStatus } from "./save-status";

const DEBOUNCE_MS = 2000;

type UseAutoSaveParams = {
  problemId: string;
  code: string;
  initialCode: string;
  initialVersion: number;
  enabled: boolean;
};

type SaveStatusInput = {
  enabled: boolean;
  isPending: boolean;
  isError: boolean;
  isConflict: boolean;
  version: number;
};

function getSaveStatus({
  enabled,
  isPending,
  isError,
  isConflict,
  version,
}: SaveStatusInput): SaveStatus {
  if (!enabled) return "guest";
  if (isPending) return "saving";
  if (isError) return "error";
  if (isConflict) return "conflict";
  if (version > 0) return "saved";
  return "idle";
}

export function useAutoSave({
  problemId,
  code,
  initialCode,
  initialVersion,
  enabled,
}: UseAutoSaveParams) {
  const [baseVersion, setBaseVersion] = useState(initialVersion);
  const lastSavedCodeRef = useRef(initialCode);

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: saveCode,
    onSuccess: (result, variables) => {
      if (result.status === "saved") {
        setBaseVersion(result.version);
        lastSavedCodeRef.current = variables.code;
      }
    },
  });

  useEffect(() => {
    if (!enabled) return;
    if (code === lastSavedCodeRef.current) return;

    const timerId = setTimeout(() => {
      mutate({ problemId, code, baseVersion });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerId);
  }, [problemId, code, baseVersion, enabled, mutate]);

  const status = getSaveStatus({
    enabled,
    isPending,
    isError,
    isConflict: data?.status === "conflict",
    version: baseVersion,
  });

  return { status, version: baseVersion };
}
