"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import axios from "axios";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

const API_URL = process.env.API_URL;

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return null;
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    const body = {
      userId,
      username,
      name,
      bio,
      image,
    };

    await axios.post(`${API_URL}/user/upsert`, body);

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error.response.data);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    console.log(API_URL);

    const threadResponse = await axios.get(
      `${API_URL}/user/getUserPosts/${userId}`
    );

    return threadResponse.data.data;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    const users = await axios.get(`${API_URL}/user`);

    return { users: users.data.data, isNext: false };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], isNext: false };
  }
}
