"use client"

import { useState } from 'react';

export default function Counter() {
  const [state, setState] = useState(0);

  return (
    <div className='flex gap-4'>
      <button onClick={() => setState((state) => state + 1)}>Add</button>
      <h1>counter: {state}</h1>
      <button onClick={() => setState((state) => state - 1)}>Min</button>
    </div>
  );
}
