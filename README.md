# Search Flickr Photos

Bootstrapped using a custom build of CRA - ejected to handle custom env.js file.

This project uses an env.js file from which sensitive data like API_KEY and urls are populated.
This helps maintain different env.js file on the server and local (it is in .gitignore) and manage
staging and production builds easily. 

Here's a sample env.js file you must put in the project root in order to run the project.

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

## To Do:

- [x] Base Project with Visual Components, Redux, Router
- [x] Integrate Flickr API (Make sure to NOT commit API_KEY)
- [x] Save Search Results + Show them when searching
- [x] Load More Results (Infinite Scrolling)
- [x] Show modal with caption

## Later:
- [x] Explain why search results are not shown when typing
- [x] Prevent duplicate calls on the same query
- [ ] Show API errors to users
- [x] Responsiveness
- [ ] Image Placeholders 
- [x] No results empty state
- [ ] Loaders
- [x] press enter to search text on no search results
- [ ] Documentation. Documentation. Documentation. 
- [ ] Figure out when Flickr API returns different URL photo formats and handle those cases
- [ ] Query Based Routing for search
- [ ] Remove Reactstrap Dependency

## Just for fun:
- [ ] Cache search results for 24 hours
- [x] Masonry layout either(sucks when it comes to normal layout) using three columns or the library
       - Can add some nice animations too
- [ ] OLDDDDDDDDD Browser support
- [ ] Tests (why is this in just for fun?)
- [ ] Styled components


