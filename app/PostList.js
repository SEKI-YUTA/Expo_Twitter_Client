import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log("response: ");
      console.log(res.data);
      console.log("----------------");
      setPosts(res.data);
    });
  }
  return (
    <ScrollView>
      {posts.map((item, index) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PostList;
