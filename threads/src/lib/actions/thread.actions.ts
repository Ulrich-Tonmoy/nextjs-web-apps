"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  thread: string;
  author: string;
  communityId: string | null;
  image: string | null;
  path: string;
}

export async function createThread({
  thread,
  author,
  communityId,
  image,
  path,
}: Params) {
  connectToDB();

  try {
    const createdThread = await Thread.create({
      thread,
      author,
      image,
      community: null,
    });

    await User.findByIdAndUpdate(author, { threads: createdThread._id });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}
