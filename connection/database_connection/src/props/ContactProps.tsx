import { Room } from "../class/Room";
import { user } from "../App";
import { randomBytes } from "crypto";

import "../assets/userlist.css";
import {
  addContactToDatabase,
  checkContact,
  db,
  getNameFromPartnerId,
} from "../database";
import { random } from "node-forge";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface ContactProps {
  contacts: any[];
  onPropClick: (contactID: string) => void;
}

const ContactProps: React.FC<ContactProps> = (props: any) => {
  const contacts = props.contacts;
  console.log("contact id: ", contacts);

  const generateRandomString = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const handleContact = (contact: any) => {
    console.log("Contact: ", contact);

    if (contact.isExisting) {
      const newRoom = new Room(
        [contact.partnersId],
        contact.avatar,
        contact.ownerId,
        contact.roomName,
        contact.roomId,
        []
      );
      props.onPropClick(newRoom);
      return;
    }
    const newRoom = new Room(
      [contact.id],
      contact.avatar,
      user.getId(),
      "",
      generateRandomString(20),
      []
    );
    addContactToDatabase(newRoom);
    props.onPropClick(newRoom);
  };

  return (
    <>
      {contacts.map((contact: any) => {
        // console.log(contact);

        return (
          <div
            className="contact_prop"
            onClick={async () => {
              handleContact(contact);
            }}
          >
            <img className="" src={contact.avatar} alt="" />
            <div className="name">{contact.roomName}</div>
          </div>
        );
      })}
    </>
  );
};

export default ContactProps;
