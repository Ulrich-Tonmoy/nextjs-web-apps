import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const results = await fetchThreads(1, 15);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {results.threads.length === 0 ? (
          <p className="no-result">No Threads Found!</p>
        ) : (
          <>
            {results.threads.map((thread, i) => (
              <ThreadCard
                key={i}
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
            ))}
          </>
        )}
      </section>
    </>
  );
}
