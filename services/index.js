import * as dotenv from 'dotenv'
import axios from 'axios'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { TwitterApi } from 'twitter-api-v2'

dotenv.config()

/*
 * This function is used to call the News API
 */
const getNews = async function () {
  const url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}&category=technology&language=en`

  // use the url to get the list of news
  const res = await axios.get(url)
  // console.log(res.data.articles)
  return res.data.articles
}

/*
 * This function is used to call the OpenAI's API using LangChain
 */
const translateText = async function (contentToAsk) {
  const chat = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4o-mini',
    temperature: 0.3
  })

  const template = `
    As PidginGPT, translate the following English text into Pidgin English.
    Include relevant hashtags. The response must be between 250-280 characters with no line breaks.
    
    Text to translate: {text}
  `

  const prompt = PromptTemplate.fromTemplate(template)
  const formattedPrompt = await prompt.format({ text: contentToAsk })

  const response = await chat.invoke(formattedPrompt)
  return response
}

/*
 * This function is used to post a tweet to twitter
 */
const postTweet = async function (tweet) {
  // Create a new instance of the TwitterApi class
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  // Get the read-write client from the twitterConfig
  const rwClient = client.readWrite

  try {
    await rwClient.v2.tweet(tweet)
    console.log(`🟢 Successfully posted the tweet: \n ${tweet} \n`)
  } catch (error) {
    console.log(`🔴 Error posting the tweet ${error}`)
  }
}

/*
 * This function to get news, translate the news and post the tweet
 */
export const translateAndPostNews = async function () {
  try {
    const news = await getNews()
    const newsTitles = news.map((i) => i.title)
    const randomNewsTitle =
      newsTitles[Math.floor(Math.random() * newsTitles.length)]

    const aiResponse = await translateText(randomNewsTitle)
    const truncatedAiMessage = aiResponse.content.substring(0, 275)

    // post the truncated message to twitter
    // TODO: uncomment the line below postTweet
    // await postTweet(truncatedAiMessage)
    console.log(truncatedAiMessage)
  } catch (err) {
    console.log(err)
    return { message: '🔴 Whahala don happen! ' }
  }
}
