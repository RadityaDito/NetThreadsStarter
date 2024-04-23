## <a name="quick-start"> Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/RadityaDito/NetThreadsStarter.git
cd netthreads
```

**Installation**

Install the project dependencies using npm:

Client

```bash
cd NetThreads-Client
npm install
```

Server

```bash
cd NetThreads-Server
npm install
```

**Set Up Environment Variables**

**Client**

Create a new file named `.env.local` in the root of client project and add the following content:

```env
MONGODB_URL=
CLERK_SECRET_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

Replace the placeholder values with the key in the Case Study.

**Server**

Create a new file named `.env` in the root of server project and add the following content:

```env
MONGODB_URL=
PORT=
```

**Running the Project**

**Client**
Switch terminal to the NetThreads-Client directory and run :

```bash
npm run dev
```

**Serber**
Switch terminal to the NetThreads-Server directory and run :

```bash
node index || nodemon index
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the client.
