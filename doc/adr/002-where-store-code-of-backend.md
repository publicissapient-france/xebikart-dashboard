# [short title of solved problem and solution]

* Status: [Proposed]
- Date: 2019-03-17
- Issue: [Github](https://github.com/xebia-france/xebikart-dashboard/issues/4)

## Context and Problem Statement

We need to store the backend source code, but where ?

## Decision Drivers <!-- optional -->

* Easy to build, configure and deploy
* Easy to maintain versions of api consume by frontend and provide by backend

## Considered Options

* [Here], in a subdirectory
* [In another repository]

## Pros and Cons of the Options 

### [Here]

* Good, because we could make changed on backend code and frontend in same PR.
* Good, because we don't have to create another repot, again.
* Bad, because it make build, configuration and deploy more complexe
* Bad, because we must move all frontend code in a subdirectory

### [In another repository]

* Good, because we keep lifecycle of those two component in weak link.
* Bad, because must be aware of version of API consonsume in each side (front and back)
* Bad, because we must create another repository