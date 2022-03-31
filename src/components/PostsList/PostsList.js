import React, { memo } from "react";

import NoResults from "../NoResults/NoResults";
import ResultsError from "../ResultsError/ResultsError";
import SinglePostItem from "../SinglePostItem/SinglePostItem";
import "./PostsList.scss";

const PostsList = ({ name, posts, numToExpect, loading, actionComponent, actionOnClick, noResultsTitle, noResultsMessage, error, errorRetry, actionLabel }) => {
    /**
     * A posts list component that shows a list of posts together.
     * @param {string} name - List name, more of a section title to show 
     * @param {Array} posts - List of post objects
     * @param {number} numToExpect - (optional) If it expects a number of items (for loading cards purpose only).
     * @param {Component} actionComponent - A component/icon that shows on the other side of the title.
     * @param {function} actionOnClick - A callback function that gets called when the `actionComponent` is clicked.
     * @param {string} [noResultsTitle] - (optional) A title for the `no-results` component.
     * @param {string} [noResultsMessage] - (optional) A message for the `no-results` component.
     * @param {object} [error] - (optional) An error object that includes an request error message and indicates that an error accord.
     * @param {function} [errorRetry] - (optional) A callback function that gets called when click the error message try again message.
     */

    const actionComponentCallback = () => {
        actionOnClick();
    }

    return (
        <section className="posts-list">
            <div className="posts-list__title-container">
                <h2 className="posts-list__title">{name}</h2>
                {
                    (actionComponent && actionOnClick) &&
                    <button onClick={actionComponentCallback} aria-label={actionLabel} className="posts-list__title-arrow no-btn">{actionComponent}</button>
                }
            </div>
            {
                numToExpect && loading ?
                    <div className="posts-list__list">
                        {
                            // Showing `numToExpect` of loading `SinglePostItem` ..
                            [...Array(numToExpect)].map((item, index) => <SinglePostItem key={index.toString()} loading />)
                        }
                    </div>
                    :
                    !error ? (
                        posts.length ?
                            <div className="posts-list__list">
                                {
                                    // When avaiable show the list of posts
                                    posts.map((post, index) => (
                                        <SinglePostItem
                                            key={index.toString()}
                                            image={post.featured_image}
                                            title={post.title}
                                            description={post.summary}
                                            dishTypes={post.dishTypes}
                                            veryHealthy={post.veryHealthy}
                                            link={`/post/${post._id}/`}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <NoResults
                                title={noResultsTitle ?? "No results"}
                                message={noResultsMessage ?? `We found no results for "${name}",\n we know you're mad but, we're sorry.`}
                            />
                    ) :
                        <ResultsError
                            errorObj={error}
                            retryCallback={errorRetry}
                        />
            }
        </section>
    )
}

export default memo(PostsList);