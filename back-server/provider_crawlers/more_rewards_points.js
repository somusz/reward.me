let request = require('request');

function getMoreRewardPoints(program){
  return new Promise((resolve, reject) => {
    let {membership_id} = program;
    if (membership_id){
      // console.log('sending request to MR/api', membership_id)
      request('https://www.morerewards.ca/api/mr-points/ajax/' + membership_id , function(err, res, body){
        if (err) {
          console.error(err);
          reject("error fetching from morerewards points 'api'");
        } else {
          const {pointsBalance} = JSON.parse(body);
          // console.log('received body:', body)
          // console.log('pointsBalance', pointsBalance)
          resolve({'1': pointsBalance});
        }
      })
    } else {
      reject("bad membership_id")
      // console.error("Error: no membership ID")
    }
  })
}

// getMoreRewardPoints("48008030967")
module.exports = getMoreRewardPoints;