import { GetMyPostsReturn } from "@/services/server/MyPosts";
import clsx from "clsx";
import { useId } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const PostItem = ({ post }: { post: GetMyPostsReturn["posts"][0] }) => {
  const titleId = useId();
  return (
    <li className={clsx(styles.item, !post.published && styles.draft)}>
      <Link to={`/my/posts/${post.id}`} aria-labelledby={titleId}>
        {post.imageUrl && <img src={post.imageUrl} alt="" />}
        <div className={styles.content}>
          <p className={styles.title} id={titleId}>
            {post.title}
          </p>
          <p className={styles.description}>{post.description}</p>
        </div>
      </Link>
    </li>
  );
};
