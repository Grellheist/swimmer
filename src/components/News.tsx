import { Article } from './types';

type NewsProps = {
    article: Article;
};

export default function News({ article }: NewsProps) {
    return (
        <a href={article.url} target="_blank">
            <div className='flex items-center justify-between px-4 py-2 space-x-1 transition duration-200'>
                <div>
                   <h6>{article.title}</h6> 
                   <p>{article.source.name}</p>
                </div>
                <img src={article.urlToImage} alt={article.title} className='rounded-xl' width="70" />
            </div>
        </a>
    )
}
