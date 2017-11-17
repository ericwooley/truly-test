// import { getStore } from "../../store";
import selectors from "../selectors";
const bobBarkerContact = {"name": "Bob Barker", "number": "+12675558080", "context": "work"};
const sueSauceContact = {"name": "Sue S. Sauce", "number": "+16465558080", "context": "personal"};
const mcdanielsMauroContact = {"number": "+17316441809", "context": "salesforce", "name": "Mcdaniels Mauro"};
const backusFerniehirstContact = {"number": "+13175564791", "context": "enemies", "name": "Backus Ferniehirst"};
const testData = [
  bobBarkerContact,
  sueSauceContact,
  mcdanielsMauroContact,
  backusFerniehirstContact
];
describe("selectors", () => {
  describe("Filtering By Search Value", () => {
    it("should filter by name", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: "bob"}
      })).toEqual([bobBarkerContact]);
    });
    it("should filter by number", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: "2675558"}
      })).toEqual([bobBarkerContact]);
    });
    it("should filter by context", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: "salesforce"}
      })).toEqual([mcdanielsMauroContact]);
    });
    it("should match multiple contacts", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: "558080"}
      })).toEqual([bobBarkerContact, sueSauceContact]);
    });
    it("should return all contacts if nothing is searched", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: ""}
      })).toEqual(testData);
    });
    it("should return no contacts if nothing a term is not matched", () => {
      expect(selectors.filteredContacts({
        contacts: {contacts: testData, searchValue: "steve buschemi"}
      })).toEqual([]);
    });
  });
});
