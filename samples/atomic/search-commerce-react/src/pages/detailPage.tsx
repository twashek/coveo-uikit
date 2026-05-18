import {useLocation, Link} from 'react-router-dom';

export const DetailPage = () => {
  const location = useLocation();
  // Retrieve the Coveo result passed from the search page
  const result = location.state?.result;

  if (!result) {
    return (
      <div>
        No Pokemon data found. <Link to="/">Go back to search</Link>
      </div>
    );
  }

  // Construct your image URL
  const formattedName = (result.raw.pokemon_name || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
  const avifUrl = `https://img.pokemondb.net/artwork/avif/${formattedName}.avif`;

  // Helper function to handle the array-to-string logic for table cells
  const renderFieldValue = (value: any) => {
    return Array.isArray(value) ? value.join(', ') : value || 'N/A';
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Link
        to="/"
        style={{textDecoration: 'none', color: '#0056b3', fontWeight: 'bold'}}
      >
        ← Back to Pokedex
      </Link>

      <h1
        style={{
          fontSize: '3.5rem',
          textTransform: 'capitalize',
          marginBottom: '1rem',
        }}
      >
        {result.raw.pokemon_name || result.title}
      </h1>

      <div style={{display: 'flex', gap: '3rem', alignItems: 'flex-start'}}>
        <img
          src={avifUrl}
          alt={result.title}
          title={result.title}
          style={{
            width: 'auto',
            maxHeight: '400px',
            background: '#f5f5f5',
            borderRadius: '15px',
            padding: '20px',
          }}
        />

        <div style={{flex: 1}}>
          <h3 style={{borderBottom: '2px solid #eee', paddingBottom: '0.5rem'}}>
            Description
          </h3>
          <div
            style={{lineHeight: '1.6', color: '#333', fontSize: '1.1rem'}}
            dangerouslySetInnerHTML={{
              __html:
                typeof result.raw.pokemon_desc === 'string'
                  ? result.raw.pokemon_desc.replace(/;/g, ' ')
                  : 'No description available.',
            }}
          />

          {/* ATTRIBUTES TABLE */}
          <table
            style={{
              width: '100%',
              marginTop: '2rem',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{borderBottom: '2px solid #333'}}>
                <th style={{padding: '12px 8px'}}>Types</th>
                <th style={{padding: '12px 8px'}}>Species</th>
                <th style={{padding: '12px 8px'}}>Generation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid #eee'}}>
                <td
                  style={{
                    padding: '12px 8px',
                    fontWeight: 'bold',
                    color: '#0056b3',
                  }}
                >
                  {renderFieldValue(result.raw.pokemon_types)}
                </td>
                <td style={{padding: '12px 8px'}}>
                  {renderFieldValue(result.raw.pokemon_species)}
                </td>
                <td style={{padding: '12px 8px'}}>
                  {renderFieldValue(result.raw.pokemon_generation)}
                </td>
              </tr>
            </tbody>
          </table>

          <table
            style={{
              width: '100%',
              marginTop: '2rem',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr style={{borderBottom: '2px solid #333'}}>
                <th style={{padding: '12px 8px'}}>Height</th>
                <th style={{padding: '12px 8px'}}>Weight</th>
                <th style={{padding: '12px 8px'}}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid #eee'}}>
                <td
                  style={{
                    padding: '12px 8px',
                    fontWeight: 'bold',
                    color: '#0056b3',
                  }}
                >
                  {renderFieldValue(result.raw.pokemon_height)}
                </td>
                <td style={{padding: '12px 8px'}}>
                  {renderFieldValue(result.raw.pokemon_weight)}
                </td>
                <td style={{padding: '12px 8px'}}></td>
              </tr>
            </tbody>
          </table>

          {/* Raw Data Debugger */}
          <details style={{marginTop: '3rem', width: '100%'}}>
            <summary style={{cursor: 'pointer', color: '#888'}}>
              View Raw Data
            </summary>
            <pre
              style={{
                background: '#f4f4f4',
                padding: '1rem',
                borderRadius: '5px',
                fontSize: '0.8rem',
                marginTop: '0.5rem',

                /* FIX: These three lines prevent the window overflow */
                whiteSpace:
                  'pre-wrap' /* Allows text to wrap to the next line */,
                wordWrap:
                  'break-word' /* Forces long strings (like URLs or desc) to break */,
                overflowX:
                  'hidden' /* Prevents horizontal scrollbars entirely */,

                border: '1px solid #ddd',
              }}
            >
              {JSON.stringify(result.raw, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};
