import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  //日付の形式とタイムゾーンの変換
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const date = `${d.getDate()}`.padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
  }

  const dates = Array.from(new Set(input.map(({ createdAt }) => createdAt)));
  dates.sort();

  const count = { tweet: {}, retweet: {} };
  for (const d of dates) {
    count.tweet[d] = 0;
    count.retweet[d] = 0;
  }

  for (const { createdAt, isRetweet } of input) {
    if (isRetweet) {
      count.retweet[createdAt] += 1;
    } else {
      count.tweet[createdAt] += 1;
    }
  }

  return ["tweet", "retweet"].map((types) => {
    return {
      id: types,
      data: dates.map((d) => {
        return{
          x: d,
          y: count[types][d],
        }
      })
    }
  }); // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
