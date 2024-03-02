export type Post = {
    id: number,
    title: string,
    username: string, 
    url: string
}

export type PostList = Array<Post>;

export type Page<T> = {
    total_count: number,
    items: Array<T>
}