import { GetPostsReturn } from "@/services/server/Posts";
import { useId } from "react";
import Like from "./assets/like.svg";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const PostItem = ({ post }: { post: GetPostsReturn["posts"][0] }) => {
  const titleId = useId();
  const prefixImage =
    location.hostname === "hibohiboo.github.io"
      ? "/RinneCircle/storybook-static/"
      : "";
  return (
    <li key={post.id} className={styles.item}>
      <Link to={`/posts/${post.id}`} aria-labelledby={titleId}>
        <img src={`${prefixImage}${post.imageUrl || ""}`} alt="" />
        <div className={styles.content}>
          <div className={styles.description}>
            <p className={styles.title} id={titleId}>
              {post.title}
            </p>
            <p className={styles.authorName}>{post.authorName}</p>
          </div>
          <p className={styles.like}>
            {post.likeCount}
            <img src={Like} />
          </p>
        </div>
      </Link>
    </li>
  );
};
