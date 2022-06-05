import { useState, useEffect, useRef } from "react";
import Profile from "../abi/Profile";
import provider from "../abi/provider";
import getAllTweets from "../utils/getAllTweets";
import { useRouter } from "next/router";
import twitter from "../abi/twitter";

const Index = () => {
  const [tweets, setTweets] = useState([]);
  const [profileAddress, setProfileAddress] = useState("");
  const tweetRef = useRef();
  const userRef = useRef();
  const router = useRouter();

  useEffect(() => {
    getAllTweets(profileAddress).then(setTweets).catch(console.error);
  }, [profileAddress]);

  const renderTweets = tweets.map((tweet, index) => {
    const time = new Date(tweet.time * 1000);

    const handleRetweetClick = async () => {
      try {
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        const twitterWithSinger = twitter.connect(signer);
        const profileAddress = await twitterWithSinger.usersToProfiles(account);
        const profile = Profile(profileAddress);
        const profileWithSigner = profile.connect(signer);
        await profileWithSigner.retweet(tweet.address);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div key={index}>
        <h3>{tweet.text}</h3>
        <span>{time.toLocaleDateString()}</span>
        <br />
        <span>{time.toLocaleTimeString()}</span>
        <br />
        {tweet.owner !== userRef?.current.value && <span>Retweet from {tweet.owner}</span>}
        <br />
        <button onClick={handleRetweetClick}>Retweet</button>
      </div>
    );
  });

  const handleChangeProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      const profileAddress = await twitter.usersToProfiles(
        userRef.current.value
      );
      console.log("profileAddress:", profileAddress);
      setProfileAddress(profileAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProfileClick = async () => {
    try {
      const signer = provider.getSigner();
      const twitterWithSinger = twitter.connect(signer);
      const tx = await twitterWithSinger.createProfile();
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTweetSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!profileAddress) {
        throw new Error("no current address!");
      }
      const profile = Profile(profileAddress);
      console.log("func: ", profile.functions);
      const signer = provider.getSigner();
      const profileWithSigner = profile.connect(signer);
      console.log("tweetRef.current.value ", tweetRef.current.value);
      const tx = await profileWithSigner.createTweet(tweetRef.current.value);
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
      router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleChangeProfileSubmit}>
        <label htmlFor="tweet"></label>
        <input ref={userRef} name="tweet" type="text" />
        <input type="submit" value="Show profile!" />
        <button type="button" onClick={handleCreateProfileClick}>
          Create profile
        </button>
      </form>
      <hr />
      <form onSubmit={handleCreateTweetSubmit}>
        <label htmlFor="tweet"></label>
        <input ref={tweetRef} name="tweet" type="text" />
        <input type="submit" value="Tweet it!" />
      </form>
      <h1>My Twitter.</h1>
      {renderTweets}
    </div>
  );
};

export default Index;
