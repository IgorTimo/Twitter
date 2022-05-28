import { useState, useEffect, useRef } from "react";
import profile from "../abi/profile";
import provider from "../abi/provider";
import getAllTweets from "../utils/getAllTweets";
import { useRouter } from 'next/router'

const Index = () => {
  const [tweets, setTweets] = useState([]);
  const tweetRef = useRef();
  const router = useRouter();

  useEffect(() => {
    getAllTweets().then(setTweets).catch(console.error);
  }, []);

  const renderTweets = tweets.map((tweet, index) => {
    const time = new Date(tweet.time * 1000);
    return (
      <div key={index}>
        <h3>{tweet.text}</h3>
        <span>{time.toLocaleDateString()}</span>
        <br />
        <span>{time.toLocaleTimeString()}</span>
      </div>
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signer = provider.getSigner();
      const profileWithSigner = profile.connect(signer);
      await profileWithSigner.createTweet(tweetRef.current.value);
      // console.log("tx: ", tx);
      // const response = await tx.wait();
      // console.log("response: ", response);
      // router.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
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
