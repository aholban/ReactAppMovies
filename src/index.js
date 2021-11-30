<<<<<<< HEAD
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { store, useGlobalState } from "state-pool";
import YouTube from "react-youtube";
=======
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useHistory} from 'react-router-dom';
import {store, useGlobalState} from 'state-pool';
import YouTube from 'react-youtube';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> aeabaabebcc7641ccc03a529280ae22606b192f5

const restEndpoint = "http://54.197.201.50:8080/movies";
//const restEndpoint = "http://127.0.0.1:8080/movies";
const UserContext = React.createContext();

//-----------------------------------------------------------------------------------------------------------------
//Api calls and converting into lists
//-----------------------------------------------------------------------------------------------------------------

store.setState("user1", { username: "empty", password: "empty" });

const callRestApi = async function (api, requestOptions, isJson) {
  const response = await fetch(restEndpoint + api, requestOptions);
  const jsonResponse = isJson ? await response.json() : response;
  return jsonResponse;
};

function RenderMoviesList({ api }) {
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi(api, requestOptions, true).then((result) =>
      setApiResponse(ConvertJsonMovies(result))
    );
  }, []);

  return apiResponse;
}

function RenderActorsList({ api }) {
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi(api, requestOptions, true).then((result) =>
      setApiResponse(ConvertJsonActors(result))
    );
  }, []);

  return apiResponse;
}

function RenderGenresList({ api }) {
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi(api, requestOptions, true).then((result) =>
      setApiResponse(ConvertJsonGenres(result))
    );
  }, []);

  return apiResponse;
}

function ConvertJsonMovies(jsonMovies) {
  const arrayOfMovies = jsonMovies.map((movie) => (
    <li>
      <Link to={`/movie/${movie.film_id}`}>{movie.title}</Link>
    </li>
  ));

  return arrayOfMovies;
}

function ConvertJsonGenres(jsonGenres) {
  const arrayOfGenres = jsonGenres.map((genre) => (
    <li>
      <Link to={`/genre/${genre.genreID}`}>{genre.name}</Link>
    </li>
  ));

  return arrayOfGenres;
}

function ConvertJsonActors(jsonActors) {
  const arrayOfActors = jsonActors.map((actor) => (
    <li>
      <Link to={`/actor/${actor.actor_id}`}>
        {actor.firstName} {actor.lastName}
      </Link>
    </li>
  ));

  return arrayOfActors;
}

//-----------------------------------------------------------------------------------------------------------------
//Navigation Bar: Log In, Register, Sign Out, Search
//-----------------------------------------------------------------------------------------------------------------

//Log In

const UpdateUserCredentials = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let handleChangeUsername = (event) => {
    const target = event.target;
    setUsername(target.value);
  };

  let handleChangePassword = (event) => {
    const target = event.target;
    setPassword(target.value);
  };
  let updateName = (event) => {
    updateUser(function (user1) {
      user1.username = username;
      user1.password = password;
    });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    updateName(event);
  };

  useEffect(() => {
    if (user1.username == username && user1.password == password) {
      const requestOptions = {
        method: "POST",
      };
      callRestApi(
        "/login?username=" + user1.username + "&password=" + user1.password,
        requestOptions,
        false
      )
        .then((response) => {
          return response.text();
        })
        .then((text) => alert(text));
    }
  }, [user1]);

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => HandleSubmit(event)}>
          <h3>Log In!</h3>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

//Register

const RegisterPopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let handleChangeUsername = (event) => {
    const target = event.target;
    setUsername(target.value);
  };

  let handleChangePassword = (event) => {
    const target = event.target;
    setPassword(target.value);
  };

  let updateName = (event) => {
    updateUser(function (user1) {
      user1.username = username;
      user1.password = password;
    });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
    updateName(event);
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/createUser?username=" + username + "&password=" + password,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => HandleSubmit(event)}>
          <h3>Register!</h3>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

//Sign out

const SignOutPopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");

  let updateName = (event) => {
    updateUser(function (user1) {
      user1.username = "empty";
      user1.password = "empty";
    });
  };

  useEffect(() => {
    if (user1.username == "empty" && user1.password == "empty") {
      alert("Signed out");
    }
  }, [user1]);

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <h3>Are you sure?</h3>
        <button onClick={updateName}>Yes</button>
        <button onClick={() => props.toggle()}>No</button>
      </div>
    </div>
  );
};

