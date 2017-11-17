import { call, take, all, put } from "redux-saga/effects";
import { getContacts } from "../../services/getContacts";
// import { eventChannel, delay } from "redux-saga";
import { 
  actions, 
  actionCreators 
} from "./actions";
import { IContact } from "../../interfaces/contacts";
// import selectors from "./selectors";
export function * contacts() {
  yield all([
    watchForLoadContacts()
  ]);
}
export function * watchForLoadContacts () {
  while (true) {
    yield take(actions.loadContacts);
    yield loadContacts();
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
