 import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY, // Use .env value
});

const {
  suspense: {
    RoomProvider,
    useRoom,
    useStorage,
    useMutation,
    useMyPresence,
    useUpdateMyPresence,
    useOthers,
  },
} = createRoomContext(client);

export {
  RoomProvider,
  useRoom,
  useStorage,
  useMutation,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
};
