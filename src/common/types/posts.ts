export type Post = {
    post_id: number,
    title: string,
    username: string, 
    url: string,
    likes: number, 
    user_liked: boolean,
    comments: number
}

export type PostList = Array<Post>;

export type Page<T> = {
    total_count: number,
    items: Array<T>
}