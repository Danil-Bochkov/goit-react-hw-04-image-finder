import { useState, useEffect } from 'react';
import Searchbar from './ImageGallery/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './ImageGallery/Modal';
import Button from './ImageGallery/Button';

import './style.css';

export default function App() {
  const [largeImageSrc, setLargeImgSrc] = useState('');
  const [input, setInput] = useState('');
  const [img, setImg] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleFormSubmit = query => {
    setInput(query);
    setImg([]);
    setPage(1);
  };

  const onImgClick = largeImageURL => {
    setLargeImgSrc(largeImageURL);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const toggleImg = () => {
    setLargeImgSrc('');
  };

  useEffect(() => {
    if (!input) {
      return;
    }
    setStatus('pending');

    fetch(
      `https://pixabay.com/api/?key=30720902-e9bde465b51dd4db5e7191c0a&q=${input}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Oops... we don't know what is this ${input}.`)
        );
      })
      .then(imgList => {
        console.log([...imgList.hits]);
        setImg(prevImg => [...prevImg, ...imgList.hits]);

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [input, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        imgs={img}
        error={error}
        status={status}
        onToggle={onImgClick}
      ></ImageGallery>
      {img.length > 0 && <Button onClick={loadMore} />}
      {largeImageSrc && (
        <Modal onClose={toggleImg}>
          <img src={largeImageSrc} alt={input} />
        </Modal>
      )}
    </div>
  );
}

// class Apps extends React.Component {
//   componentDidUpdate(_, prevState) {
//
//   }
// }
