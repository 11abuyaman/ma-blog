import React, { useEffect } from "react";
import PostsList from "../../components/PostsList/PostsList";
import Search from "../../components/Search/Search";
import { MetaTags } from "react-meta-tags";
import HeroSection from "../../components/HeroSection/HeroSection";
import { connect } from "react-redux";
import { loadPosts, updateSearchTerm } from "../../store/recipes/actions.recipes";
import { getPosts, getSearchedTerm, getSearchResults } from "../../store/recipes/selectors.recipes";
import { useSearchParams } from "react-router-dom";

const Homepage = ({ posts, initPosts, searchedTerm, searchResults, updateSearchTerm }) => {
    /**
     * The homepage screen, shows two lists of recipes in addition to a search functionality.
     */

    const HomepageDescription = "A website for finding your next recipe";
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Dispatch fetch sections recipes on mount if no results exist!
        if (posts.recipes.length === 0) {
            initPosts();
        }
    }, [])

    const triggerSearch = (term) => {
        if (term.trim()) {
            updateSearchTerm({ term });
            // fetchSuggestions(term);
            // Update the URL search parameters
            setSearchParams({ search: term });
        }
    }

    return (
        <>
            <MetaTags>
                <title>Da'Recipe - Homepage</title>
                <meta name="description" content={HomepageDescription} />
            </MetaTags>
            <div className="main">
                <HeroSection
                    title="Welcome to Da'Recipe"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    callToActionLabel={<>About us! <i className="las la-long-arrow-alt-right"></i></>}
                    callToActionLink="/about"
                />
                <div className="main-content__grid">
                    <Search
                        triggerSearch={triggerSearch}
                        searchParams={searchParams}
                        searchResults={searchResults}
                        searchedTerm={searchedTerm}
                    />
                    <PostsList
                        numToExpect={8}
                        name="Random recipes"
                        posts={posts.recipes}
                        actionLabel="Reload random recipes"
                        actionComponent={<i className="las la-redo-alt"></i>}
                        actionOnClick={initPosts}
                        loading={posts.loading}
                        error={posts.error}
                    />
                </div>
            </div>
        </>
    )
}

export default connect((state) => ({
    searchResults: getSearchResults(state),
    searchedTerm: getSearchedTerm(state),
    posts: getPosts(state),
}), {
    initPosts: loadPosts.started,
    updateSearchTerm: updateSearchTerm,
})(Homepage);