//Search

class SearchMovie extends React.Component {
  render() {
    return (
      <div>
        <h1>List of Movies</h1>
        <ul>{ConvertJsonMovies(this.props.movies)}</ul>
      </div>
    );
  }
}

//Navigation Bar

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
      signout: false,
    };
    this.togglePopLogIn = this.togglePopLogIn.bind(this);
  }

  togglePopLogIn = () => {
    this.setState({
      login: !this.state.login,
    });
  };
  togglePopRegister = () => {
    this.setState({
      register: !this.state.register,
    });
  };
  togglePopSignOut = () => {
    this.setState({
      signout: !this.state.signout,
    });
  };

  render() {
    return (
      <div className="NavBar">
        <Link to="/home">
          <button className="HomeButton">Home</button>
        </Link>
        <div className="SearchBox">
          <input
            className="TextBox"
            type="text"
            placeholder="Find movie..."
            onChange={(e) => this.props.onSearchChange(e.target.value)}
          />
          <Link to="/search">
            <button
              className="SearchButton"
              onClick={() => this.props.onSearchClick()}
            >
              Search
            </button>
          </Link>
        </div>
        <button
          className="LoginButtons"
          onClick={() => this.togglePopSignOut()}
        >
          Sign Out
        </button>
        <button className="LoginButtons" onClick={() => this.togglePopLogIn()}>
          Log In
        </button>
        <button
          className="LoginButtons"
          onClick={() => this.togglePopRegister()}
        >
          Register
        </button>
        {this.state.login ? (
          <UpdateUserCredentials toggle={this.togglePopLogIn} />
        ) : null}
        {this.state.register ? (
          <RegisterPopUp toggle={this.togglePopRegister} />
        ) : null}
        {this.state.signout ? (
          <SignOutPopUp toggle={this.togglePopSignOut} />
        ) : null}
      </div>
    );
  }
}

//-----------------------------------------------------------------------------------------------------------------
// Home Page
//-----------------------------------------------------------------------------------------------------------------

// List of movies

class MoviesBoxContent extends React.Component {
  render() {
    return (
      <div>
        <ul className="MoviesBoxContent">
          <RenderMoviesList api="/all" />
        </ul>
      </div>
    );
  }
}

// List of genres

class GenresBoxContent extends React.Component {
  render() {
    return (
      <div>
        <ul className="MoviesBoxContent">
          <RenderGenresList api="/getAllGenres" />
        </ul>
      </div>
    );
  }
}

// List of actors

class ActorsBoxContent extends React.Component {
  render() {
    return (
      <div>
        <ul className="MoviesBoxContent">
          <RenderActorsList api="/getActors" />
        </ul>
      </div>
    );
  }
}

// Add movie form

const AddMoviePopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [title, setTitle] = useState("");
  const [length, setLength] = useState("");

  let handleChangeTitle = (event) => {
    const target = event.target;
    setTitle(target.value);
  };

  let handleChangeLength = (event) => {
    const target = event.target;
    setLength(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, length);
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/addMovie?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&title=" +
        title +
        "&length=" +
        length,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => handleSubmit(event)}>
          <h3>Add Movie</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          <br />
          <label>
            Length:
            <input
              type="text"
              name="length"
              value={length}
              onChange={handleChangeLength}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

// Add actor form

const AddActorPopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  let handleChangeFirstName = (event) => {
    const target = event.target;
    setFirstName(target.value);
  };

  let handleChangeLastName = (event) => {
    const target = event.target;
    setLastName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/addActor?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&first_name=" +
        first_name +
        "&last_name=" +
        last_name,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => handleSubmit(event)}>
          <h3>Add Actor</h3>
          <label>
            First name:
            <input
              type="text"
              value={first_name}
              onChange={handleChangeFirstName}
            />
          </label>
          <br />
          <label>
            Last name:
            <input
              type="text"
              value={last_name}
              onChange={handleChangeLastName}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

