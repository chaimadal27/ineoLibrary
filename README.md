### Installation

#### Requirements
- [Node.js](https://nodejs.org/en/) version _>=16.0.0_
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/)

#### To go with the latest version please copy and past in your terminal the following steps

```
git clone https://github.com/chaiD12/ineoLibrary.git my-project && cd my-project
```

Development mode
```
yarn install && yarn start
```

Production mode
```
yarn install && yarn build
```

#### How to analyze the bundle size
```
yarn install && yarn build --stats
```

And then use the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to open _build/bundle-stats.json_.

#### Workflow 

 1. Create a work branch

```
git pull checkout main
git pull --rebase
git checkout -b [Name_Branch] origin/main
``` 
 2. Work
 3. Sync to the latest main branch 
``` 
git commit -am "."
git fetch 
git merge origin/main --no-edit 
``` 
 4. Upload changes to the repository
``` 
git status 
git add . 
git commit -m '.'
git push -u origin HEAD
``` 

#### Screenshots:

<img src="./.github/screenshots/Screenshot from 2023-09-20 00-02-18.png" alt="screenshot"/>
<img src="./.github/screenshots/Screenshot from 2023-09-20 00-02-28.png" alt="screenshot"/>
