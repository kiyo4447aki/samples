import React, { useEffect, useState } from 'react';
import { JanusSignalingClient } from '../lib/JanusSignalingClient';
import StreamDetails from './StreamDetails';
import StreamStatsChart from './StreamStatsChart';

interface FeedInfoProps {
  client: JanusSignalingClient;
}

const FeedInfo: React.FC<FeedInfoProps> = ({ client }) => {
  const [sdp, setSdp] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const jsep = client.getLastJsep();
      if (jsep && jsep.sdp) {
        setSdp(jsep.sdp);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [client]);

  return (
    <div>
      <StreamStatsChart pc={client.getPC()} />
      <StreamDetails sdp={sdp} />
    </div>
  );
};

export default FeedInfo;
