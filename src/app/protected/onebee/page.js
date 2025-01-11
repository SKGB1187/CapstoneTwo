import WordPracticeElementary from '../../components/WordPracticeElementary';
import Navbar from '../../components/Navbar';

export default function OneBeePage() {
  return (
    <div>
      <Navbar />
      <div className="mt-2 mb-2 p-2 container border border-dark rounded bg-warning" style={{ marginBottom: '20px' }}>
        <div className="row">
          <div className="col text-center">
            <h1 className="m-2 p-2">One Bee Spelling List 2024</h1>
            <p className="p-2 bg-dark text-light rounded">
            This list is for first, second, and third-grade students in 2024.
            </p>
            <WordPracticeElementary listName="oneBee" />
          </div>
        </div>
      </div>
      </div>
  );
}