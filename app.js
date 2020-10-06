const csv = require('csv-parser')
const fs = require('fs')
const url = 'https://bfhl-hrx-web-app-staging.healthrx.co.in/healthrx-prime/'
const results = []
fs.createReadStream('hemi-offers.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach(obj => {
        console.log(obj)
        obj.coupons = obj.coupons.split(',').map(item=> item.trim())
        obj.offer_details = obj.offer_details.split('\n').map(item=> item.trim())
        obj.top_offers = obj.top_offers.toLowerCase() === 'true' ? true : false
        obj.icon_url = url + obj.icon_url
        obj.banner_url = url + obj.banner_url
    })
    let json = JSON.stringify(results)
    fs.writeFileSync('output.json', json)
  })