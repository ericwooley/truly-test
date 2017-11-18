import { take, call, put } from "redux-saga/effects";
import { actions, actionCreators } from "../actions";
import { watchForLoadContacts, loadContacts, createContactSaga } from "../saga";
import { getContacts } from "../../../services/getContacts";
import { IContact } from "../../../interfaces/contacts";
import { createContact } from "../../../services/createContact";
const {contacts: contactsTestData} = require("../../../../db.testdata.json");
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
      it("should get the the contacts", () => {
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
  describe("create contact", () => { 
    const demoContact: IContact = {
      name: "steve",
      number: "1234567890",
      context: "work"
    };
    const uuid = "e02604b6-5e1d-402b-ae36-a966899fdcd9";
    // using snapshot testing to show the difference
    describe("successful call", () => {
      let iterator: Generator = createContactSaga(demoContact, []);
      it("should optimistically update", () => {
        expect(iterator.next().value).toMatchSnapshot("create-contact-optimistic-update");
      });
      it("should get the contacts", () => {
        expect(iterator.next().value).toEqual(call(createContact, demoContact));
      });
      it("should get replace the old contact with the new contact", () => {
        const contactWithId = {...demoContact, id: uuid};
        expect(iterator.next(contactWithId).value)
          .toMatchSnapshot("remove-old-snapshot");
      });
      it("should reset the new contact", () => {
        expect(iterator.next().value).toMatchSnapshot("create-contact-reset-after");
      });
      it("should close the create contact form", () => {
        expect(iterator.next().value).toMatchSnapshot("create-contact-close-form");
      });
      it("Should be done", () => {
        expect(iterator.next().done).toBeTruthy();
      });
    });
    describe("unsuccessful call", () => {
        it("should ask to retry", () => {
          let iterator: Generator = createContactSaga(demoContact, []);
          iterator.next();
          if (iterator.throw) {
            expect(iterator.throw(new Error("did not work")).value)
              .toEqual(call(confirm, "There was an error creating your new contact, retry?"));
            
          } else {
            throw new Error("something went wrong");
          }
        });

        describe("retry", () => {
          it("should retry on confirm", () => {
            let iterator: Generator; 
            iterator = createContactSaga(demoContact, []);
            iterator.next();
            if (iterator.throw) {
              iterator.throw(new Error("did not work"));
              expect(iterator.next(true).value)
              .toMatchSnapshot("create-contact-error-reset-list");
              expect(typeof iterator.next().value.next).toEqual("function");
            } else {
              throw new Error("something went wrong");
            }
             
          });
          it("should stop when the user does not retry", () => {
            let iterator: Generator; 
            iterator = createContactSaga(demoContact, []);
            iterator.next();
            if (iterator.throw) {
              iterator.throw(new Error("did not work"));
              expect(typeof iterator.next(false).value.next).toEqual("function");
            } else {
              throw new Error("something went wrong");
            }
          });
        });
    });
  });
});
