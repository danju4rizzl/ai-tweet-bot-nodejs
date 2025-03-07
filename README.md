# AI Tech News Twitter Bot

An automated Twitter bot that fetches technology news headlines, translates them to Pidgin English using GPT-3.5-turbo, and posts them on Twitter. The bot runs every 6 hours to keep your Twitter feed updated with the latest tech news in a unique and engaging way.

## Features

- Fetches latest technology news headlines
- Translates news to Pidgin English using OpenAI's GPT-3.5-turbo
- Automatically posts tweets every 6 hours
- Handles Twitter character limits
- Includes relevant hashtags

## Prerequisites

- Node.js installed
- Twitter Developer Account
- OpenAI API Account
- News API Account

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

Create a .env file in the root directory and add your API keys:

NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
PORT=5000

## API Keys Setup

1. News API Key :

   - Sign up at News API
   - Create an API key from your dashboard

2. OpenAI API Key :

   - Create an account at OpenAI
   - Get your API key from API Keys page

3. Twitter API Credentials :

   - Sign up for a Twitter Developer Account
   - Create a new project and app
   - Enable OAuth 1.0a
   - Generate API Key, API Key Secret, Access Token, and Access Token Secret

## Running the Application

Development mode:

```bash
pnpm run dev
```

Production mode:

```bash
pnpm run start
```

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

ISC

## Author

DeejayDev
