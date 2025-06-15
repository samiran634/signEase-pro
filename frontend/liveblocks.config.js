import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY,
});

const {
  RoomProvider,
  useMutation,
  useStorage,
  useStorageRoot, // ✅ This must be included here
  useOthers,
  useSelf,
} = createRoomContext(client);

// ✅ Export everything you use in your components
export {
  RoomProvider,
  useMutation,
  useStorage,
  useStorageRoot,
  useOthers,
  useSelf,
};
