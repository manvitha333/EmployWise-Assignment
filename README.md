EmployWise Frontend

This is the frontend of the EmployWise project, built using Next.js and React.js.

Getting Started

Prerequisites

Make sure you have Node.js installed on your machine.

Download and install Node.js

Install dependencies using npm, yarn, or pnpm

Installation

Clone the repository:

git clone https://github.com/your-username/employwise-frontend.git
cd employwise-frontend

Install dependencies:

npm install  # or yarn install or pnpm install

Start the development server:

npm run dev  # or yarn dev or pnpm dev

Open http://localhost:3000 in your browser.

Project Structure
📦 employwise-frontend
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 login
│   │   │   ├── 📜 page.js
│   │   ├── 📂 users
│   │   │   ├── 📜 page.js
│   │   ├── 📜 favicon.ico
│   │   ├── 📜 globals.css
│   │   ├── 📜 layout.js
│   │   ├── 📜 page.js
│   ├── 📂 components
│   │   ├── 📜 EditUserModal.js
│   ├── 📂 utils
│   │   ├── 📜 api.js
├── 📜 .gitignore
├── 📜 eslint.config.mjs
├── 📜 jsconfig.json
├── 📜 next.config.mjs
├── 📜 package-lock.json
├── 📜 package.json
├── 📜 postcss.config.mjs
├── 📜 README.md


Features

Next.js (React framework) for fast performance

Tailwind CSS for styling

API Integration with ReqRes API for fetching employee data

Dynamic Routing for user profiles

Responsive Design

API Usage

This project fetches employee data from the ReqRes API. Ensure your next.config.js allows remote images:

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reqres.in',
      },
    ],
  },
};

export default nextConfig;

Deployment

You can deploy this project using Vercel:

vercel

Contributing

Feel free to contribute! Fork the repo and submit a pull request.

License

This project is licensed under the MIT License.




