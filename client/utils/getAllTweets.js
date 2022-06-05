import Profile from "../abi/Profile";
import Tweet from "../abi/Tweet";

const getAllTweets = async (address) => {
  if(!address){
    return [];
  }

  console.log("addr: ", address);

  const profile = Profile(address)

    const tweetsLength = await profile.getTweetsLength();

      const tweetsAddresses = [];
      for (let i = 0; i < tweetsLength.toNumber(); i++) {
        const address = await profile.tweets(i);
        tweetsAddresses.push(address);
      }
      
      const tweets = [];
      for(let i = 0; i < tweetsAddresses.length; i++) {
          const tweet = Tweet(tweetsAddresses[i]);
          const owner = await tweet.owner();
          const text = await tweet.text();
          const time = await tweet.time();
          tweets.push({address:tweetsAddresses[i], owner, text, time});
      }
      console.log(tweets)
      return tweets.reverse();
}

export default getAllTweets;