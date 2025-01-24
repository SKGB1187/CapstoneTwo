'use client';

import React from "react";
import WordPracticeElementary from "./WordPracticeElementary";
import Navbar from "./Navbar";
import ProgressWithinListComponent from "./ProgressWithinList";

const BeePageComponent = ({ spellingList, description, progress, listName, totalWords, onProgressUpdate, userId }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-2 mb-2 p-2 container border border-dark rounded bg-warning" style={{ marginBottom: "20px" }}>
        <div className="row">
          <div className="col text-center">
            <h1 className="m-2 p-2">{spellingList}</h1>
            <p className="p-2 bg-dark text-light rounded">{description}</p>
            <ProgressWithinListComponent progress={progress} totalWords={totalWords} />
            <WordPracticeElementary 
              listName={listName} 
              userId={userId} 
              onProgressUpdate={onProgressUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeePageComponent;
