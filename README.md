### Description
...

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Node >= 10

### Installation

_If you wish to run the project, you can use the following commands_
1. Install NPM packages
   ```sh
   npm install
   ```
2. Run migration and seed
   ```sh
   npm run migrate
   ```

3. Run the project locally
   ```sh
   npm run dev
   ```

### Deploying

1. Build project
   ```sh
   npm run build
   ```
2. Deploy the project to AWS Lambda
   ```sh
   severless deploy
   ```

### Testing with Jest

   ```sh
   npm run test
   ```
