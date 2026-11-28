import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { getSavedCode } from "../api/get-saved-code";
import { saveCode } from "../api/save-code";

import type { SaveStatus } from "./save-status";

const DEBOUNCE_MS = 2000;
const RETRY_MS = 5000;

type UseAutoSaveParams = {
  problemId: string;
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
  initialCode,
  initialVersion,
  enabled,
}: UseAutoSaveParams) {
  const [version, setVersion] = useState(initialVersion);
  const codeRef = useRef(initialCode);
  const lastSavedCodeRef = useRef(initialCode);
  const versionRef = useRef(initialVersion);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);
  const isConflictRef = useRef(false);

  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: saveCode,
    onMutate: () => {
      isSavingRef.current = true;
    },
    onSuccess: (result, variables) => {
      if (result.status === "conflict") {
        isConflictRef.current = true;
        return;
      }
      versionRef.current = result.version;
      setVersion(result.version);
      lastSavedCodeRef.current = variables.code;
    },
    onSettled: (_result, error) => {
      isSavingRef.current = false;
      if (error) {
        schedule(RETRY_MS);
        return;
      }
      if (codeRef.current !== lastSavedCodeRef.current) {
        schedule(DEBOUNCE_MS);
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

  function save() {
    if (!enabled) return;
    if (isSavingRef.current || isConflictRef.current) return;

    const code = codeRef.current;
    if (code === lastSavedCodeRef.current) return;

    mutate({ problemId, code, baseVersion: versionRef.current });
  }

  function schedule(delay: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, delay);
  }

  function handleCodeChange(value: string) {
    codeRef.current = value;
    schedule(DEBOUNCE_MS);
  }

  function getLatestCode() {
    return codeRef.current;
  }

  function overwrite() {
    const latestVersion = conflictSaved?.version ?? 0;

    versionRef.current = latestVersion;
    setVersion(latestVersion);
    isConflictRef.current = false;
    mutate({ problemId, code: codeRef.current, baseVersion: latestVersion });
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const status = getSaveStatus({
    enabled,
    isPending,
    isError,
    isConflict,
    version,
  });

  return {
    status,
    version,
    overwrite,
    conflictCode: conflictSaved?.code,
    handleCodeChange,
    getLatestCode,
  };
}
