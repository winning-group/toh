# Angular Tour of Heroes

## Live Demo
A live Demo can be found [http://toh.kihwancho.com](http://toh.kihwancho.com).

## Installation

```
node --version
v11.14.0

yarn install
ng serve
```

## Project Structure

```
.                     
├── src                     
│   ├── app                 # App module
│   │   ├── core            # Core module (services)
│   │   ├── modules         # Feature modules (dashboard, heroes, villains)
│   │   └── shared          # Shared module (shared components, models, utility functions)
│   ├── assets              # Static files (images)
│   └── styles              # Style files (scss)
├── ...
├── angular.json            # Sass support (src/styles.scss)
└── tsconfig.json           # Custom baseUrl and paths
```

## Comments

### Basic Settings
- The project structure has been modified based on Style Guide on Angular.io. 
- `baseUrl` and `paths` have been added in `tsconfig.json` in order to resolve modules.
- Router settings have changed to support lazy loaded feature modules.

### Functionality
- In this assessment, I was focusing on clean code and neat project structure, which also means I tried to avoid over-engineering and didn't add additional business requirements such as validation rules and pixel-perfect styles. 
- `Unsubscribe` component will unsubscribe all of the Observable subscriptions.
- I added unit tests on service level.
- I always organize imports alphabetically to increase readability.

### Style
- I installed `node-sass` and changed `angular.json` to import `src/styles.scss`.
- Instead of having a style file on each component, I made all of the styles under src/styles. Thereby, we can have only one `<style>` tag and all the mixins and variables are sharable across pages.
- I added sass variables to keep the consistency in UI design (margin, gutter, font sizes, breakpoints, color schemes).
- [BEM methodology](http://getbem.com/introduction/) is used for CSS naming convention.

## Usage
1. Fork this repository.
2. Create individual branches within your fork for each question answered.
3. Submit pull requests back to this repository for each submitted question.
4. Notify us once responses are complete and pull requests are submitted.
