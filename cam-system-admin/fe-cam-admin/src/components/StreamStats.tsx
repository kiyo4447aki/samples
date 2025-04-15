import React, { useEffect, useState } from 'react';

interface StreamStatsProps {
  pc: RTCPeerConnection | null;
}

interface StatsData {
  videoBitrate: number; // kbps
  packetLoss: number; // %
}

const StreamStats: React.FC<StreamStatsProps> = ({ pc }) => {
  const [stats, setStats] = useState<StatsData>({ videoBitrate: 0, packetLoss: 0 });
  const [prevBytes, setPrevBytes] = useState<number | null>(null);
  const [prevTimestamp, setPrevTimestamp] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pc) {
      interval = setInterval(async () => {
        try {
          const statsReport = await pc.getStats();
          let videoBytes = 0;
          let packetsLost = 0;
          let packetsReceived = 0;
          statsReport.forEach(report => {
            if (report.type === 'inbound-rtp' && report.kind === 'video') {
              videoBytes += report.bytesReceived;
              packetsLost += report.packetsLost || 0;
              packetsReceived += report.packetsReceived || 0;
            }
          });
          const now = Date.now();
          if (prevBytes !== null && prevTimestamp !== null) {
            const bytesDiff = videoBytes - prevBytes;
            const timeDiff = (now - prevTimestamp) / 1000; // 秒単位
            const bitrate = (bytesDiff * 8) / timeDiff / 1000; // kbps
            const lossRate = packetsReceived > 0 ? (packetsLost / packetsReceived) * 100 : 0;
            setStats({ videoBitrate: bitrate, packetLoss: lossRate });
          }
          setPrevBytes(videoBytes);
          setPrevTimestamp(now);
        } catch (err) {
          console.error('Error getting stats:', err);
        }
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pc, prevBytes, prevTimestamp]);

  return (
    <div style={{ color: 'white', fontSize: '12px', marginTop: '4px' }}>
      <div>ビットレート: {stats.videoBitrate.toFixed(2)} kbps</div>
      <div>パケットロス: {stats.packetLoss.toFixed(2)} %</div>
    </div>
  );
};

export default StreamStats;
