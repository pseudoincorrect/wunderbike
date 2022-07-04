import type { NextPage } from 'next';
import CardTricks from '../components/card_tricks/card_tricks';
import useApi from '../lib/use_api';

const Tricks: NextPage = () => {
  const { response, error, isLoading } = useApi('/api/tricks/all');
  console.log('response :');
  console.log(response);

  return (
    <div>
      <h1>Bike Tricks</h1>

      {isLoading && <p>Loading Tricks...</p>}

      {response && (
        <>
          <p>Tricks:</p>
          <pre>{CardTricks(response.tricks)}</pre>
        </>
      )}

      {error && (
        <>
          <p>Error loading Tricks</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Tricks;
