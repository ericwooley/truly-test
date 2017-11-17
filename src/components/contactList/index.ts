import SplitHOC from "../../HOC/split";
// import ContactList from "./contactList";
export default SplitHOC(
  () => import(/* webpackChunkName: "contactList" */ "./contactList")
    .then(ContactList => ContactList.default)
  );
