// StreamStatsChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface StatsDataPoint {
  time: number; // タイムスタンプ（ミリ秒）
  bitrate: number; // kbps 単位のビットレート
  loss: number; // % 単位のパケットロス
}

interface StreamStatsChartProps {
  pc: RTCPeerConnection | null;
}

const StreamStatsChart: React.FC<StreamStatsChartProps> = ({ pc }) => {
  const [data, setData] = useState<StatsDataPoint[]>([]);
  // useRef を用いて前回の動画受信バイト数とタイムスタンプを管理（フィルタリングで失わないようにする）
  const prevInfo = useRef<{ videoBytes: number; timestamp: number } | null>(null);
  // 表示ウィンドウ（例：直近 60 秒間）
  const windowSize = 60000; // 60秒

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

          if (prevInfo.current) {
            const bytesDiff = videoBytes - prevInfo.current.videoBytes;
            const timeDiff = (now - prevInfo.current.timestamp) / 1000; // 秒
            const bitrate = timeDiff > 0 ? (bytesDiff * 8) / timeDiff / 1000 : 0;
            const lossRate = packetsReceived > 0 ? (packetsLost / packetsReceived) * 100 : 0;
            const newPoint: StatsDataPoint = { time: now, bitrate, loss: lossRate };

            // 現在時刻から windowSize より古いデータは除外
            setData(prevData => {
              const newData = [...prevData, newPoint].filter(
                point => point.time >= now - windowSize,
              );
              return newData;
            });
          }
          // 更新: 前回の情報を現在の値で保存
          prevInfo.current = { videoBytes, timestamp: now };
        } catch (err) {
          console.error('Error getting stats:', err);
        }
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pc]);

  // 固定の時間ウィンドウを基準とした domain。ここでは、現在時刻から windowSize 分前〜現在
  const now = Date.now();
  const domain: [number, number] = [now - windowSize, now];

  // タイムスタンプを HH:MM:SS の形式に変換
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={formatTime}
          domain={domain}
          type="number"
          tick={{ fill: 'white', fontSize: 10 }}
        />
        <YAxis
          yAxisId="left"
          label={{ value: 'Bitrate (kbps)', angle: -90, position: 'insideLeft', fill: 'white' }}
          tick={{ fill: 'white', fontSize: 10 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Loss (%)', angle: 90, position: 'insideRight', fill: 'white' }}
          tick={{ fill: 'white', fontSize: 10 }}
        />
        <Tooltip labelFormatter={formatTime} />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="bitrate"
          name="Bitrate (kbps)"
          stroke="#82ca9d"
          dot={false}
          isAnimationActive={true}
          animationDuration={500}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="loss"
          name="Packet Loss (%)"
          stroke="#8884d8"
          dot={false}
          isAnimationActive={true}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StreamStatsChart;
