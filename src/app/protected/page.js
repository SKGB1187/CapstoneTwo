import SpellingListCard from '../components/SpellingListCard';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <div className="mt-2 mb-2 p-2 container border border-dark rounded bg-dark">
        <div className="row">
          <div className="col text-center">
            <h1 className="text-warning">Welcome to Turing's Spelling Bee App</h1>
            <p className="text-warning">
              Using the Scripps National Spelling Bee Study Guide, this application is
              broken into One Bee, Two Bee, and Three Bee School Spelling Lists.
            </p>
          </div>
        </div>
      </div>

      <SpellingListCard
        title="One Bee School Spelling List"
        description="This list uses words from the Scripps National Spelling Bee School Spelling List for first, second, and third-grade for 2024."
        link="/protected/onebee"
        buttonText="Go to One Bee"
      />
      <SpellingListCard
        title="Two Bee School Spelling List 2024"
        description="This list uses words from the Scripps National Spelling Bee School Spelling List for fourth, fifth, and sixth-grade for 2024."
        link="/protected/twobee"
        buttonText="Go to Two Bee"
      />
      <SpellingListCard
        title="Three Bee School Spelling List 2024"
        description="This list uses words from the Scripps National Spelling Bee School Spelling List for seventh and eighth-grade for 2024."
        link="/protected/threebee"
        buttonText="Go to Three Bee"
      />

    </div>
  );
}
