import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/collections/TasksCollection";

const insertTask = (taskText) => TasksCollection.insert({ text: taskText });

const SEED_USERNAME = "lxl";
const SEED_PASSWORD = "123";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
});
