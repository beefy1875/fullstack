const Persons = ({persons, searchName, getRid }) => {
    return (
        <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
          .map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() => getRid(person.id)}>delete</button></li>)}
      </div>

    )
}

export default Persons