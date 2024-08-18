"use client";

import { Button } from "react-bootstrap";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorPageProps) {
  return (
    <div>
      <h2>This is an error</h2>
      <p>Something went wrong.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

export default Error;
