
import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Post } from '../types';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onDelete?: (id: number) => void;
};

export const PostList: React.FC<Props> = (({ posts, onDelete = () => {} }) => {
  const [searchParams] = useSearchParams();
  const selectedPostId = 0;

  return (
    <table className="table is-striped is-narrow">
      <thead>
      <tr className="has-background-link-light">
        <th>#</th>
        <th>Title</th>
        <th>Body</th>
        <th></th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      {posts.map(post => (
        <tr
          key={post.id}
          className={classNames({
            'has-background-info': selectedPostId === post.id,
          })}
        >
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>

          <td>
            <Link to={`${post.id}`} state={{search: searchParams.toString()}} className="icon button is-inverted is-info">
              <i className="fas fa-pen"></i>
            </Link>
          </td>

          <td>
            <button
              className="icon button is-inverted is-danger"
              onClick={() => onDelete(post.id)}
            >
              <i className="fas fa-xmark"></i>
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
});
