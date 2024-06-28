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

export interface ApiAbout {
  title: string;
  textBody: string;
  subtitle: string;
  period: string;
  aboutProject: string;
}

export interface ApiContact {
  phone: string;
  email: string;
  name: string;
  secondname: string;

}

export interface ApiContacts {
  [id: string]: ApiContact;
}

export interface ContactData extends ApiContact {
  id: string;
}