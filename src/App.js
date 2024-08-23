import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  let contactList = contacts.map((contact) => (
    <tr key={contact.id} className="single-contact">
      <td>
        <img src={contact.pictureUrl} alt={contact.name} />
      </td>
      <td>{contact.name}</td>
      <td>{contact.popularity.toFixed(2)}</td>
      <td>{contact.wonOscar ? "🏆" : "-"}</td>
      <td>{contact.wonEmmy ? "🏆" : "-"}</td>
      <td id={contact.id}>
        <button onClick={contactDelete} className="del-button">
          Delete
        </button>
      </td>
    </tr>
  ));

  let addRandomContact = () => {
    let contactsID = contacts.map((contact) => contact.id);
    let otherContacts = contactsData.filter(
      (contact) => !contactsID.includes(contact.id)
    );
    let randomIndex = Math.floor(Math.random() * otherContacts.length);
    setContacts([...contacts, otherContacts[randomIndex]]);
  };

  let sortByPopularity = () => {
    let contactList = [...contacts];
    contactList.sort((a, b) => b.popularity - a.popularity);
    setContacts(contactList);
  };

  let sortByName = () => {
    let contactList = [...contacts];
    contactList.sort((a, b) => {
      if (b.name > a.name) return -1;
      if (b.name < a.name) return 1;
      return 0;
    });
    setContacts(contactList);
  };

  function contactDelete(e) {
    let cID = e.target.parentNode.id;
    let contactList = contacts.filter((contact) => contact.id !== cID);
    setContacts(contactList);
  }

  return (
    <div className="App">
      <h1>🌟CONTACTS🌟</h1>
      <div className="buttons">
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
        <button onClick={sortByName}>Sort by name</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won-Oscar</th>
            <th>Won-Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{contactList}</tbody>
      </table>
    </div>
  );
}

export default App;
