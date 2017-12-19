let request = require('request');

function getMoreRewardPoints(membershipID, callback){
  request('https://www.morerewards.ca/api/mr-points/ajax/' + membershipID , function(err, res, body){
    if (err) {
      console.error(err);
    } else {
      const {pointsBalance} = JSON.parse(body);
      callback(pointsBalance);
    }
  })
}

// getMoreRewardPoints("48008030967")
module.exports = getMoreRewardPoints;