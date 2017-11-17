import config from "../config/config";
import { IContact } from "../interfaces/contacts";
export async function getContacts() {
  try {
    const response = await fetch(`${config.api_host}/contacts`);
    const responseBody: IContact[] = await response.json();
    // haven't decided if I want this in the demo or not
    // if (Math.ceil(Math.random() * 10) === 10) {
    //   throw new Error("Random failure!");
    // }
    await wait(100);
    return responseBody;
  } catch (e) {
    throw new Error("Could not load contacts");
  }
}

function wait (time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
