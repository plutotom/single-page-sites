export const CHANNEL_HANDLE = "@OzleyASMR";
export const CHANNEL_ID = "UC_ARaeDGHVLAqi6whEWQRTg";
export const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

export type VideoChoice =
  | { label: string; type: "playlist"; value: string }
  | { label: string; type: "video"; value: string };

export type SleepVideosData = {
  updatedAt: string;
  channelHandle: string;
  channelId: string;
  choices: VideoChoice[];
};
