'use server'
import { CreateDocumentParams } from "@/types";
import {nanoid} from 'nanoid'
import { liveblocks } from "../liveblocks";
import { RoomAccesses } from "@liveblocks/node";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async({userId, email}: CreateDocumentParams) => {
const roomId = nanoid();

try {
    const metadata = {
        creatorId:userId,
        email,
        title: 'Untitled'

    }

    const usersAccesses :RoomAccesses = {
        [email]: ['room:write']
    }

    const room = await liveblocks.createRoom("my-room-id", {
        metadata,
        usersAccesses,
        defaultAccesses: ['room:write']
      });
      revalidatePath('/')
      return parseStringify(room)
} catch (error) {
    console.log(`Error happened while creating a room: ${error}`)
}
}

export const getDocument = async({roomId, userId} : {roomId: string; userId: string}) => {
   try {
     const room = await liveblocks.getRoom(roomId)
    
    //  const hasAccess = Object.keys(room.usersAccesses).includes(userId)
 
    //  if(!hasAccess) {
    //      throw new Error('You do not have access to this document')
    //  }
 
     return parseStringify(room)
   } catch (error) {
    console.log(`error happned while getting a room:${error}`)
   }
}