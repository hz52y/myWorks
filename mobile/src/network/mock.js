import Mock from "mockjs";

const r = Mock.Random;

let data = [];

for (let i = 0; i < 30; i++) {
  const obj = {
    id: r.guid(),
    img: r.dataImage("300x100", "手机"),
    name: r.ctitle(2, 3),
    price: r.natural(1000, 3000),
    desc: r.cparagraph(5),
    total: r.natural(10, 20),
  };

  data.push(obj);
}
Mock.mock("https://app/home", "get", data);
