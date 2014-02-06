var app = new Vue({
    el: "#app",
    data: {
        activeSubreddit: "all",
        subredditsList: ["all", "askreddit", "starbound"],
        subreddits: {}
    },
    methods: {
        selectSubreddit: function(e) {
            // Select our subreddit
            this.activeSubreddit = e.el.innerText.toLowerCase()
            app.$emit("subreddit switch", e.el.innerText.toLowerCase());
        }
    }
})

// Get data from subreddit
getSubredditData = function(subreddit, callback) {
    reqwest({
        url: "http://api.reddit.com/r/" + subreddit + ".json", 
        method: "GET",
        type: "jsonp",
        jsonpCallback: "jsonp",
        success: function(res) {
            callback(res.data);
            app.$emit("subreddit download", subreddit);
        }
    });
}

// Get subreddit data on startup
getSubredditData("all", function(data) {
    data.children = data.children.map(function(item) {
        console.log(item.data)
        return item.data;
    });
    app.subreddits.all = data.children;
});

// Log some stuff
app.$on("subreddit switch", function(subreddit) {
    console.log("Switching to subreddit /r/" + subreddit);
});
