import { publicFileURL } from "../util/path.js";
import { RiceBreed } from "./rice_rules.js";

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURLToRiceDetail(rice) {
  return riceDetailURLs.get(rice.name)
}

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURLToRiceImage(rice) {
  return publicFileURL("/img/rices/" + rice.name)
}

const riceDetailURLs = new Map()
riceDetailURLs.set("กข 1", "https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%821.pdf")
riceDetailURLs.set("กข 12 (หนองคาย 80)", "https://www.ricethailand.go.th/rkb3/03%E0%B8%81%E0%B8%8212%20(%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B2%E0%B8%A2%2080).pdf")
riceDetailURLs.set("กข 41", "https://www.ricethailand.go.th/rkb3/14%20%E0%B8%81%E0%B8%8241.pdf")
riceDetailURLs.set("กข 43", "https://www.ricethailand.go.th/rkb3/15%E0%B8%81%E0%B8%8243.pdf")
riceDetailURLs.set("กข 47", "https://www.ricethailand.go.th/rkb3/16%E0%B8%81%E0%B8%8247.pdf")
riceDetailURLs.set("กข 49", "https://www.ricethailand.go.th/rkb3/17%E0%B8%81%E0%B8%8249.pdf")
riceDetailURLs.set("กข 57", "https://www.ricethailand.go.th/rkb3/20%E0%B8%81%E0%B8%82%2057.pdf")
riceDetailURLs.set("กข 6", "https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%826%20(RD6).pdf")
riceDetailURLs.set("กข 61", "https://www.ricethailand.go.th/rkb3/21%E0%B8%81%E0%B8%8261.pdf")
riceDetailURLs.set("กข 63", "https://www.ricethailand.go.th/rkb3/22%E0%B8%81%E0%B8%8263.pdf")
riceDetailURLs.set("กข 65", "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/154-65")
riceDetailURLs.set("กข 69", "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/155-69")
riceDetailURLs.set("กข 71", "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/84-71")
riceDetailURLs.set("กข 81", "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-22-11-21-41?id=171")
riceDetailURLs.set("กข 83", "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-22-11-21-41?id=172")
riceDetailURLs.set("กข-แม่โจ้ 2", "https://www.ricethailand.go.th/rkb3/05%E0%B8%81%E0%B8%82%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B9%82%E0%B8%88%E0%B9%892.pdf")
riceDetailURLs.set("กข15", "https://www.ricethailand.go.th/rkb3/03%E0%B8%81%E0%B8%8215.pdf")
riceDetailURLs.set("กข 35 (รังสิต 80)", "https://www.ricethailand.go.th/rkb3/05%E0%B8%81%E0%B8%8235%20%E0%B8%A3%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%9580.pdf")
riceDetailURLs.set("กข 5", "https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%825.pdf")
riceDetailURLs.set("กข 51", "https://www.ricethailand.go.th/rkb3/06%E0%B8%81%E0%B8%8251.pdf")
riceDetailURLs.set("กข 59", "https://www.ricethailand.go.th/rkb3/07%E0%B8%81%E0%B8%8259.pdf")
riceDetailURLs.set("กข 73", "https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=142.htm")
riceDetailURLs.set("กข 75", "https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=143.htm")
riceDetailURLs.set("กข 79", "https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=145.htm")
riceDetailURLs.set("กำผาย 15", "https://www.ricethailand.go.th/rkb3/07%E0%B8%81%E0%B8%B3%E0%B8%9C%E0%B8%B2%E0%B8%A2%2015%20(Gam%20Pai%2015).pdf")
riceDetailURLs.set("ขาวดอกมะลิ 105", "https://www.ricethailand.go.th/rkb3/09%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A1%E0%B8%B0%E0%B8%A5%E0%B8%B4%20105.pdf")
riceDetailURLs.set("ชุมแพ 60", "https://www.ricethailand.go.th/rkb3/14%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B9%81%E0%B8%9E%2060.pdf")
riceDetailURLs.set("ปทุมธานี 1", "https://www.ricethailand.go.th/rkb3/27%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5%201.pdf")
riceDetailURLs.set("เผือกน้ำ 43", "https://www.ricethailand.go.th/rkb3/18%E0%B9%80%E0%B8%9C%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%99%E0%B9%89%E0%B8%B3%2043.pdf")
riceDetailURLs.set("พัทลุง 60", "https://www.ricethailand.go.th/rkb3/21%E0%B8%9E%E0%B8%B1%E0%B8%97%E0%B8%A5%E0%B8%B8%E0%B8%87%2060.pdf")
riceDetailURLs.set("พิษณุโลก 2", "https://www.ricethailand.go.th/rkb3/30%E0%B8%9E%E0%B8%B4%E0%B8%A9%E0%B8%93%E0%B8%B8%E0%B9%82%E0%B8%A5%E0%B8%81%202.pdf")
riceDetailURLs.set("พิษณุโลก 3", "https://www.ricethailand.go.th/rkb3/22%E0%B8%9E%E0%B8%B4%E0%B8%A9%E0%B8%93%E0%B8%B8%E0%B9%82%E0%B8%A5%E0%B8%81%203.pdf")
riceDetailURLs.set("หอมกระดังงา 59", "https://www.ricethailand.go.th/rkb3/27%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%87%E0%B8%87%E0%B8%B2%2059.pdf")
riceDetailURLs.set("เหมยนอง 62 เอ็ม", "https://www.ricethailand.go.th/rkb3/09%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%87%2062%20%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%20(%20Muey%20Nawng%2062%20M%20).pdf")
riceDetailURLs.set("ตะเภาแก้ว 161", "https://www.ricethailand.go.th/rkb3/01%E0%B8%95%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%20161%20(Ta%20%E2%80%93%20pow%20Gaew%20161).pdf")
riceDetailURLs.set("นางฉลอง", "https://www.ricethailand.go.th/rkb3/02%E0%B8%99%E0%B8%B2%E0%B8%87%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87%20(Nahng%20Cha%20%E2%80%93%20lawng).pdf")
riceDetailURLs.set("ปิ่นแก้ว 56", "https://www.ricethailand.go.th/rkb3/03%E0%B8%9B%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%2056%20(Pin%20Gaew%2056).pdf")
riceDetailURLs.set("พลายงามปราจีนบุรี", "https://www.ricethailand.go.th/rkb3/04%E0%B8%9E%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%20(Plai%20Ngahm%20Prachin%20Buri).pdf")
riceDetailURLs.set("เล็บมือนาง 111", "https://www.ricethailand.go.th/rkb3/05%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%9A%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%B2%E0%B8%87%20111%20(Leb%20Meu%20Nahng%20111).pdf")
riceDetailURLs.set("ขาวบ้านนา 432", "https://www.ricethailand.go.th/rkb3/06%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B2%20432%20(Khao%20Bahn%20Nah%20432).pdf")
riceDetailURLs.set("กข 19", "https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%8219%20(RD19).pdf")
riceDetailURLs.set("กข45", "https://www.ricethailand.go.th/rkb3/02%E0%B8%81%E0%B8%8245%20(RD45).pdf")
riceDetailURLs.set("หันตรา 60", "https://www.ricethailand.go.th/rkb3/03%E0%B8%AB%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B260.pdf")
riceDetailURLs.set("ปราจีนบุรี 1", "https://www.ricethailand.go.th/rkb3/04%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%201%20(Prachin%20Buri%201).pdf")
riceDetailURLs.set("ปราจีนบุรี 2", "https://www.ricethailand.go.th/rkb3/05%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%202%20(Prachin%20Buri%202).pdf")
riceDetailURLs.set("อยุธยา 1", "https://www.ricethailand.go.th/rkb3/06%E0%B8%AD%E0%B8%A2%E0%B8%B8%E0%B8%98%E0%B8%A2%E0%B8%B2%201%20(Ayutthaya%201).pdf")
riceDetailURLs.set("กข17", "https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%8217%20(RD17).pdf")
riceDetailURLs.set("กู้เมืองหลวง", "https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87%20(Goo%20Meuang%20Luang).pdf")
riceDetailURLs.set("ขาวโป่งไคร้", "https://www.ricethailand.go.th/rkb3/02%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%84%E0%B8%A3%E0%B9%89%20(Khao%20Pong%20Krai).pdf")
riceDetailURLs.set("เจ้าฮ่อ", "https://www.ricethailand.go.th/rkb3/03%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%AE%E0%B9%88%E0%B8%AD%20(Jow%20Haw).pdf")
riceDetailURLs.set("ซิวแม่จัน", "https://www.ricethailand.go.th/rkb3/04%E0%B8%8B%E0%B8%B4%E0%B8%A7%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%88%E0%B8%B1%E0%B8%99%20(Sew%20Mae%20Jan).pdf")
riceDetailURLs.set("ดอกพะยอม", "https://www.ricethailand.go.th/rkb3/05%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%9E%E0%B8%B0%E0%B8%A2%E0%B8%AD%E0%B8%A1%20(Dawk%20Pa-yawm).pdf")
riceDetailURLs.set("น้ำรู", "https://www.ricethailand.go.th/rkb3/06%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B9%20(Nam%20Roo).pdf")
riceDetailURLs.set("เจ้าลีซอสันป่าตอง", "https://www.ricethailand.go.th/rkb3/07%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%A5%E0%B8%B5%E0%B8%8B%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87%20(Jow%20Lisaw%20San-pah-tawng).pdf")
riceDetailURLs.set("เจ้าขาวเชียงใหม่", "https://www.ricethailand.go.th/rkb3/08%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20(Jow%20Khao%20Chiangmai).pdf")
riceDetailURLs.set("ข้าวเหนียวลืมผัว", "https://www.ricethailand.go.th/rkb3/09%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%A5%E0%B8%B7%E0%B8%A1%E0%B8%9C%E0%B8%B1%E0%B8%A7.pdf")
riceDetailURLs.set("อาร์ 258", "https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=94.htm")
riceDetailURLs.set("ข้าวหอมแดง", "https://www.ricethailand.go.th/rkb3/01%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%94%E0%B8%87%20(Red%20Hawn%20Rice).pdf")
riceDetailURLs.set("สังข์หยดพัทลุง", "https://www.ricethailand.go.th/rkb3/02%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B9%8C%E0%B8%AB%E0%B8%A2%E0%B8%94%E0%B8%9E%E0%B8%B1%E0%B8%97%E0%B8%A5%E0%B8%B8%E0%B8%87%20(Sang%20Yod%20Phattalung).pdf")
riceDetailURLs.set("ข้าวหอมกุหลาบแดง", "https://www.ricethailand.go.th/rkb3/01%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%81%E0%B8%B8%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%9A%E0%B9%81%E0%B8%94%E0%B8%87%20(Red%20Rose%20Rice).pdf")
riceDetailURLs.set("กวก. 1", "https://www.ricethailand.go.th/rkb3/01%20%E0%B8%81%E0%B8%A7%E0%B8%81.1.pdf")
riceDetailURLs.set("กวก. 2", "https://www.ricethailand.go.th/rkb3/02%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%8D%E0%B8%B5%E0%B9%88%E0%B8%9B%E0%B8%B8%E0%B9%88%E0%B8%99%20%E0%B8%81%E0%B8%A7%E0%B8%81.2%20(Khao%E2%80%99Yipun%20DOA2).pdf")
riceDetailURLs.set("สะเมิง 1 (ข้าวบาร์เลย์)", "https://www.ricethailand.go.th/rkb3/01%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%201%20(Samerng%201).pdf")
riceDetailURLs.set("สะเมิง 2 (ข้าวบาร์เลย์)", "https://www.ricethailand.go.th/rkb3/02%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%202%20(Samerng%202).pdf")
riceDetailURLs.set("ซีพี 304", "https://www.ricethailand.go.th/rkb3/%E0%B8%8B%E0%B8%B5%E0%B8%9E%E0%B8%B5%20304%20(CP%20304).pdf")
riceDetailURLs.set("กขผ 1", "https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%82%E0%B8%9C1.pdf")
riceDetailURLs.set("กขผ 3", "https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%82%E0%B8%9C3%20(RDP3).pdf")
riceDetailURLs.set("สะเมิง 1 (ข้าวสาลี)", "https://www.ricethailand.go.th/rkb3/%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%201%20(Samerng%201).pdf")
riceDetailURLs.set("สะเมิง 2 (ข้าวสาลี)", "https://www.ricethailand.go.th/rkb3/%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%202%20(Samerng%202).pdf")
riceDetailURLs.set("แพร่ 60", "https://www.ricethailand.go.th/rkb3/%E0%B9%81%E0%B8%9E%E0%B8%A3%E0%B9%88%2060.pdf")
riceDetailURLs.set("ฝาง 60", "https://www.ricethailand.go.th/rkb3/%E0%B8%9D%E0%B8%B2%E0%B8%87%2060%20(Fahng%2060).pdf")