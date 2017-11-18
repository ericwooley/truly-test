import { call, take, all, put, select } from "redux-saga/effects";
import { getContacts } from "../../services/getContacts";
import { 
  Action
} from "redux-actions";
// import { eventChannel, delay } from "redux-saga";
import { 
  actions, 
  actionCreators 
} from "./actions";
import allActionCreatorsFrom from "../actions";
import { IContact } from "../../interfaces/contacts";
import selectors from "./selectors";
import { createContact } from "../../services/createContact";
export function * contacts() {
  yield all([
    watchForLoadContacts(),
    watchCreateContact()
  ]);
}
export function * watchForLoadContacts () {
  while (true) {
    yield take(actions.loadContacts);
    yield loadContacts();
  }
}

export function * watchCreateContact (): any {
  while (true) {
    const action: Action<IContact> = yield take(actions.createNewContact);
    if (action.payload) {
      const contactsFromState: IContact[] = yield select(selectors.contacts);
      yield createContactSaga(action.payload, contactsFromState);
    }
  }
}

export function * createContactSaga (contact: IContact, currentContactList: IContact[]): any {
  try {
    yield put(actionCreators.setContacts([contact, ...currentContactList]));
    const returnedContact = yield call(createContact, contact);
    yield put(actionCreators.setContacts([returnedContact, ...currentContactList]));
    yield put(actionCreators.resetNewContact());
    yield put(allActionCreatorsFrom.ui.displayAddContactForm(false));
  } catch (e) {
    const retry = yield call(confirm, "There was an error creating your new contact, retry?");
    if (retry) {
      yield put(actionCreators.setContacts(currentContactList));
      yield createContactSaga(contact, currentContactList);
    } else {
      // reload the contacts because we don't know where in the process the error occured
      yield loadContacts();
    }
  }
}

export function * loadContacts (): any {
  try {
    // TODO: Validate contact list
    const contactsFromApi: IContact[] = yield call(getContacts);
    yield put(actionCreators.setContacts(contactsFromApi));
  } catch (e) {
    const retry = yield call(confirm, "There was an error loading contacts, retry?");
    if (retry) {
      yield loadContacts();
    }
  }
}
