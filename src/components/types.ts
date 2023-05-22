import { IconType } from "react-icons";

export interface Article {
    title: string;
    description: string;
    url: string;
    source: {
        name: string;
    };
    urlToImage: string;
}

export interface NewsData {
    articles: Article[];
    article: Article[];
}

export type PostType = {
    id: number;
    name: string;
    username: string;
    userImg: string;
    img: string;
    text: string;
    timestamp: string;
};

export type PostProps = {
    post: PostType;
};

export type SidebarMenuItemProps = {
    text: string;
    Icon: IconType;
    active?: boolean;
}
