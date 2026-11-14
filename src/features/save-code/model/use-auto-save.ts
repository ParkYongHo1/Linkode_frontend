import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { saveCode } from "../api/save-code";
import { getSavedCode } from "../api/get-saved-code";

import type { SaveStatus } from "./save-status";

const DEBOUNCE_MS = 2000;
const RETRY_MS = 5000;

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

  const isConflict = data?.status === "conflict";
  const { data: conflictSaved } = useQuery({
    queryKey: ["saved-code", problemId],
    queryFn: () => getSavedCode(problemId),
    enabled: isConflict,
    staleTime: 0,
  });

  useEffect(() => {
    if (!enabled) return;
    if (isPending) return;
    if (isConflict) return;
    if (code === lastSavedCodeRef.current) return;

    const delay = isError ? RETRY_MS : DEBOUNCE_MS;

    const timerId = setTimeout(() => {
      mutate({ problemId, code, baseVersion });
    }, delay);

    return () => clearTimeout(timerId);
  }, [
    problemId,
    code,
    baseVersion,
    enabled,
    mutate,
    isConflict,
    isError,
    isPending,
  ]);

  const status = getSaveStatus({
    enabled,
    isPending,
    isError,
    isConflict,
    version: baseVersion,
  });
  const overwrite = () => {
    const latestVersion = conflictSaved?.version ?? 0;

    setBaseVersion(latestVersion);
    mutate({ problemId, code, baseVersion: latestVersion });
  };

  return {
    status,
    version: baseVersion,
    overwrite,
    conflictCode: conflictSaved?.code,
  };
}
