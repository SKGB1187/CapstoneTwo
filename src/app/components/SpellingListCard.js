import Link from 'next/link';

const SpellingListCard = ({ title, description, link, buttonText }) => {
  return (
    <div className="container border border-dark rounded bg-warning" style={{ marginBottom: '20px' }}>
      <div className="row">
        <div className="col text-center">
          <h2 className="m-2 p-2">{title}</h2>
          <p className="bg-dark text-light rounded m-2 p-2">{description}</p>
          <p className="bg-dark text-light rounded m-2 p-2">If you are ready to start studying this level, click below.</p>
          <Link href={link}>
            <button type="button" className="m-2 btn btn-light">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpellingListCard;