import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id.toHexString()}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.thread}
          image={thread.image}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread._id.toHexString()}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((child: any, i: number) => (
          <ThreadCard
            key={i}
            id={child._id.toHexString()}
            currentUserId={child?.id || ""}
            parentId={child.parentId}
            content={child.thread}
            image={child.image}
            author={child.author}
            community={child.community}
            createdAt={child.createdAt}
            comments={child.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
