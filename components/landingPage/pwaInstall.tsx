"use client";

import React from "react";
import { Button } from "../ui/button";
import usePWAInstallPrompt from "../../hooks/usePWAInstallPrompt";

type Props = {};

const PwaInstall = (props: Props) => {
  const [isVisible, promptInstall] = usePWAInstallPrompt();
  return <Button onClick={promptInstall}>Install App</Button>;
};

export default PwaInstall;