// Add genre form

const AddGenrePopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [name, setName] = useState("");

  let handleChangeName = (event) => {
    const target = event.target;
    setName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/addGenre?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&name=" +
        name,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => handleSubmit(event)}>
          <h3>Add Genre</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </label>

          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

//Movies Header

class MoviesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownPressed: false,
      add: false,
    };
  }

  handleClickDropdown() {
    this.setState({
      isDropdownPressed: !this.state.isDropdownPressed,
    });
  }

  handleAddButton = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  render() {
    return (
      <div className="MoviesBox">
        <div className="Header">
          <div className="Text">See all movies</div>
          <button className="Drop" onClick={() => this.handleClickDropdown()}>
            &#x25BC;
          </button>
          <button className="Add" onClick={() => this.handleAddButton()}>
            +
          </button>
        </div>
        {this.state.isDropdownPressed && <MoviesBoxContent />}
        {this.state.add && <AddMoviePopUp toggle={this.handleAddButton} />}
      </div>
    );
  }
}

//Actors Header

class ActorsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownPressed: false,
      add: false,
    };
  }

  handleClickDropdown() {
    this.setState({
      isDropdownPressed: !this.state.isDropdownPressed,
    });
  }

  handleAddButton = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  render() {
    return (
      <div className="ActorsBox">
        <div className="Header">
          <div className="Text">See all actors</div>
          <button className="Drop" onClick={() => this.handleClickDropdown()}>
            &#x25BC;
          </button>
          <button className="Add" onClick={() => this.handleAddButton()}>
            +
          </button>
        </div>
        {this.state.isDropdownPressed && <ActorsBoxContent />}
        {this.state.add && <AddActorPopUp toggle={this.handleAddButton} />}
      </div>
    );
  }
}

//Genres Header

class GenresBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownPressed: false,
      add: false,
    };
  }

  handleClickDropdown() {
    this.setState({
      isDropdownPressed: !this.state.isDropdownPressed,
    });
  }

  handleAddButton = () => {
    this.setState({
      add: !this.state.add,
    });
  };

  render() {
    return (
      <div className="GenresBox">
        <div className="Header">
          <div className="Text">See all genres</div>
          <button className="Drop" onClick={() => this.handleClickDropdown()}>
            &#x25BC;
          </button>
          <button className="Add" onClick={() => this.handleAddButton()}>
            +
          </button>
        </div>
        {this.state.isDropdownPressed && <GenresBoxContent />}
        {this.state.add && <AddGenrePopUp toggle={this.handleAddButton} />}
      </div>
    );
  }
}

// Home Container

class HomeContent extends React.Component {
  render() {
    return (
      <div>
        <MoviesBox />
        <ActorsBox />
        <GenresBox />
      </div>
    );
  }
}

//-----------------------------------------------------------------------------------------------------------------
// Actor Page
//-----------------------------------------------------------------------------------------------------------------

const DeleteActor = () => {
  const params = useParams();
  const id = params.actor_id;
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const requestOptions = {
    method: "DELETE",
  };
  useEffect(() => {
    callRestApi(
      "/deleteActor/" +
        id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  }, []);

  return (
    <div>
      <div>Deleting Actor {id}</div>
    </div>
  );
};

const ActorPage = () => {
  const params = useParams();
  const id = params.actor_id;
  const [actor, setActor] = useState({});
  const [movies, setMovies] = useState([{}]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi("/getActor/" + id, requestOptions, true).then((result) =>
      setActor(result)
    );
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi("/getMoviesOfActor/" + id, requestOptions, true).then(
      (result) => setMovies(result)
    );
  }, []);

  return (
    <div className="MovieContent">
      <div className="MovieHeader">
        <h1 className="MovieTitle">
          {actor.firstName} {actor.lastName}
        </h1>
        <Link to={`/actor/${id}/delete/`}>
          <button className="MovieButtons">Delete</button>
        </Link>
      </div>
      <h3>Movies</h3>
      <ul>{ConvertJsonMovies(movies)}</ul>
    </div>
  );
};

