import { Component } from 'react'
import './NoteItem.css'
import { TNote } from '../../types/types'

interface TNoteItemProps {
  note: TNote,
  onRemove: (id: string) => void;
}

export default class NoteItem extends Component<TNoteItemProps> {
  handelRemove = () => {
    const {note, onRemove} = this.props;
    onRemove(note.id)
  }
  
  render () {
    const { note } = this.props;

    return (
        <div className='note-items'>
          <button className='item-delete' onClick={this.handelRemove}>x</button>
          <div className='note-content'>
            {note.content}
          </div>
        </div>
    )  
  }
}
