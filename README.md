

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>


<!-- GETTING STARTED -->
## Getting Started

Simple NodeJS application that makes outbound calls to https://httpstat.us/ website for a few different status codes.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* docker desktop
* local port 8080 should not be in use


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/mundra/sample_nodejs_app.git
   ```
3. Docker build & run
   ```sh
   docker build . -t sample_nodejs_app
   docker run -it sample_nodejs_app

   ```

<!-- USAGE EXAMPLES -->
## Usage

Drive the load on the sample NodeJS application by executing the following command in the terminal.

   ```sh
   while true; do curl http://localhost:8080/hello; sleep 30; done
   ```

or navigate via the browser at http://localhost:8080/hello endpoint.
