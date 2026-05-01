Create a basic npm workspaces monorepo for my ExperianShop Ltd.

flag shape
```
{ "key": "new_checkout", "enabled": true, "rules": [ { "if": { "country": "UK", "plan": "pro" }, "then": "variant_a" }, { "if": { "country": "UK" }, "then": "variant_b" }, { "default": "control" } ] }
```

Catalog API (implemented in Shop as Next.js `/api/*` routes)
- `/api/countries` — static string array [UK, France, etc.]
- `/api/plans` — static string array [free, pro]
- `/api/customers/{id}` — static JSON for param id (e.g. `uk-pro`)

App 2 - Shop
Create a Nextjs 15 port 3000 TS Pages Router StyleX app with Module Federation set up to share and consume with App 3
Has one page /product that shows a basic product page for 1 item, a pair of socks.
Needs image (hardcoded), size dropdown (inline data), price, buy button (opens alert)
Create Three visually distinct variants of the buy button, price, product details in folder structure like /components/buy-button/BuyButton.tsx, /components/buy-button/Tests/A/BuyButton.tsx  /components/buy-button/Tests/B/BuyButton.tsx
Import the MF componet from App 3 - TestDecider and use it to determine which component to show.
Set up the MF context from App 3 - FlagContext.  Call `/api/customers/:id` on page load.  Seed a authId cookie with an id from the customers API, then in future use that to call the customers API.
This app will expose the Child Product Page component as a federated module.

App 3 - FlagManager
Create a Nextjs 15 port 3001 TS Pages Router StyleX app with Module Federation set up to share and consume  with App 2

It has API routes:
- /Flags - PUT - Saves flag array of json flags in an in memory dictionary that should preserve between hot module reloads, but doesn't need to persist.
- /Flags - GET - Returns the flags, - seed with 5 flags with varying levels of rule complexity.
- GetFlagsForCustomer - POST - takes a customer record {id: uk-pro, country: uk, plan: pro} and returns flags for that customer [ {key:new_checkout, variant: variant_a } ]
key components:
- FlagConfig - Gets flag data from /Flags - GET, shows them in a right side bar and allows them to be edited.  Use a library that makes formatting and editing/displaying a json array pretty.
- MockCustomer - left side bar - shows a form, selects for country and plans populated from Shop’s `/api/countries` and `/api/plans`.  Shows a select for the Flag keys.  Shows details of the selected flag. Shows if the mock customers set up would return Control/A/B.  Shows the rule that matched.
- Create a React Context called FlagContext.  It has two use cases.
    1) When exposed via module federation and consumed within App 2 it calls the /GetFlagsForCustomer api and initialse the context with its data.
    2) When used within App 3, it takes its data from client side calulating the flags using state from the FlagConfig component and the MockCustomer component.  When these change, it should update the context.
- `<TestDecider key="new_checkout" control=<Comp /> variantA=<CompA /> variantB=<CompB> />` 
    TestDecider reads variant from the Flags context and renders the correct component.  If it rerenders a different one (as the context has now provided a different answer) show a jazzy animation while swapping child components over, to draw attention to it rerendering.
pages: 
- Index page just has a link to /product
- /Product will display the Federated Module of the Product page from App 2. Wrap it in the FlagContext.  Show the two FlagConfig and MockCustomer components either side.