//-----------------------------------------------------------------------------------------------------------------
// Genre Page
//-----------------------------------------------------------------------------------------------------------------

const DeleteGenre = () => {
  const params = useParams();
  const id = params.genre_id;
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const requestOptions = {
    method: "DELETE",
  };
  useEffect(() => {
    callRestApi(
      "/deleteGenre/" +
        id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  }, []);

  return (
    <div>
      <div>Deleting Genre {id}</div>
    </div>
  );
};

const GenrePage = () => {
  const params = useParams();
  const id = params.genre_id;
  const [genre, setGenre] = useState({});
  const [movies, setMovies] = useState([{}]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi("/getGenre/" + id, requestOptions, true).then((result) =>
      setGenre(result)
    );
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    callRestApi("/getMoviesByGenre/" + id, requestOptions, true).then(
      (result) => setMovies(result)
    );
  }, []);

  console.log(genre.name);
  return (
    <div className="MovieContent">
      <div className="MovieHeader">
        <h1 className="MovieTitle">{genre.name}</h1>
        <Link to={`/genre/${id}/delete/`}>
          <button className="MovieButtons">Delete</button>
        </Link>
      </div>
      <h3>Movies</h3>
      <ul>{ConvertJsonMovies(movies)}</ul>
    </div>
  );
};

//-----------------------------------------------------------------------------------------------------------------
// Film Page
//-----------------------------------------------------------------------------------------------------------------

const FilmPage = () => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const params = useParams();
  const id = params.film_id;
  const [movie, setMovie] = useState({ title: "null", length: "null" });
  const [genre, setGenre] = useState([{}]);
  const [inputRate, setInputRate] = useState("");
  const [inputTrailer, setInputTrailer] = useState("");
  const [updateMovie, setUpdateMovie] = useState(false);
  const [addGenre, setAddGenre] = useState(false);
  const [addActor, setAddActor] = useState(false);
  const [deleteGenre, setDeleteGenre] = useState(false);
  const [deleteActor, setDeleteActor] = useState(false);

  const handleUpdateButton = () => {
    setUpdateMovie(!updateMovie);
  };

  const handleAddGenre = () => {
    setAddGenre(!addGenre);
  };

  const handleDeleteGenre = () => {
    setDeleteGenre(!deleteGenre);
  };

  const handleAddActor = () => {
    setAddActor(!addActor);
  };

  const handleDeleteActor = () => {
    setDeleteActor(!deleteActor);
  };

  const requestOptions = {
    method: "GET",
  };
  useEffect(() => {
    callRestApi("/getMovie/" + id, requestOptions, true).then((result) =>
      setMovie(result)
    );
  }, []);

  useEffect(() => {
    callRestApi("/getGenresOfMovie/" + id, requestOptions, true).then(
      (result) => setGenre(result)
    );
  }, []);

  const [actors, setActors] = useState([{}]);
  useEffect(() => {
    callRestApi("/getActorsForMovie/" + id, requestOptions, true).then(
      (result) => setActors(result)
    );
  }, []);

  const rating = movie.star_rating ? movie.star_rating : "-";

  return (
    <div className="MovieContent">
      <div className="MovieHeader">
        <h1 className="MovieTitle">{movie.title}</h1>
        <div className="MovieText">({movie.length} minutes)</div>
        <Link to={`/movie/${id}/delete/`}>
          <button className="MovieButtons">Delete</button>
        </Link>
        <button className="MovieButtons" onClick={handleUpdateButton}>
          Update
        </button>
      </div>
      <div className="MovieSubheader">
        <h3>Genres</h3>
        <button className="MovieLeftButtons" onClick={handleAddGenre}>
          Add genre
        </button>
        <button className="MovieLeftButtons" onClick={handleDeleteGenre}>
          Delete genre
        </button>
        <button
          className="MovieButtons"
          onClick={() => rateMovie(inputRate, id)}
        >
          Rate
        </button>
        <input
          className="RateBox"
          type="text"
          placeholder="Type..."
          value={inputRate}
          onChange={(e) => setInputRate(e.target.value)}
        />
        <p className="Rating">{rating}</p>
      </div>
      <ul>{ConvertJsonGenres(genre)}</ul>
      <div className="MovieSubheader">
        <h3>Actors</h3>
        <button className="MovieLeftButtons" onClick={handleAddActor}>
          Add actor
        </button>
        <button className="MovieLeftButtons" onClick={handleDeleteActor}>
          Delete actor
        </button>
        <button
          className="MovieButtons"
          onClick={() =>
            HandleAddTrailer(inputTrailer, id, user1.username, user1.password)
          }
        >
          Add trailer
        </button>
        <input
          className="RateBox"
          type="text"
          placeholder="Trailer ID..."
          value={inputTrailer}
          onChange={(e) => setInputTrailer(e.target.value)}
        />
      </div>
      <ul>{ConvertJsonActors(actors)}</ul>
      {updateMovie && <UpdateMoviePopUp toggle={handleUpdateButton} />}
      {addGenre && <AddGenreForMovie toggle={handleAddGenre} movie_id={id} />}
      {deleteGenre && (
        <DeleteGenreForMovie toggle={handleDeleteGenre} movie_id={id} />
      )}
      {addActor && <AddActorForMovie toggle={handleAddActor} movie_id={id} />}
      {deleteActor && (
        <DeleteActorForMovie toggle={handleDeleteActor} movie_id={id} />
      )}

      {movie.videoID != null && <MovieTrailer videoId={movie.videoID} />}
    </div>
  );
};

