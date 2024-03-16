import { useState, useEffect } from "react";

const initBeforeUnLoad = (showExitPrompt: boolean) => {
  window.onbeforeunload = (event) => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

export default function useExitPrompt(bool: boolean) {
  const [showExitPrompt, setShowExitPrompt] = useState(bool);

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
    return () => {
      window.onbeforeunload = null;
    };
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt];
}
