import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface ArtStory {
  _id?: string;
  title: string;
  author?: string;
  description?: string;
  content?: string;
  caption: string[];
  imageUrl: string[];
}

const NewArtStory: React.FC = () => {
  const [artStory, setArtStory] = useState<ArtStory>({
    title: '',
    author: '',
    description: '',
    content: '',
    caption: [],
    imageUrl: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:5000/artstories/${id}`)
        .then(response => {
          setArtStory(response.data);
        })
        .catch(error => {
          console.error('Error fetching the art story:', error);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setArtStory(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index: number) => {
    const updatedArray = (artStory[field as keyof ArtStory] || []) as string[];
    updatedArray[index] = e.target.value;
    setArtStory(prevState => ({
      ...prevState,
      [field]: updatedArray
    }));
  };

  const handleAddArrayItem = (field: string) => {
    setArtStory(prevState => ({
      ...prevState,
      // Đảm bảo rằng field là mảng string, nếu không sẽ lấy mảng rỗng
      [field]: [...(prevState[field as keyof ArtStory] as string[] || []), '']
    }));
  };
  
  const handleDeleteArrayItem = (field: string, index: number) => {
    const updatedArray = (artStory[field as keyof ArtStory] || []) as string[];
    updatedArray.splice(index, 1);
    setArtStory(prevState => ({
      ...prevState,
      [field]: updatedArray
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && id) {
      axios.put(`http://localhost:5000/artstories/${id}`, artStory)
        .then(response => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error updating art story:', error);
        });
    } else {
      axios.post('http://localhost:5000/artstories', artStory)
        .then(response => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error creating art story:', error);
        });
    }
  };

  const handleDelete = () => {
    if (id) {
      axios.delete(`http://localhost:5000/artstories/${id}`)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting art story:', error);
        });
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Art Story' : 'Create New Art Story'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={artStory.title}
            onChange={(e) => handleChange(e, 'title')}
            required
          />
        </div>

        <div>
          <label>Author:</label>
          <input
            type="text"
            value={artStory.author || ''}
            onChange={(e) => handleChange(e, 'author')}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={artStory.description || ''}
            onChange={(e) => handleChange(e, 'description')}
          />
        </div>

        <div>
          <label>Content:</label>
          <textarea
            value={artStory.content || ''}
            onChange={(e) => handleChange(e, 'content')}
          />
        </div>

        <div>
          <label>Caption:</label>
          {artStory.caption.map((caption, index) => (
            <div key={index}>
              <input
                type="text"
                value={caption}
                onChange={(e) => handleArrayChange(e, 'caption', index)}
              />
              <button type="button" onClick={() => handleDeleteArrayItem('caption', index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddArrayItem('caption')}>Add Caption</button>
        </div>

        <div>
          <label>Image URLs:</label>
          {artStory.imageUrl.map((url, index) => (
            <div key={index}>
              <input
                type="text"
                value={url}
                onChange={(e) => handleArrayChange(e, 'imageUrl', index)}
              />
              <button type="button" onClick={() => handleDeleteArrayItem('imageUrl', index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddArrayItem('imageUrl')}>Add Image URL</button>
        </div>

        <div>
          <button type="submit">{isEditing ? 'Save Changes' : 'Create Art Story'}</button>
        </div>
      </form>

      {isEditing && (
        <div>
          <button type="button" onClick={handleDelete}>Delete Art Story</button>
        </div>
      )}
    </div>
  );
};

export default NewArtStory;
