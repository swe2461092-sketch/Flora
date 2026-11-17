// src/tools/convertFlowersEnMn.js
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./src/data/flowers.json", "utf8"));

const groupMnMap = {
  "Cut Flowers": "Тайрмал цэцэгс",
  "Indoor Potted Plants": "Тасалгааны ваартай цэцэг",
  "Dried & Preserved Flowers": "Хатаасан ба бэхжүүлсэн цэцэг",
};

const originMnMap = {
  Netherlands: "Нидерланд",
  Ecuador: "Эквадор",
  "South Korea": "Өмнөд Солонгос",
  France: "Франц",
  Mongolia: "Монгол",
};

const occasionMnMap = {
  "Valentine's Day, Anniversary": "Гэгээн хайрын өдөр, Ойн баяр",
  "Wedding, Bridal Bouquet": "Хурим, Сүйт бүсгүйн баглаа",
  "Housewarming, Office Gift": "Шинэ байрны найр, Албан байгууллагын бэлэг",
  "Home Decor, Relaxation Gift": "Гэрийн чимэглэл, Тайвшруулах бэлэг",
};

const meaningMnMap = {
  "Deep love and romance": "Гүн хайр дурлал ба романтик сэтгэл",
  "Purity, prosperity, and honor": "Ариун нандин чанар, элбэг дэлбэг байдал",
  "Elegance, luxury, and long-lasting beauty": "Эрхэмсэг тансаг байдал, урт удаан гоо үзэсгэлэн",
  "Serenity, grace, and calmness": "Амар амгалан, нигүүлсэнгүй сэтгэл",
};

function toLangObject(enVal, mnVal = "") {
  return { en: enVal || "", mn: mnVal || enVal || "" };
}

const output = data.map((item) => ({
  flower_code: item.flower_code,
  flower_group: toLangObject(item.flower_group, groupMnMap[item.flower_group]),
  flower_name: toLangObject(item.flower_name, item.native_name),
  scientific_name: item.scientific_name,
  origin: toLangObject(item.origin, originMnMap[item.origin]),
  pricing_stock: item.pricing_stock,
  care_requirements: item.care_requirements,
  botanical_details: item.botanical_details,
  origin_information: {
    Supplier: item.origin_information?.Supplier || "",
    "Arrival date": item.origin_information?.["Arrival date"] || "",
    "Care note": item.origin_information?.["Care note"] || "",
  },
  bouquet_suitability: {
    Occasion: toLangObject(item.bouquet_suitability?.Occasion, occasionMnMap[item.bouquet_suitability?.Occasion]),
    "Color meaning": toLangObject(item.bouquet_suitability?.["Color meaning"], meaningMnMap[item.bouquet_suitability?.["Color meaning"]]),
  },
}));

fs.writeFileSync("./src/data/flowersEnMn.json", JSON.stringify(output, null, 2), "utf8");
console.log("flowersEnMn.json амжилттай үүслээ!");
