"use client";

import { Post, deletePost, updatePost } from "../../lib/api/crud";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, NotebookPen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import CreateForm from "./Create/CreateForm";

const Post = ({
  post,
  refresh,
}: {
  post: Post;
  refresh: () => Promise<void>;
}) => {
  const [title, setTitle] = useState(String(post.title));
  const [author, setAuthor] = useState(String(post.author));
  const [content, setContent] = useState(String(post.content));

  return (
    <div
      key={String(post.id)}
      className='border border-foreground/20 p-6 rounded-2xl min-h-32 hover:scale-[102%] hover:bg-muted/30 transition-all duration-300'>
      <h2 className='text-2xl flex justify-between'>
        {post.title}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <NotebookPen size={16} strokeWidth={1} />
            </Button>
          </DialogTrigger>
          <DialogContent className=''>
            <DialogHeader>
              <DialogTitle>Edit post</DialogTitle>
              <DialogDescription>
                Make changes to the post here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CreateForm contentHeight='h-60' post={post} refresh={refresh}>
              <DialogClose
                type='submit'
                className='w-20 rounded-xl px-3 py-1 bg-foreground/10 hover:bg-foreground/20 transition-colors duration-300'>
                Save
              </DialogClose>
            </CreateForm>
          </DialogContent>
        </Dialog>
      </h2>
      <p>{String(post.timestamp).slice(0, 10)}</p>
      <p className='flex justify-between'>
        {post.content.slice(0, 30) + "..."}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>
              <Trash size={16} strokeWidth={1} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                post and remove it from the server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className='bg-red-600 hover:bg-red-700 text-white'
                onClick={async () => {
                  await deletePost(post);
                  refresh();
                }}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
};

export default Post;
