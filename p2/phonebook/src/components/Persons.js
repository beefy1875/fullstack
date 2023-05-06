const Persons = ({persons, searchName}) => {
    return (
        <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
          .map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </div>

    )
}

export default Persons