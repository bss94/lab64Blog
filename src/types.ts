export interface ApiPost {
  title: string;
  body: string;
  date: string;
}

export interface ApiPosts {
  [id: string]: ApiPost;
}

export interface Post extends ApiPost {
  id: string;
}

export interface PostMutation {
  title: string;
  body: string;
  date: string;

}