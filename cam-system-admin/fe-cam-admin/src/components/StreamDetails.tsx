import React from 'react';

interface StreamDetailsProps {
  sdp: string;
}

const StreamDetails: React.FC<StreamDetailsProps> = ({ sdp }) => {
  return (
    <div
      style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '8px',
        fontSize: '12px',
        whiteSpace: 'pre-wrap',
        marginTop: '4px',
      }}
    >
      <strong>SDP詳細:</strong>
      <pre style={{ margin: 0 }}>{sdp}</pre>
    </div>
  );
};

export default StreamDetails;
