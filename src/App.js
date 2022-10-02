import React from 'react';
import ContextForms from "./components/ContextForms"


function App() {

  return (
    <div id="app">
      <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mt-2 sm:mt-0 text-gray-600 text-lg uppercase font-medium tracking-wide"> Please fill the form</h1>
      </header>
      <ContextForms />
    </div>
  );
}

export default App;
