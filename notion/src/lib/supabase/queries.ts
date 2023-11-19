"use server";

import { validate } from "uuid";
import { files, folders, users, workspaces } from "../../../migrations/schema";
import db from "./db";
import { File, Folder, Subscription, User, workspace } from "./supabase.types";
import { and, eq, ilike, notExists } from "drizzle-orm";
import { collaborators } from "./schema";

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

