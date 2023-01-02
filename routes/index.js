var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let products=[
{
name:"Iphone 11",
category:"Mobile",
description:"This is good phone,made in india",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfyK0Kn9FbsnuRkyL9-c762FKlWoZK7WMkQ&usqp=CAU"
},
{
  name:"Mi Note 9 Pro",
  category:"Mobile",
  description:"This is good phone,made in india",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzynWzriM0mQCUvBPp8iM4sfRSL1i_L92FJYeDWzPsBmoJnxdvRJ7--7yvF1VzpzAk57s&usqp=CAU"
  },
  {
    name:"One Plus 7T",
    category:"Mobile",
    description:"This is good phone,made in india",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfyK0Kn9FbsnuRkyL9-c762FKlWoZK7WMkQ&usqp=CAU"
    },
    {
      name:"Oppo 10x",
      category:"Mobile",
      description:"This is good phone,made in india",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs1xRY_VDzybhXZFecEuB50zgEb1VWDgI7ng&usqp=CAU"
      }

  ]
  res.render('index', { products,admin:true});
});

module.exports = router;
