# Angular Tour of Heroes

This repository is a point in time copy of Angular's famous [Tour of Heroes](https://angular.io/tutorial) tutorial. It serves as a controlled baseline for technical tests for Winning Group front end developer roles.  A live demo of the current version can be found [here](https://winning-group.github.io/toh).

## Usage

1. Fork this repository.
2. Create individual branches within your fork for each question answered.
3. Submit pull requests back to this repository for each submitted question.
4. Notify us once responses are complete and pull requests are submitted.

## Comments

Observables : I worked with manual subscriptions because that's how the base TOH application was working. However, I think it's better to use the async pipe when possible, as this is managing automatically subscriptions/unsubscriptions, thus avoiding potential mistakes.
Reactive form : As I had to add a new field (nemesis) on the hero-detail page, I implemented a reactive form.
Unit tests : I added few unit tests on the features I worked on.
