import React, { useEffect, useState, useCallback } from "react";
import * as stylex from "@stylexjs/stylex";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { Flag } from "@/lib/types";

const styles = stylex.create({
  sidebar: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "16px",
    borderLeft: "1px solid #e0e0e0",
    backgroundColor: "#fafafa",
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#1a1a2e",
  },
  textarea: {
    width: "100%",
    minHeight: "300px",
    fontFamily: "monospace",
    fontSize: "13px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
    boxSizing: "border-box",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  saveButton: {
    backgroundColor: "#4361ee",
    color: "#fff",
  },
  viewToggle: {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
  error: {
    color: "#e63946",
    fontSize: "13px",
    marginTop: "8px",
  },
  jsonView: {
    fontSize: "13px",
    maxHeight: "400px",
    overflowY: "auto",
    overflowX: "auto",
    maxWidth: "100%",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    padding: "8px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  status: {
    color: "#2a9d8f",
    fontSize: "13px",
    marginTop: "8px",
  },
});

interface FlagConfigProps {
  onFlagsChange?: (flags: Flag[]) => void;
}

export default function FlagConfig({ onFlagsChange }: FlagConfigProps) {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [rawJson, setRawJson] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const fetchFlags = useCallback(() => {
    fetch("/api/flags")
      .then((r) => r.json())
      .then((data) => {
        setFlags(data);
        setRawJson(JSON.stringify(data, null, 2));
        onFlagsChange?.(data);
      });
  }, [onFlagsChange]);

  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(rawJson);
      if (!Array.isArray(parsed)) {
        setError("Must be a JSON array of flags");
        return;
      }
      setError("");
      fetch("/api/flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: rawJson,
      })
        .then((r) => r.json())
        .then((data) => {
          setFlags(data);
          setRawJson(JSON.stringify(data, null, 2));
          onFlagsChange?.(data);
          setStatus("Saved!");
          setTimeout(() => setStatus(""), 2000);
        });
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div {...stylex.props(styles.sidebar)}>
      <div {...stylex.props(styles.title)}>Flag Configuration</div>
      {editing ? (
        <>
          <textarea
            {...stylex.props(styles.textarea)}
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
          />
          {error && <div {...stylex.props(styles.error)}>{error}</div>}
          {status && <div {...stylex.props(styles.status)}>{status}</div>}
        </>
      ) : (
        <div {...stylex.props(styles.jsonView)}>
          <JsonView data={flags} style={defaultStyles} />
        </div>
      )}
      <div {...stylex.props(styles.buttonRow)}>
        <button
          {...stylex.props(styles.button, styles.viewToggle)}
          onClick={() => setEditing(!editing)}
        >
          {editing ? "View" : "Edit"}
        </button>
        {editing && (
          <button
            {...stylex.props(styles.button, styles.saveButton)}
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