function HandleAddTrailer(input, id, username, password) {
  console.log(input, id);
  const requestOptions = {
    method: "POST",
  };
  callRestApi(
    "/addTrailerToMovie/" +
      id +
      "?username=" +
      username +
      "&password=" +
      password +
      "&trailerID=" +
      input,
    requestOptions,
    false
  )
    .then((response) => {
      return response.text();
    })
    .then((text) => alert(text));
}

function rateMovie(input, id) {
  console.log(input, id);
  const requestOptions = {
    method: "POST",
  };
  callRestApi("/rateMovie/" + id + "?rating=" + input, requestOptions, false)
    .then((response) => {
      return response.text();
    })
    .then((text) => alert(text))
    .then(window.location.reload(false));
}

const DeleteMovie = () => {
  const params = useParams();
  const id = params.film_id;
  const [user1, setUser, updateUser] = useGlobalState("user1");
  console.log(user1);
  const requestOptions = {
    method: "DELETE",
  };
  useEffect(() => {
    callRestApi(
      "/deleteMovie/" +
        id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  }, []);

  return (
    <div>
      <div>Deleting Movie {id}</div>
    </div>
  );
};

const UpdateMoviePopUp = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [title, setTitle] = useState("");
  const [length, setLength] = useState("");

  const params = useParams();
  const id = params.film_id;

  let handleChangeTitle = (event) => {
    const target = event.target;
    setTitle(target.value);
  };

  let handleChangeLength = (event) => {
    const target = event.target;
    setLength(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, length);
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/updateMovie/" +
        id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&title=" +
        title +
        "&length=" +
        length,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={(event) => handleSubmit(event)}>
          <h3>Update Movie</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          <br />
          <label>
            Length:
            <input
              type="text"
              name="length"
              value={length}
              onChange={handleChangeLength}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

const AddGenreForMovie = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [genreName, setGenreName] = useState("");

  let handleChange = (event) => {
    const target = event.target;
    setGenreName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/addGenreToMovie/" +
        props.movie_id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&name=" +
        genreName,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={handleSubmit}>
          <h3>Add Genre</h3>
          <label>
            Name:
            <input type="text" value={genreName} onChange={handleChange} />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

const DeleteGenreForMovie = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [genreName, setGenreName] = useState("");

  let handleChange = (event) => {
    const target = event.target;
    setGenreName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
    };
    callRestApi(
      "/deleteGenreFromMovie/" +
        props.movie_id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&name=" +
        genreName,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={handleSubmit}>
          <h3>Delete Genre</h3>
          <label>
            Name:
            <input type="text" value={genreName} onChange={handleChange} />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

const AddActorForMovie = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [actorFirstName, setFirstName] = useState("");
  const [actorLastName, setLastName] = useState("");

  let handleChangeFirstName = (event) => {
    const target = event.target;
    setFirstName(target.value);
  };

  let handleChangeLastName = (event) => {
    const target = event.target;
    setLastName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    callRestApi(
      "/addActorToMovie/" +
        props.movie_id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&first_name=" +
        actorFirstName +
        "&last_name=" +
        actorLastName,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={handleSubmit}>
          <h3>Add Actor</h3>
          <label>
            First Name:
            <input
              type="text"
              value={actorFirstName}
              onChange={handleChangeFirstName}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={actorLastName}
              onChange={handleChangeLastName}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

const DeleteActorForMovie = (props) => {
  const [user1, setUser, updateUser] = useGlobalState("user1");
  const [actorFirstName, setFirstName] = useState("");
  const [actorLastName, setLastName] = useState("");

  let handleChangeFirstName = (event) => {
    const target = event.target;
    setFirstName(target.value);
  };

  let handleChangeLastName = (event) => {
    const target = event.target;
    setLastName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "DELETE",
    };
    callRestApi(
      "/deleteActorFromMovie/" +
        props.movie_id +
        "?username=" +
        user1.username +
        "&password=" +
        user1.password +
        "&first_name=" +
        actorFirstName +
        "&last_name=" +
        actorLastName,
      requestOptions,
      false
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => alert(text));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={() => props.toggle()}>
          &times;{" "}
        </span>
        <form onSubmit={handleSubmit}>
          <h3>Delete Actor</h3>
          <label>
            First Name:
            <input
              type="text"
              value={actorFirstName}
              onChange={handleChangeFirstName}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={actorLastName}
              onChange={handleChangeLastName}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

//https://www.youtube.com/watch?v=8g18jFHCLXk&ab_channel=WarnerBros.Pictures
const MovieTrailer = (props) => {
  return (
    <div className="TrailerContainer">
      <h3>Trailer</h3>
      <ReactYoutube videoId={props.videoId} />
    </div>
  );
};

class ReactYoutube extends React.Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log(event.target);
  }
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <YouTube
        className="video"
        videoId={this.props.videoId}
        opts={opts}
        onReady={this.videoOnReady}
      />
    );
  }
}

//-----------------------------------------------------------------------------------------------------------------
// Container
//-----------------------------------------------------------------------------------------------------------------

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      movies: [{}],
      username: "hello",
      password: "goodbye",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.changeCredentials = this.changeCredentials.bind(this);
  }

  changeCredentials(name, pass) {
    this.setState({
      username: name,
      password: pass,
    });
    console.log(this.state.username, this.state.password);
  }

  handleSearchChange(input) {
    this.setState({
      searchInput: input,
    });
  }

  handleSearchClick() {
    const requestOptions = {
      method: "POST",
    };
    console.log(this.state.searchInput);
    callRestApi(
      "/searchMovie?title=" + this.state.searchInput,
      requestOptions,
      true
    ).then((result) => this.setState({ movies: result }));
  }

  render() {
    return (
      <Router>
        <div className="Container">
          <NavBar
            searchInput={this.state.searchInput}
            onSearchChange={this.handleSearchChange}
            onSearchClick={this.handleSearchClick}
            username={this.state.username}
            password={this.state.password}
            changeCredentials={this.changeCredentials}
          />
          <Routes>
            <Route exact path="/home" element={<HomeContent />} />
            <Route
              exact
              path="/search"
              element={<SearchMovie movies={this.state.movies} />}
            />
            <Route path="/movie/:film_id" element={<FilmPage />} />
            <Route path="/genre/:genre_id" element={<GenrePage />} />
            <Route path="/actor/:actor_id" element={<ActorPage />} />
            <Route path="/movie/:film_id/delete" element={<DeleteMovie />} />
            <Route path="/genre/:genre_id/delete" element={<DeleteGenre />} />
            <Route path="/actor/:actor_id/delete" element={<DeleteActor />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

//-----------------------------------------------------------------------------------------------------------------

ReactDOM.render(<Container />, document.getElementById("root"));
