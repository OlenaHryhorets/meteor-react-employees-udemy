import { Meteor } from 'meteor/meteor';
import { EmployeesCollection } from "/imports/api/employees";
import _ from 'lodash';
import { image, helpers } from 'faker';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Employees collection is empty, add some data
  // use .count() to see number of records in a collection
  if (EmployeesCollection.find({}).count() === 0) {
    // generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      EmployeesCollection.insert({
        name,
        email,
        phone,
        avatar: image.avatar()
      })
    })
  }

  Meteor.publish('employees', function(per_page) {
    // only send to any one who is asking only 20 records
    return EmployeesCollection.find({}, { limit: per_page });
  })
});
