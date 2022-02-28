import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"

export default function DeckEdit() {
  const deckNameRef = useRef()
  const deckDescriptionRef = useRef()
  const deckQuestionRef = useRef()
  const deckAnswerRef = useRef()
  const [error] = useState("")
  const [currentDeck, setCurrentDeck] = useState({metadata:{}, cards: {}})
  const { id } = useParams();


  var deckId = id
  var deckRef = database.ref('decks/' + deckId);
  useEffect(() => {
    deckRef.on('value', snapshot => {
      let d = snapshot.val()
      if (d.metadata === undefined) {
        d.metadata = {}
      }
      setCurrentDeck(d)
    });
    }, [])  


  function updateMetadata(e) {
    e.preventDefault()
    database.ref('decks/' + deckId+  '/metadata').set({name: deckNameRef.current.value, description: deckDescriptionRef.current.value})
  }

  function addCard(e) {
    e.preventDefault()
    database.ref('decks/' + deckId+  '/cards').push({question: deckQuestionRef.current.value, answer: deckAnswerRef.current.value})
    deckQuestionRef.current.value = ""
    deckAnswerRef.current.value = ""
  }

  function CardList(props) {
    const listItems = Object.keys(props.cards).map((key, index) => 
      <tr><td>{props.cards[key].question}</td><td>{props.cards[key].answer}</td></tr>
    );
    return (
      <table>
        <thead>
        <tr>
          <td>Question</td>
          <td>Answer</td>
        </tr>
        </thead>
        <tbody>
        {listItems}
        </tbody>
      </table>
    );
  }

  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center text-left"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Deck Metadata</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={updateMetadata}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                ref={deckNameRef}
                required
                defaultValue={currentDeck.metadata.name}
              />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                ref={deckDescriptionRef}
                required
                defaultValue={currentDeck.metadata.description}
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
        <Card.Body>
          <h2 className="text-center mb-4">Add Deck Member</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={addCard}>
            <Form.Group id="question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="question"
                ref={deckQuestionRef}
                required
              />
            </Form.Group>
            <Form.Group id="answer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                ref={deckAnswerRef}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit">
              Create Card
            </Button>
          </Form>
        </Card.Body>
        <CardList cards={currentDeck.cards}></CardList>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </Card>
    </Container>
    </>
  )
}
