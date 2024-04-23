"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";

import axios from "axios";

const API_URL = process.env.API_URL;

export async function fetchPosts(pageNumber = 1, pageSize = 5) {
  try {
    const result = await axios.get(`${API_URL}/thread`);

    const posts = result.data.data;

    return { posts, isNext: false };
  } catch (error: any) {
    console.error("Error while fetching posts:", error.message);
    console.error("Error response from backend:", error.response.data);
    return { posts: [], isNext: false };
  }
}

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({ text, author, path }: Params) {
  try {
    const body = {
      text,
      author,
    };

    await axios.post(`${API_URL}/thread`, body);

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchThreadById(threadId: string) {
  try {
    const response = await axios.get(`${API_URL}/thread/${threadId}`);

    const thread = response.data.data;

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    const body = {
      threadId,
      commentText,
      userId,
    };

    await axios.post(`${API_URL}/thread/addComment`, body);

    revalidatePath(path);
  } catch (err: any) {
    console.error("Error while adding comment:", err);
    console.error("Error From Backend:", err.response.data);
    throw new Error("Unable to add comment");
  }
}

//Abaikan kode dibawah
async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const mainThread = await Thread.findById(id).populate("author");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    const descendantThreads = await fetchAllChildThreads(id);

    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()),
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}
