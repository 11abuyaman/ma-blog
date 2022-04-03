import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MetaTags } from "react-meta-tags";
import Parser from 'html-react-parser';
import { connect } from "react-redux";
import axios from "axios";

import { API_BASE_URL, API_KEY, generateMediaLink } from "../../commons/functions/commons";
import IngredientsList from "../../components/IngredientsList/IngredientsList";
import { getPosts } from "../../store/recipes/selectors.recipes";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { loadPosts } from "../../store/recipes/actions.recipes";
import PostsList from "../../components/PostsList/PostsList";
import Badge from "../../components/Badge/Badge";
import "./PostDetails.scss";

const PostDetails = ({ posts, initPosts }) => {
    /**
     * A screen that shows one recipe in details
     */
    const postContent = useRef(null);
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        // Fetch recipe details on mount
        fetchPostDetails();
        // fetchSimilarRecipe();

        // // If there are no random recipes, dispatch a get request.
        // if (posts.recipes.length === 0)
        //     initPosts()
    }, [id])

    const fetchPostDetails = async () => {
        // Fetch(get) recipe details based on the recipe ID.
        isLoading(true);
        try {
            console.log(`${API_BASE_URL}/posts/${id}/`);
            let result = await axios.get(`${API_BASE_URL}/posts/${id}/`);
            let data = result.data;
            console.log(data);
            if (result.status === 200)
                setPostData(data);
        }
        catch (error) {
            console.error(`**ERR:fetchPostDetails ${error}`);
        }
        isLoading(false);
    }

    let processScroll = () => {
        let docElem = document.documentElement,
            docBody = document.body,
            scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
            scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
            scrollPercent = scrollTop / scrollBottom * 100 + '%';

        document.querySelector('.navbar__progress-bar').style.width = scrollPercent;
    }

    useEffect(() => {
        document.addEventListener("scroll", processScroll);

        return () => {
            document.removeEventListener("scroll", processScroll);
        }
    }, [])


    // If still loading the request, show a loading indicator.
    if (loading)
        return (
            <div className="recipe-details main loading">
                <LoadingScreen message="Loading recipe" fullScreen />
            </div>
        )

    return (
        <>
            <MetaTags>
                <title>Da'Recipe - {postData.title}</title>
                {/* <meta name="description" content={truncateString(postData.body, 160)} /> */}
            </MetaTags>
            <div className="sidebar-1">
                <div className="sidebar-1__inner">
                    <section className="credits">
                        <h3>By <a target="_blank" rel="noreferrer" href={postData.sourceUrl}>{postData.sourceName}<i className="las la-external-link-alt"></i></a></h3>
                        <p>{postData.creditsText}</p>
                    </section>
                </div>
            </div>
            <div className="recipe-details main" aria-busy={loading}>
                <img className="recipe-details__featured-img" src={generateMediaLink(postData.featured_image)} alt={postData.title} />
                <div className="recipe-details__container">
                    <div className="recipe-details__meta">
                        <div>
                            <h1 className="recipe-details__title">{postData.title}</h1>
                            <div className="recipe-details__meta__dish-types">
                                {
                                    postData.tags.map((item, index) => <Badge key={index.toString()} message={item.name} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="recipe-details__content" ref={postContent}>
                        {
                            // Recipe summary
                            postData.summary &&
                            <section>
                                <h2>Summary</h2>
                                <p>{Parser(postData.summary)}</p>
                            </section>
                        }
                        {
                            postData.body &&
                            <section>
                                <p>{Parser(postData.body)}</p>
                            </section>
                        }
                    </div>
                </div>
                <div className="padding-wrapper gap-lg">
                    {/* <PostsList
                        name="Similar recipes"
                        recipes={similarRecipes}
                    /> */}
                    {/* 
                    <PostsList
                        numToExpect={4}
                        name="Explore some random recipes"
                        recipes={posts.recipes}
                        actionComponent={<i className="las la-redo-alt"></i>}
                        loading={posts.loading}
                        error={posts.error}
                    /> */}
                </div>

            </div>
        </>
    )
}

export default connect((state) => ({
    posts: getPosts(state),
}), {
    initPosts: loadPosts.started
})(PostDetails);