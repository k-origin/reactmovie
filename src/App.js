import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends Component {

  state={ //상태값 관리
    isLoading:true, //기본값 : true
    movie:[], //무비 데이터 로딩되는 곳
  };

  //axios.get을 사용하여 데이터를 불러오면 로딩 시간이 느리기 때문에 비동기방식 async, await를 사용
  getMovies = async() => {
    const {
      data:{
        data:{movies}, //구조분해할당을 통해 movies키에 접근하기 위해 수정함
      },
    } = await axios.get('http://yts-proxy.now.sh/list_movies.json?sort_by=rating'); //영화 평점 순으로 데이터 정렬 sort_by=기준정렬
    console.log(movies); //무비데이터만 출력
    // console.log(movies.data.data.movies);

    this.setState({movies, isLoading:false}); //es6에서 객체의 키 이름과 대입할 변수의 이름이 같으면 생략 가능
  }

  //생명주기함수 렌더링 끝난 후 실행되는 함수
  componentDidMount(){
    setTimeout(()=>{
      this.setState({isLoading:false})
    }, 2000);

    this.getMovies();
  }

  render() {
    const{isLoading, movies} = this.state;  //현재 상태값 true

    return (
      <div>
        <header className="header">
          <h1><img src={`${process.env.PUBLIC_URL}./images/logo-YTS.svg`} alt="logo" /></h1>
        </header>

        <main>
          {isLoading?<img src={`${process.env.PUBLIC_URL}./images/bx_loader.gif`} alt="로딩 중" className="load_img"/>:
          (<section>
            {movies.map((movie)=>
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />)
            }
          </section>)
          }
          
          {/* <img src={`${process.env.PUBLIC_URL}/images/bx_loader.gif`} alt="로딩 중"/>
          <img src={'./images/bx_loader.gif'} alt="로딩 중" /> */}
        </main>
      </div>
    );
  }
}

export default App;