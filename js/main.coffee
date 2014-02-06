app = new Vue(
    el: "#app"
    data:
        activeSubreddit: "all"
        subredditsList: [
            "all"
            "askreddit"
            "starbound"
        ]
        subreddits: {}

    methods:
        selectSubreddit: (e) ->
            # Select our subreddit
            @activeSubreddit = e.el.innerText.toLowerCase()
            app.$emit "subreddit switch", e.el.innerText.toLowerCase()
            return
)

# Get data from subreddit
loadSubredditData = ->
    # Convert arguments into a prroper array
    args = Array.prototype.slice.call(arguments)

    # Loop through the arguments
    args.forEach (value) ->
        reqwest
            url: "http://api.reddit.com/r/" + value.toLowerCase() + ".json"
            method: "GET"
            type: "jsonp"
            jsonpCallback: "jsonp"
            success: (res) ->
                app.subreddits[value] = res.data.children.map((item) ->
                    item.data
                )
                app.$emit "subreddit load data", value.toLowerCase()

# Get subreddit data on startup
loadSubredditData "all", "askreddit", "starbound"

# Log some stuff
app.$on "subreddit switch", (subreddit) ->
    console.log "Switching to /r/" + subreddit
    return

app.$on "subreddit load data", (subreddit) ->
    console.log "Loading data for /r/" + subreddit
    return
