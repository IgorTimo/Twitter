import profile from "../abi/profile";
import Tweet from "../abi/Tweet";

const getAllTweets = async () => {
    const tweetsLength = await profile.getTweetsLength();

      const tweetsAddresses = [];
      for (let i = 0; i < tweetsLength.toNumber(); i++) {
        const address = await profile.tweets(i);
        tweetsAddresses.push(address);
      }
      
      const tweets = [];
      for(let i = 0; i < tweetsAddresses.length; i++) {
          const tweet = Tweet(tweetsAddresses[i]);
          const text = await tweet.text();
          const time = await tweet.time();
          tweets.push({text, time});
      }
      return tweets.reverse();
}

export default getAllTweets;