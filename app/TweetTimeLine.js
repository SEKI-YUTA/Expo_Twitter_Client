import {
  View,
  ScrollView,
  Text,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { TWITTER_TOKEN } from "../env";

// https://api.twitter.com/2/users/1241957402489937920/tweets?max_results=100&tweet.fields=public_metrics

const { width, height } = Dimensions.get("window");
const token = TWITTER_TOKEN;
const TweetTimeLine = () => {
  const [timelineData, setTimelineData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.twitter.com/2/users/1241957402489937920/tweets", {
        params: {
          max_results: 100,
          "tweet.fields": "public_metrics",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setTimelineData(Array.from(res.data.data));
      });
  }, []);

  return (
    <View style={styles.timelineBox}>
      {/* <Text>TweetTimeLine</Text>
      <Button title="fetch" onPress={() => console.log("pressed!")} /> */}
      <ScrollView>
        <View style={{ height: 20 }} />
        {timelineData.map((item, index) => {
          return (
            <View style={styles.tweetItem} key={index}>
              <Text>{item.text}</Text>
              <View style={styles.metrics}>
                <View style={styles.metricsItem}>
                  <AntDesign name="message1" size={16} color="black" />
                  {parseInt(item.public_metrics.reply_count) > 0 ? (
                    <Text style={styles.txtGrey}>
                      {item.public_metrics.reply_count}
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={styles.metricsItem}>
                  <AntDesign name="retweet" size={16} color="grey" />
                  {parseInt(item.public_metrics.retweet_count) > 0 ? (
                    <Text style={styles.txtGrey}>
                      {item.public_metrics.retweet_count}
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={styles.metricsItem}>
                  <AntDesign name="hearto" size={16} color="grey" />
                  {parseInt(item.public_metrics.like_count) > 0 ? (
                    <Text style={styles.txtGrey}>
                      {item.public_metrics.like_count}
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={styles.metricsItem}>
                  <AntDesign name="sharealt" size={16} color="grey" />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineBox: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    width: width,
    height: height,
  },
  tweetItem: {
    padding: 5,
    margin: 10,
    borderTopWidth: 1,
    borderColor: "#333333",
  },
  metrics: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  metricsItem: {
    width: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtGrey: {
    color: "#333333",
  },
});

export default TweetTimeLine;
