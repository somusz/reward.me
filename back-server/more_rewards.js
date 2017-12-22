require('dotenv').config();
const ENV            = process.env.ENV || "development";
const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
const knexLogger     = require('knex-logger');


// var $ = require('jQuery');
const https = require('https')
const cheerio = require('cheerio')

knex('deals').where('provider_id', 1).del()

const getMoreRewardDeals = () => {
  https.get("https://www.morerewards.ca/catalogue/all?items_per_page=All", (resp_all) => {
    let data_all = ''

    resp_all.on('data', (chunk) => {
      data_all += chunk
    })

    resp_all.on('end', () => {
      const pageData = cheerio.load(data_all)
      const allDealsFromPage = pageData('.items > li > a').toArray()
      const dealsArray = []
      loopingThroughDeals(allDealsFromPage, pageData)
    })

  }).on("error", (err) => {
    console.log("Error: " + err.message)
  })
}

const loopingThroughDeals = (arrayOfDeals, dataFromPage) => {
  // dealsList.forEach((deal) => {
    console.log('need to loop through', arrayOfDeals.length, 'items')
  for (let i = 0; i < arrayOfDeals.length; i++) {
    let pathToDeal = dataFromPage(arrayOfDeals[i]).attr('href')
    setTimeout( () => {
      console.log('processing item ', i, '/', arrayOfDeals.length)
      getIndividualDealItems(pathToDeal)
    }, 1000 * (1 + i + Math.random()))
  }//)
}

const validation = (deal) => {
  return deal.name && deal.price;
}

const getIndividualDealItems = (path) => {
  https.get(`https://www.morerewards.ca/catalogue/${path}`, (resp_deal) => {
    let data_deal = ''

    resp_deal.on('data', (chunk) => {
      data_deal += chunk
    })

    resp_deal.on('end', () => {
      let dealBox = cheerio.load(data_deal)
      let dealImagePath = dealBox('.image-holder > .img-hold > .img-wrap > picture > img').attr('src')
      let dealImageUrl = dealImagePath ? `https://www.morerewards.ca${dealImagePath}` : "https://www.morerewards.ca/sites/default/files/images/catalogue/6845917075.jpg";
      let dealName = dealBox('.upper-content .title').text().trim()
      let dealDescription = dealBox("p[ng-bind-html='description_primary | toTrusted']").text()
      let dealPriceMessage = dealBox("li[ng-bind-html='buy_points | toTrusted'] a span").text()
      let regex = /[\d,]+/
      let regexResult= regex.exec(dealPriceMessage)
      let dealPrice;
      if (regexResult)
        dealPrice = Number(regexResult[0].replace(',', ''))

      let newDeal = {
        name: dealName,
        description: dealDescription,
        image: dealImageUrl,
        price: dealPrice,
        provider_id: 1
      }

      if (validation(newDeal)){
        console.log('starting knex')
        knex
          .insert(newDeal)
          .into('deals')
          .then( (res) => {
            console.log('adding one item')
          })
      }

    })
  }).on("error", (err) => {
    console.log("Error: " + err.message)
  })
}



module.exports = getMoreRewardDeals()
