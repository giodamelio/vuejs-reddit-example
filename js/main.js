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
loadSubredditData = function() {
    // Convert arguments to an array
    arguments = Array.prototype.slice.call(arguments);

    // Loop through the arguments
    arguments.forEach(function(value, index) {
        reqwest({
            url: "http://api.reddit.com/r/" + value.toLowerCase() + ".json", 
            method: "GET",
            type: "jsonp",
            jsonpCallback: "jsonp",
            success: function(res) {
                res.data.children = res.data.children.map(function(item) {
                    return item.data;
                });
                app.subreddits[value] = res.data.children;
                app.$emit("subreddit load data", value.toLowerCase());
            }
        });
    });
}

// Get subreddit data on startup
loadSubredditData("all", "askreddit", "starbound")

// Log some stuff
app.$on("subreddit switch", function(subreddit) {
    console.log("Switching to /r/" + subreddit);
});

app.$on("subreddit load data", function(subreddit) {
    console.log("Loading data for /r/" + subreddit);
});

