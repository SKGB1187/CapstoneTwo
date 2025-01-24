import React from "react";

const ProgressWithinListComponent = ({ progress = [], totalWords = 0 }) => {
  const completed = progress.filter((p) => p.status === "completed").length;
  const skipped = progress.filter((p) => p.status === "skipped").length;
  const review = progress.filter((p) => p.status === "review").length;

  return (
    <div
      className="mt-3 mb-3 p-3 border border-dark rounded bg-warning"
      style={{ textAlign: "center" }}
    >
      <h2 className="p-2 bg-dark text-light rounded">Your Progress</h2>
      <p className="p-2 bg-dark text-light rounded">
        Keep up the great work! Here's how you're doing so far:
      </p>
      <div className="d-flex justify-content-evenly p-2 bg-dark text-light rounded">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item m-2 rounded border border-dark">
            <strong>Total Words:</strong> {totalWords}
          </li>
          <li className="list-group-item m-2 rounded border border-dark">
            <strong>Completed:</strong> {completed}
          </li>
          <li className="list-group-item m-2 rounded border border-dark">
            <strong>Review:</strong> {review}
          </li>
          <li className="list-group-item m-2 rounded border border-dark">
            <strong>Skipped:</strong> {skipped}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressWithinListComponent;
