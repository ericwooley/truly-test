import config from "../config/config";
import { IContact } from "../interfaces/contacts";
import * as UUID from "uuid/v4";
export async function createContact(contact: IContact): Promise<IContact> {
  try {
    const response = await fetch(`${config.api_host}/contacts`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id: UUID(), // this should be done by the server, but JSON server doesn't
        ...contact
      })
    });
    const responseBody: IContact = await response.json();
    // haven't decided if I want this in the demo or not
    const randomNumber = Math.ceil(Math.random() * 10);
    if (randomNumber === 10) {
      throw new Error("Random failure!");
    }
    await wait(100);
    return responseBody;
  } catch (e) {
    throw new Error("Could not create contact");
  }
}

function wait (time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
