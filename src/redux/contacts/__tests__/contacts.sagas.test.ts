import { take, call, put } from "redux-saga/effects";
import { actions, actionCreators } from "../actions";
import { watchForLoadContacts, loadContacts } from "../saga";
import { getContacts } from "../../../services/getContacts";
const {contacts: contactsTestData} = require("../../../../db.json");
describe("contacts sagas", () => {
  describe("watchForLoadContacts", () => {
    const iterator = watchForLoadContacts();
    let loadContactsIterator: Generator;
    it("should wait for the load contacts action", () => {
      expect(iterator.next().value).toEqual(take(actions.loadContacts));
    });
    it("should return the load contacts generator", () => {
      loadContactsIterator = iterator.next().value;
      expect(typeof loadContactsIterator.next).toBe("function");
    });
  });
  describe("loadContacts", () => { 
    describe("successful call", () => {
      let loadContactsIterator = loadContacts();
      it("should get the contacts", () => {
        expect(loadContactsIterator.next().value).toEqual(call(getContacts));
      });
      it("should get the put the contacts", () => {
        expect(loadContactsIterator.next(contactsTestData).value)
          .toEqual(put(actionCreators.setContacts(contactsTestData)));
      });
    });
    describe("unsuccessful call", () => {
      it("should confirm to retry", () => {
        let loadContactsIterator: Generator = loadContacts();
        if (loadContactsIterator.throw) {
          loadContactsIterator.next();
          expect(loadContactsIterator.throw(new Error("did not work")).value)
            .toEqual(call(confirm, "There was an error loading contacts, retry?"));
          expect(typeof loadContactsIterator.next(true).value.next).toEqual("function");
        } else {
          throw new Error("something went wrong");
        }
      });
      it("should stop when the user does not retry", () => {
        let loadContactsIterator: Generator = loadContacts();
        if (loadContactsIterator.throw) {
          loadContactsIterator.next();
          expect(loadContactsIterator.throw(new Error("did not work")).value)
            .toEqual(call(confirm, "There was an error loading contacts, retry?"));
          expect(loadContactsIterator.next(false).done).toEqual(true);
        } else {
          throw new Error("something went wrong");
        }
      });
    });
  });
});
