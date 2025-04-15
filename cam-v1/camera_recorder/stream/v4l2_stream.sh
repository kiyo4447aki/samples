#!/usr/bin/env bash

gst-launch-1.0 -v \
  udpsrc port=47000 caps="application/x-rtp, media=video, clock-rate=90000, encoding-name=H264, payload=96" ! \
  rtpjitterbuffer latency=10 ! \
  rtph264depay ! \
  h264parse ! \
  avdec_h264 ! \
  clockoverlay time-format="%Y-%m-%d %H:%M:%S" font-desc="Sans 36" draw-outline=false ! \
  videoconvert ! video/x-raw,format=YUY2 ! \
  tee name=t \
    t. ! queue ! \
      v4l2sink device=/dev/video63 sync=false \
    t. ! queue ! \
      v4l2sink device=/dev/video62 sync=false
