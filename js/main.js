var subredditSelector = new Vue({
    el: "#subredditSelector",
    data: {
        activeSubreddit: "all"
    },
    methods: {
        selectSubreddit: function(e) {
            // Select our subreddit
            this.activeSubreddit = e.el.innerText.toLowerCase()
            console.log("Enabling subreddit", e.el.innerText.toLowerCase())
        }
    }
})
