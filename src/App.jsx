import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, storage } from "./firebase/Config";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import {ref,uploadBytes} from 'firebase/storage'

const App = () => {
  const [movieList, setMovieList] = useState([]);

  // new movie states
  const [newMovie, setNewMovie] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isAwardWining, setIsAwardWining] = useState(false);

// update state

  const [updateTile, setUpdateTitle] = useState('');

// file upload state
const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, "Movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const createMovie = async (e) => {
    e.preventDefault();

    try {
      await addDoc(movieCollectionRef, {
        title: newMovie,
        releaseDate: releaseDate,
        awardWining: isAwardWining,
      });
      getMovieList();
    } catch (err) {
      console.log("err adding");
    }
  };

  const deleteMovie = async(id)=>{
  

      const movieDoc = doc(db, 'Movies',id)
      try{
        await deleteDoc(movieDoc)
        console.log('delted')
        getMovieList();
      }catch(err){
        console.log('failed to delete')
      }
  }

  const updateMovieTitle = async(id) => {
    
    const movieDoc = doc(db, 'Movies',id)
    try{
      await updateDoc(movieDoc, {title: updateTile})
      console.log('delted')
      // getMovieList();
    }catch(err){
      console.log('failed to delete')
    }}


    const uploadFiler = async()=>{
        if(!fileUpload) return;
        const fileFolderRef = ref(storage, `Files/${fileUpload.name}`)
        try{
          await uploadBytes(fileFolderRef, fileUpload)
          console.log('done' )
        }catch(err){
          console.log('ipload fialed', err)
        }
    }
  return (
    <div>
      <Auth />

      <div>
        <form>
          <input
            type="text"
            placeholder="title"
            onChange={(e) => setNewMovie(e.target.value)}
          />{" "}
          <br />
          <input
            type="number"
            placeholder="release date"
            onChange={(e) => setReleaseDate(Number(e.target.value))}
          />
          <br />
          <input
            type="checkbox"
            checked={isAwardWining}
            onChange={(e) => setIsAwardWining(e.target.checked)}
          />
          <label> received an oscar</label>
          <button onClick={createMovie}>Submit movie</button>

        </form>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            
          <button onClick={()=>{deleteMovie(movie.id)}}>delete movie</button>

          <input type="text" placeholder="new title" onChange={(e)=> setUpdateTitle(e.target.value)} />
          <button onClick={()=> updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>


      <div>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFiler}>upload file</button>
      </div>
    </div>
  );
};

export default App;
