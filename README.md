<p align="center">
  <img style="float:none" src="http://eclectika.org/war/assets/img/logo.png"/>
</p>

# War of Houses

Online Role Playing game using Angular 2 made for Eclectika 2017, The annual cultural fest of NIT Raipur.

## Getting Started

### About the Game
Aim in the game is simple! Get to the top of leaderboard!
#### What to do?
 - **Claim Items**: Every few minutes you will be able to claim some items on your profile. The counter will be only refreshed when you claim the items.
 
- **Train Your Army**: You can train Army, Giant, Walls and Dragons! Hover over them to know more about their details! [If you don't see a tool-tip after hovering over them, just reload the page]

- **Attack! Attack! Attack!**: So you have trained your perfect army! Now is the time to challenge someone! 

Click Show Leaderboard and choose the number of times you want to attack the person, known as turns!

BEWARE: Remember you will also get hurt in a battle. You will loose your Army, Giant etc. If you loose you will not gain anything. 

If you WIN, You will get bonus Food, Wood and Gold from Enemy House

Keep in mind, You wont get anything if the enemy team has no resources. Suppose if the enemy team has 0 Food, 20 Gold, 12 Wood. Then you will not get any Food as the enemy team is not having any!

### Installing

Copy this repository on you local machine. `cd` into the project folder.

### Installing Dependencies
Run `npm install`. This will install all the dependencies and developer dependencies for the project.

## Configuration
Goto `src/app/shared/config.model.ts`. This file contains various configuration parameters both for production and development env. Modify according to your needs. 
### Development server
Run `ng serve`for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15. Goto angular-cli repository to see all the options available.

## Building and Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Use this for a production build.
```
ng build --prod --aot --base-href="/war"
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue or any other method with the owners of this repository before making a change.

## Authors

- Anand Amrit Raj - *Initial Work* - [anamritraj](https://github.com/anamritraj).

## Licence

This project is licensed under the MIT License.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help about the game logic and discussing furthur changes in the game, contact [me](mailto:hello@anandamritraj.in).

*This README was updated on 07 March, 2017.*
