import { AppStyled } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';
import { fetchImages } from '../services/imgApi';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  const handleFormSubmit = inputText => {
    if (inputText.trim().length === 0) {
      return;
    }
    setInputText(inputText);
    setGallery([]);
    setPage(1);
    setTotal(null);
  };

  const onClickLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const showModalImg = largeImageURL => {
    const item = gallery.find(item => item.largeImageURL === largeImageURL);
    setLargeImageURL(item.largeImageURL);
  };

  const closeModalImg = () => {
    setLargeImageURL(null);
  };

  useEffect(() => {
    if (inputText.trim().length === 0) {
      return;
    }
    const fetch = async () => {
      setLoading(true);
      await fetchImages(inputText, page).then(data => {
        setGallery(prevState => [...prevState.gallery, ...data.hits]);
        setTotal(data.totalHits);
      });
      setLoading(false);
    };
    fetch();
  }, [inputText, page]);

  return (
    <AppStyled>
      <Searchbar>
        <SearchForm onSubmit={handleFormSubmit} />
      </Searchbar>
      {gallery.length > 0 && (
        <>
          <ImageGallery gallery={gallery} openModal={showModalImg} />
          {gallery.length < total && (
            <Button text="Load more" onClick={onClickLoadMoreBtn} />
          )}
        </>
      )}
      {loading && <Loader />}
      {largeImageURL && (
        <Modal largeImageUrl={largeImageURL} closeModal={closeModalImg} />
      )}
    </AppStyled>
  );
};
