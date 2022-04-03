import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, stripHTML, truncateString } from '../../commons/functions/commons';
import Badge from '../Badge/Badge';
import "./SinglePostItem.scss";

const SinglePostItem = ({ image, title, description, link, tags, loading }) => {
    /**
     * Represents a single recipe item(card) in a list of recipes e.g. (PostsList)
     * @param {string} image - An image URL to show the recipe image
     * @param {string} title - The recipe title.
     * @param {string} [description] - (optional) The recipe description.
     * @param {string} link - The URL that the title link takes you to.
     * @param {Array} [dishTypes] - (optional) A list of dish types strings.
     * @param {boolean} [veryHealthy] - (optional) Shows if this recipe is a healthy recipe
     * @param {boolean} [loading] - (optional) Shows if the card/recipe is loading.
     */
    // If loading it shows an empty card that have some loading animations.
    if (loading)
        return (
            <div className="single-post-container loading" aria-busy="true">
                <div className="single-post">
                    <div className='single-post__img-container'></div>
                    <div className="single-post__info">
                        <div className="single-post__dish-types">
                            <span className='single-post__dish-type'></span>
                            <span className='single-post__dish-type'></span>
                        </div>
                        <h2 className="single-post__title" aria-hidden="true"></h2>
                        <p className="single-post__desc"></p>
                        <div to={link} className="single-post__arrow" aria-hidden="true" tabIndex="-1">
                            <i className="las la-long-arrow-alt-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="single-post-container">
            <div className="single-post">
                {
                    // If veryHealthy is true shows a health badge on the recipe.
                    false &&
                    <i className="single-post__health-score las la-apple-alt" title="Healthy recipe badge" aria-label="Healthy recipe badge"></i>
                }
                {
                    image &&
                    <div className='single-post__img-container'>
                        <img className='single-post__img' loading="lazy" src={`${API_BASE_URL}/${image}`} alt={title} />
                        <div className='single-post__share'>
                            <a title="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-facebook-f"></i>
                            </a>
                            <a title="Share on Twitter" href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-twitter"></i>
                            </a>
                            <a title="Share on Pinterest" href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-pinterest"></i>
                            </a>
                        </div>
                    </div>
                }

                <div className="single-post__info">
                    {
                        tags?.length > 0 &&
                        <div className="single-post__dish-types">
                            {tags?.slice(0, 2).map((tag, index) => <Badge key={index.toString()} message={tag.name} />)}
                        </div>
                    }
                    <Link to={link}>
                        <h3 title={title} className="single-post__title">{truncateString(title, 40)}</h3>
                    </Link>
                    {
                        description &&
                        <p className="single-post__desc">{truncateString(stripHTML(description))}</p>
                    }
                    <Link to={link} className="single-post__arrow" aria-hidden="true" tabIndex="-1">
                        <i className="las la-long-arrow-alt-right"></i>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SinglePostItem;