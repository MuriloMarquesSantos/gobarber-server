## Go Barber Server

This project is the server of [Go Barber Web](https://github.com/MuriloMarquesSantos/gobarber-web)

It is a server that exposes APIs which enable users to manage appointments and system users.  

## Functionalities to be added

- [ ] Unit tests
- [ ] Integration Tests
- [ ] CI/CD with Git actions
- [ ] Postman Documentation

# Architectural decisions

- We are following **Clean architecture** best practices and using **TDD** as much as possible

# Technologies used

- NodeJS
- Express
- Typescript
- Postgres
- TypeORM
- BcryptJS

## Project structure

```
Project
├── src
|   ├── @types: Typescript additional configurations.
│   ├── config: Configuration files such as authentication.
│   ├── modules: Domain logic of each part of the system (Appointments and users)
|       ├── dtos: Contracts to ensure standard communication between layers.
|       ├── infra: HTTP communication and Database module files.
|       ├── repositories: Communication to persistence layer.
|       ├── services: Domain logic.
│   ├── shared: Files that can be used in all domains.
|       ├── container: Dependency injection main file.
|       ├── errors: Application common error files.
|       ├── infra: HTTP communication and Database shared files.
|       ├── providers: Outside app providers such as e-mail and S3 storage.
|
├── ormconfig.json: File that contains configurations of typeorm
├── tsconfig.json: Typescript compiler configurations
├── package.json: File that manages all the dependecies and contains script definitions.
├── jest.config.ts: Test framework configuration file.
├── jest.config.ts: Test framework aux configuration file.

```

## How to build and run

- ```yarn```
- ```yarn dev:server```

## Test the API

You may check how test the api using this link ```https://documenter.getpostman.com/view/4694407/UV5Xid4m```. </br>
Keep in mind that it shall be updated as the system evolves.
## Contribution

Contributions are welcome, feel free to open pull requests or to contact me by e-mail.

