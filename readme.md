# NodeJS | RC-NODE-310324

An app for cron job simulation in node js.

# Motivations

1. Cron job must be fault taularent. Meaning it can handle server restarts.
2. As sending emails can crowd up the main thread, my solution was to spawn a child process to handle sending email. so the main thread exceution doesn't get affected.

## Run Locally

Clone the project

```bash
  git clone git@github.com:avimonnuarnob/NodeJS-RC-NODE-310324.git
```

Go to the project directory

```bash
  cd NodeJS-RC-NODE-310324
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```
