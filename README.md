# Search Flickr Photos

## To Do:

- [x] Base Project with Visual Components, Redux, Router
- [x] Integrate Flickr API (Make sure to NOT commit API_KEY)
- [x] Save Search Results + Show them when searching
- [x] Load More Results (Infinite Scrolling)
- [x] Show modal with caption

## Later:
- [ ] Explain why search results are not shown when typing
- [ ] Prevent duplicate calls on the same query
- [ ] Show API errors to users
- [ ] Responsiveness
- [ ] Image Placeholders 
- [ ] No results empty state
- [ ] Loaders + press enter to search text on no search results
- [ ] Documentation. Documentation. Documentation. 
- [ ] Figure out when Flickr API returns different URL photo formats and handle those cases

## Just for fun:
- [ ] Cache search results for 24 hours
- [ ] Masonry layout either using three columns or the library
- [ ] OLDDDDDDDDD Browser support
- [ ] Tests (why is this in just for fun?)
- [ ] Styled componemts

Sample env.js
```
const ENV = {
    // staging environment
    "NODE_ENV"      : "staging",
    "BASE_URL"      : "https://api.flickr.com/",
    "PUBLIC_URL"    : "YOUR_PUBLIC_URL",
    "API_KEY"       : "YOUR_API_KEY",
    "TIME_OUT"      : 24000
};

module.exports = ENV;
```

