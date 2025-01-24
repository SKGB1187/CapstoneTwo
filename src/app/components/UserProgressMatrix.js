import React, { useEffect, useState } from "react";
import { getUserProgress } from "../services/progressService";
import { oneBeeSchoolList } from "../utils/oneBeeSchoolList";

function UserProgressMatrix({ userId, listName }) {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const progress = await getUserProgress(userId, listName);
        const progressMap = new Map(
          progress.map((p) => [p.word, p.status])
        );

        const matrixWithProgress = oneBeeSchoolList.map((row) =>
          row.map((word) => ({
            word,
            status: progressMap.get(word) || "not started",
          }))
        );

        setMatrix(matrixWithProgress);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    }

    fetchProgress();
  }, [userId, listName]);

  return (
    <div>
      <h2>{listName} Progress</h2>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(({ word, status }, colIndex) => (
                <td key={colIndex} className={`status-${status}`}>
                  {word} ({status})
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProgressMatrix;
