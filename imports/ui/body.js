import { Template } from 'meteor/templating';

import { Tokens } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
  tokens() {
    return Tokens.find({});
  },
  currentTickerDisplay(){
    return Tokens.findOne({});
    //return "BTC: 0.01";
  },
});



Template.body.events({
  'click .button' (event) {

    var url = 'https://min-api.cryptocompare.com/data/price?fsym=ELLA&tsyms=BTC,USD,EUR,ETH';

    //options = options || {};

    //if(options.extraParams)
    //    url += '&extraParams='+ options.extraParams;


    var updatePrice = function(e, res){

        if(!e && res && res.statusCode === 200) {
            var content = JSON.parse(res.content);

            if(content){
                _.each(content, function(price, key){
                    var name = key.toLowerCase();

                    // make sure its a number and nothing else!
                    if(_.isFinite(price)) {
                        /******
                        EthTools.ticker.upsert(name, {$set: {
                            price: String(price),
                            timestamp: null
                        }});
                        *****/

                        /****
                        var doc = Tokens.findOne({ token: name });
                        Tokens.upsert({ _id: doc._id }, {$set:{token: name, price: String(price)}});
                        *****/

                        /*****
                        Tokens.insert({
                          token: name,
                          price: String(price) // current time
                        });
                        *****/
                        Meteor.call('tokens.insert', name, String(price));
                    }

                });
            }
        } else {
            console.warn('Can not connect to https://mini-api.cryptocompare.com to get price ticker data, please check your internet connection.');
        }
    };

    // update right away
    HTTP.get(url, updatePrice);

  }
});
