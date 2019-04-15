# XebiKart - Dashboard for Xebikart project

[![CircleCI](https://circleci.com/gh/xebia-france/xebikart-dashboard.svg?style=svg&circle-token=c283d660fd3ba732f794a11339ccecd726440a5a)](https://circleci.com/gh/xebia-france/xebikart-dashboard)

Technical stack:

- React
- Communicates with backend via Server Side Events

---

## Howto to run it?

This dashboard is served by an Nginx server which listen on port `80` (port
currently exposed by the container).

### Properties/Environment varirables

| Name               | Default value | Comment/Descibe                        |
|:-------------------|---------------|----------------------------------------|
| BACKEND_HOST       |               | Hostname of backend to send API request|
| BACKEND_PORT       |               | Port of backend to send API request    |

#### Sample run command with docker

```bash
docker run -d -p 8080:80 -e "BACKEND_HOST=backend.prv" -e "BACKEND_PORT=8080" xebikart/dashboard:dev
```

## How to build it?

Using **Make**, **Yarn** and **Docker**:

```bash
make docker
```

Using Make inside a Docker build container:

```bash
make docker DOCKERIZE=1
```

If you would like to specify a version to your image, you can use `VERSION`
argument like this:

```bash
make docker VERSION=dev
```

It will produce an image with following tag : `xebikart/dashboard:dev`

## Architectural Decision Records

You may find our [ADRs in the doc/adr/ directory](doc/adr):

r [Use SSE as echange data technology between back and
  front](doc/adr/001-use-SSE-as-exchange-data-technology-between-back-and-front.md)

## Communication

You could join us on slack `xebiafr` channel `#xebikart-dashboard` or by
mention `@xebikart-team-dashboard` .

## Continuous Integration

The Continuous Integration for this project is done with
[CircleCI](https://circleci.com/), which is the most awesome SaaS CI at this
moment :)

In the jobs/workflow, we'll make a heavy use of [CircleCI
Orbs](https://circleci.com/orbs/), which is a good thing because we're doing
standard things in a standard way. We're essentially just wrapping calls that
we could do ourselves on whatever other CI out there.
