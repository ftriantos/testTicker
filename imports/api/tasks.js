import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tokens = new Mongo.Collection('ethereum_price_ticker');

Meteor.methods({

  'tokens.insert'(tick, prce) {
    check(tick, String);
    check(prce, String);

    Tokens.update(
        { token: tick },
        {
          token: tick,
          price: prce,
          time: new Date()
        },
        { upsert: true }
        );
  },
  /*****
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  *****/
});
