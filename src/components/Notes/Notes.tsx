import './Notes.css'
import NoteForm from '../NoteForm/NoteForm'
import NoteItem from '../NoteItem/NoteItem'
import { Component } from 'react'
import { TNote } from '../../types/types'


const backendURL = import.meta.env.VITE_SOME_KEY

interface TNotesState {
  notes: TNote[];
  isLoading: boolean
};


export default class Notes extends Component {

  state: TNotesState =  {
    notes: [],
    isLoading: true
  } 

  loadNotes = async () => {
    if (!backendURL) {
      console.error('сервер не найден');
      return;
    }
    try {
      const response = await fetch(`${backendURL}/notes`);
      if (!response.ok) {
        throw  new Error('HTTP  Erorr' + response.status);
      }
      const notes = await response.json();
      this.setState({ notes, isLoading: false});
    } catch (error) {
      console.log(error) 
    }
  }

  async componentDidMount() {
    this.loadNotes()
  }

  addNote = async (note: TNote) => {
    if(!backendURL){
      console.error('сервер не найден');
    }
    try {
      const response = await fetch(`${backendURL}/notes`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(note)
      });
      if(!response.ok){
        throw new Error('HTTP  Erorr' + response.status);
      }
      await this.loadNotes();
    } catch (error) {
      console.error(error);
    }
  }

  deleteNote = async (id: string) => {
    if(!backendURL){
      console.error('сервер не найден');
      return;
    }
    try {
      const response = await fetch(`${backendURL}/notes/${id}`, {
        method: "DELETE"
      });
      if(!response.ok){
        throw new Error ('HTTP  Erorr' + response.status)
      }
      await this.loadNotes();
    } catch (error) {
      console.error(error)
    }
  }


  render() {
    const { notes, isLoading } = this.state;

    if (isLoading){
      return 'Loading';
    }
    
    return (
      <>
      <div className='notes'>
        <h2>
          Записи
        </h2>
        <button className='refresh-notes'>обновить</button>
      </div>
      <div className='notes-feild'>
        {notes.map((item) => (
          <NoteItem 
          key={item.id}
          note={item}
          onRemove={this.deleteNote}
          />
        ))}
      </div>
        <NoteForm onAddNote={this.addNote} />
      </>
    )
  }
  
}
