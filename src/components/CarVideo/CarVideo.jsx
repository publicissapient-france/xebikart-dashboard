import React from "react";

import { useSSE } from "react-hooks-sse";

export default () => {
  const state = useSSE("incomingData");
  return null;
};
