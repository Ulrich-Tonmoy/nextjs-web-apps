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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalThreadsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const threads = await threadsQuery.exec();
  const isNext = totalThreadsCount > skipAmount + threads.length;

  return { threads, isNext };
}
