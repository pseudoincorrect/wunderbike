/**
 * Model of a Trick
 */
interface Trick {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string;
}

/**
 * fromDbToModel create a trick model from a db query result
 * @param row database query result row
 * @returns a trick model
 */
function fromDbToModel(row: any): Trick {
  return {
    id: row['id'],
    createdAt: row['created_at'],
    title: row['title'],
    description: row['description'],
    userId: row['user_id'],
    imageUrl: row['image_url'],
  } as Trick;
}

/**
 * fromRequestToModel create a trick model from a HTTP request
 * @param data object gotten from a http request
 * @returns a trick model
 */
function fromRequestToModel(data: any): Trick {
  return {
    id: '',
    createdAt: '',
    userId: '',
    title: data['title'],
    description: data['description'],
    imageUrl: data['imageUrl'],
  } as Trick;
}

export { Trick, fromDbToModel, fromRequestToModel };
