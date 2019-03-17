# Dashboard for Xebikart project

React
Communicates with backend via Server Side Events

---

## Howto to run it ?

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

## Howto build it ?

Using `Make`, `Yarn` and `Docker`:

```bash
make docker
```

Using `Make` inside a `Docker` build container:

```bash
make docker DOCKERIZE=1
```

if you would like to specify a version to your image, you could use `VERSION`
argument like this :

```bash
make docker VERSION=dev
```

it will produce an image with following tag : `xebikart/dashboard:dev`

## Architectural Decision Records

You may find ours [ADR in this directory](doc/adr) :

* [Use SSE as echange data technology between back and front](doc/adr/001-use-SSE-as-exchange-data-technology-between-back-and-front.md)
* [Where store backend source code](doc/adr/002-where-store-code-of-backend.md)


## Communication

You could join us on slack `xebiafr` channel `#xebikart-dashboard` or by mention `@xebikart-team-dashboard` .
