import * as dotenv from "dotenv"
import axios from "axios"
import { Configuration, OpenAIApi } from "openai"
import { TwitterApi } from "twitter-api-v2"

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
 * This function is used to call the OpenAI's GPT-3.5-turbo API
 */
const translateText = async function (contentToAsk) {
	const openAiConfig = new Configuration({
		apiKey: process.env.OPENAI_API_KEY
	})
	const openAi = new OpenAIApi(openAiConfig)

	return await openAi.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"As PidginGPT, you are a powerful chatbot that translates English into Pidgin English. All your responses will be in Pidgin English and used to translate news articles for posting on Twitter with hashtags. Your replies must be between 250-280 characters and contain no line breaks. Your primary function is to provide text-only responses for use as tweets."
			},
			{ role: "user", content: contentToAsk }
		],
		temperature: 0.3
	})
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
		// map over all the news and get all the  title from the list of news
		const newsTitles = news.map((i) => i.title)

		// get a random news title
		const randomNewsTitle =
			newsTitles[Math.floor(Math.random() * newsTitles.length)]

		// send the random news title to the AI
		const aiResponse = await translateText(randomNewsTitle)

		// get the first choice from the AI response
		const aiMessage = aiResponse.data.choices[0].message

		// truncate the message to 275 characters for twitter
		const truncatedAiMessage = aiMessage.content.substring(0, 275)

		// post the truncated message to twitter
		await postTweet(truncatedAiMessage)
	} catch (err) {
		console.log(err)
		return { message: "🔴 Whahala don happen! " }
	}
}
