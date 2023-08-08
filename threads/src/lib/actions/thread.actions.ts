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

export async function fetchThreadById(id: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  comment: string,
  image: string,
  userId: string,
  path: string,
) {
  connectToDB();

  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) throw new Error("Thread not found");

    const commentThread = new Thread({
      thread: comment,
      image,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();
    originalThread.children.push(savedCommentThread._id);
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error Commenting to thread: ${error.message}`);
  }
}
