
import { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { TNote } from '../../types/types'
import './NoteForm.css'
import { nanoid } from 'nanoid'

interface TNoteFormProps {
  onAddNote: (note: TNote) => Promise<void>
} 

interface TNoteFormState {
  newNote: string
}

export default class NoteForm extends Component<TNoteFormProps, TNoteFormState> {
  state: TNoteFormState = {
    newNote: ''
  }

  handelInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newNote: e.target.value })
  }

  handelSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newNote } = this.state;
    const note: TNote = {
      id: nanoid(),
      content: newNote
    };
    try {
      await this.props.onAddNote(note);
      this.setState({ newNote: ''})
    } catch (error) {
      
    }
  }

  render(): ReactNode {
    const { newNote } = this.state
    return (
      <div className='note-form'>
        <h3 className='note-header'>Новая запись</h3>
        <form onSubmit={this.handelSubmit}>
          <label className='note-form-container'>
            <textarea 
            name="new-note" 
            id="new-note" 
            cols={60} 
            rows={10} 
            style={{resize:'none'}}
            value={newNote}
            onChange={this.handelInputChange}
            ></textarea>
            <button className='note-form-submit' type='submit'>Отправить</button>
          </label>
        </form>
      </div>
    )
  } 
}
