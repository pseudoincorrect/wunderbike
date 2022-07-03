interface Post {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string;
}

function validate(post: Post): boolean {
  return true;
}

function fromDbToModel(row: any): Post {
  return {
    id: row['id'],
    createdAt: row['created_at'],
    title: row['title'],
    description: row['description'],
    userId: row['user_id'],
    imageUrl: row['image_url'],
  } as Post;
}

function fromRequestToModel(data: any): Post {
  return {
    id: '',
    createdAt: '',
    userId: '',
    title: data['title'],
    description: data['description'],
    imageUrl: data['imageUrl'],
  } as Post;
}

export { Post, validate, fromDbToModel, fromRequestToModel };
